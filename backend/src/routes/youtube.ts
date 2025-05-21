const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const router = express.Router();
router.use(cors());

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY as string;

router.get('/song', async (req, res) => {
  try {
    let allSongs = [];
    let nextPageToken = null;

    while (allSongs.length < 100) {  // Fetch until 100+ songs
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          q: 'Afrobeat',
          type: 'video',
          videoCategoryId: '10',
          regionCode: 'NZ',
          maxResults: 50, // Fetch max per request
          pageToken: nextPageToken, // Handle pagination
          key: YOUTUBE_API_KEY,
        },
      });

      allSongs = [...allSongs, ...response.data.items]; // Append results
      nextPageToken = response.data.nextPageToken; // Get next page

      if (!nextPageToken) break; // Stop if no more pages
    }

    res.json(allSongs.slice(0, 100)); // Limit to 100 songs
  } catch (error) {
    console.error('YouTube API error:', error);
    res.status(500).json({ message: 'Failed to fetch trending songs' });
  }
});


router.get('/trending-playlists', async (req, res) => {
  try {
    let allPlaylists = [];
    let nextPageToken = null;

    while (allPlaylists.length < 100) {  // Fetch until 100+ playlists
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          q: 'Afrobeat mix',
          type: 'playlist',
          regionCode: 'NZ',
          maxResults: 50, // Fetch max per request
          pageToken: nextPageToken, // Handle pagination
          key: YOUTUBE_API_KEY,
        },
      });

      allPlaylists = [...allPlaylists, ...response.data.items]; // Append results
      nextPageToken = response.data.nextPageToken; // Get next page

      if (!nextPageToken) break; // Stop if no more pages
    }

    res.json(allPlaylists.slice(0, 100)); // Limit to 100 playlists
  } catch (error) {
    console.error('YouTube API error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch Afrobeat trending playlists' });
  }
});

  
  router.get("/trending-artists", async (req, res) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: "snippet",
          q: "Top Afrobeat artists",
          type: "channel",
          regionCode: "NZ",
          maxResults: 12,
          key: YOUTUBE_API_KEY,
        },
      });
  
      res.json(response.data.items);
    } catch (error) {
      console.error("YouTube API error:", error);
      res.status(500).json({ message: "Failed to fetch Afrobeat trending artists" });
    }
  });

  // Backend route to get playlist details (songs)
  router.get('/playlist-details', async (req, res) => {
    const { playlistId } = req.query; 
    if (!playlistId) {
      return res.status(400).json({ message: 'Missing playlistId parameter' });
    }
  
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet',
          playlistId: playlistId,
          maxResults: 50,
          key: process.env.YOUTUBE_API_KEY,
        },
      });
      res.json(response.data.items);
    } catch (error) {
      console.error('YouTube API error:', error.response?.data || error.message);
      res.status(500).json({ message: 'Failed to fetch playlist details' });
    }
  });
  

  

router.get("/playlist/:playlistId", async (req, res) => {
  const playlistId = req.params.playlistId;

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${YOUTUBE_API_KEY}`);
    const data = await response.json();

    if (!data.items) {
      return res.status(404).json({ error: "No videos found in this playlist" });
    }

    // Ensure snippet exists for each item
    const videos = data.items.map((item) => ({
      videoId: item.snippet?.resourceId?.videoId || null,
      title: item.snippet?.title || "No title available",
      channelTitle: item.snippet?.channelTitle || "Unknown Channel",
      thumbnail: item.snippet?.thumbnails?.medium?.url || "https://via.placeholder.com/150",
    })).filter(video => video.videoId !== null); // Remove null videoIds

    res.json({ videos });
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    res.status(500).json({ error: "Failed to fetch YouTube playlist" });
  }
});

router.get("/video/:videoId", async (req, res) => {
  const { videoId } = req.params;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );

    if (response.data.items.length > 0) {
      return res.json(response.data.items[0]);
    } else {
      return res.status(404).json({ error: "Video not found" });
    }
  } catch (error) {
    console.error("Error fetching video details:", error);
    res.status(500).json({ error: "Failed to fetch video details" });
  }
});

// Fetch Related Videos
router.get("/related/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    if (!videoId) {
      return res.status(400).json({ error: "Video ID is required" });
    }

    // Step 1: Get the video's details (to find the channelId)
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;
    const videoResponse = await axios.get(videoDetailsUrl);

    if (!videoResponse.data.items.length) {
      return res.status(404).json({ error: "Video not found" });
    }

    const channelId = videoResponse.data.items[0].snippet.channelId;

    // Step 2: Get videos from the same channel
    const relatedVideosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=${channelId}&maxResults=10&key=${YOUTUBE_API_KEY}`;
    const relatedResponse = await axios.get(relatedVideosUrl);

    res.json(relatedResponse.data.items);
  } catch (error) {
    console.error("Error fetching related videos:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch related videos" });
  }
});
router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: query,
        type: "video,playlist",
        maxResults: 10,
        key: YOUTUBE_API_KEY,
      },
    });

    res.json(response.data.items);
  } catch (error) {
    console.error("YouTube API error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch search results", error: error.response?.data });
  }
});

export default router; // ✅ Correct ES Module export
