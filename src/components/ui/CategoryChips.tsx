
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface CategoryChipProps {
  categories: string[];
  selectedCategory?: string;
  onSelect?: (category: string) => void;
}

const CategoryChips: React.FC<CategoryChipProps> = ({
  categories,
  selectedCategory,
  onSelect = () => {}
}) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            selectedCategory === category
              ? "bg-music-accent text-white"
              : "bg-music-surface text-music-subtle hover:text-white"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
