import React, { useState, useRef, useEffect } from "react";
import { blockData } from "./blocksData";

const CustomDropdown: React.FC<{
  selectedBlock: string;
  setSelectedBlock: (block: string) => void;
}> = ({ selectedBlock, setSelectedBlock }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (blockName: string) => {
    setSelectedBlock(blockName);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full bg-[#212121] text-gray-300 p-4 rounded-lg shadow-md flex justify-between items-center text-lg md:text-xl"
      >
        <span>{selectedBlock || "Select a Block"}</span>
        <svg
          className={`w-6 h-6 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-[#212121] border border-[#181818] rounded-lg shadow-lg max-h-60 overflow-auto">
          {blockData.map((block) => (
            <li
              key={block.name}
              onClick={() => handleSelect(block.name)}
              className="cursor-pointer p-4 hover:bg-[#181818] text-gray-300 transition duration-200 text-lg md:text-xl"
            >
              {block.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<string>("");

  const selectedBlockInfo = blockData.find(
    (block) => block.name === selectedBlock
  );

  return (
    <div className="min-h-screen custom-bg text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#181818] shadow-xl rounded-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
          Block Finder
        </h1>

        <CustomDropdown
          selectedBlock={selectedBlock}
          setSelectedBlock={setSelectedBlock}
        />

        {!selectedBlock && (
          <div className="flex flex-col items-center justify-center mt-6">
            <img
              src="search.png"
              alt="Search placeholder"
              className="w-36 h-36 opacity-50 mb-4"
            />
            <p className="text-gray-400 text-lg md:text-xl">Please select a block</p>
          </div>
        )}

        {selectedBlock && selectedBlockInfo && (
          <div className="mt-8">
            <div className="bg-[#212121] p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                {selectedBlockInfo.name}
              </h2>
              <p className="text-lg md:text-xl text-gray-400 mb-2">
                {selectedBlockInfo.description}
              </p>
              <p className="text-lg text-gray-400 mb-2">
                <strong>Location:</strong> {selectedBlockInfo.location}
              </p>
              <p className="text-lg text-gray-400 mb-2">
                <strong>Phone:</strong> {selectedBlockInfo.phone}
              </p>
              <p className="text-lg text-gray-400">
                <strong>Working Hours:</strong> {selectedBlockInfo.openTime} -{" "}
                {selectedBlockInfo.closeTime}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
