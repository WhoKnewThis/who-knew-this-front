import React from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void; // 검색 버튼 클릭 핸들러
}

export default function SearchBar({ value, onChange, onSearch }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex justify-center relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="궁금한 주제를 검색해보세요."
        className="w-full h-[56px] px-4 py-2 mb-[155px] rounded-[20px] border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-btn-sub-purple2"
      />
      <button
        onClick={onSearch}
        className="absolute right-0 top-0 h-[56px] px-6 text-white bg-btn-primary rounded-r-[20px] hover:bg-btn-primary2"
      >
        검색
      </button>
    </div>
  );
}
