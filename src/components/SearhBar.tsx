import React from "react";
interface Props{
    value:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>) =>void;
}

export default function SearchBar({value, onChange}:Props){
    return(
        <div className="flex justify-center my-4">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="궁금한 주제를 검색해보세요."
                className="w-full max-w-2xl h-[46px] px-4 py-2 mb-[155px] rounded-full border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-btn-sub-purple2"
            />
        </div>
        // mt-36 mb-[120px] w-[580px] h-[46px] rounded-full
    )
}
