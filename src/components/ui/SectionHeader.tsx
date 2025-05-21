
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  description?: string;
  linkTo?: string;
  linkText?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  linkTo,
  linkText = 'See all'
}) => {
  return (
    <div className="flex justify-between items-end mb-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">{title}</h2>
        {description && (
          <p className="text-sm text-music-subtle">{description}</p>
        )}
      </div>
      
      {linkTo && (
        <Link 
          to={linkTo} 
          className="flex items-center text-sm text-music-subtle hover:text-white smooth-transition"
        >
          {linkText}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
