import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize OAuth2 Client
export const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// ✅ Generate Auth URL
export const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube.readonly"],
  });
};

// ✅ Exchange code for access token
export const getAccessToken = async (code: string) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens); // Store tokens
    return tokens;
  } catch (error) {
    console.error("❌ Error fetching access token:", error);
    throw error;
  }
};
