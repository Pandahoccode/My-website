"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  selectedTags?: string[];
  availableTags?: string[];
  onToggleTag?: (tag: string) => void;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  selectedTags = [],
  availableTags = [],
  onToggleTag
}: SearchBarProps) {
  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative flex items-center bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-full px-6 py-3 shadow-lg">
          <Search className="w-5 h-5 text-gray-500 mr-3" />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent border-none outline-none w-full placeholder-slate-400 font-medium transition-colors focus:ring-0"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      {/* Hashtag Filters */}
      {availableTags.length > 0 && onToggleTag && (
        <div className="flex flex-wrap justify-center gap-2">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold border transition-all duration-300 ${selectedTags.includes(tag)
                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'bg-white/5 border-black/5 dark:border-white/10 hover:border-cyan-500/50 text-gray-500 hover:text-cyan-500'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
