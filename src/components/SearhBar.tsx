import React, {useState} from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void; //api호출 라우팅
  disabled?: boolean; //로딩 중 비활성화 
}

export default function SearchBar({ value, onChange, onSearch, disabled }: Props) {
  const [isComposing, setIsComposing] = useState(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter'&& !isComposing) {
      onSearch();
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComposing) onSearch();
  };
  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="flex justify-center relative">
        <input
          type="search"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="궁금한 주제를 검색해보세요."
          aria-label="주제 검색"
          autoComplete="off"
          inputMode="search"
          enterKeyHint="search"
          className="
            w-full h-[56px] px-4 pr-24 py-2 mb-[155px]
            rounded-[20px] border border-gray-300
            bg-white/90 text-gray-900
            focus:outline-none focus:ring-2 focus:ring-btn-sub-purple2
          "
        />
        <button
          type="submit"
          disabled={disabled}
          className="
            absolute right-0 top-0 h-[56px] px-6
            text-white bg-btn-primary hover:bg-btn-primary2
            rounded-r-[20px]
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          검색
        </button>
      </div>
    </form>
  );
}