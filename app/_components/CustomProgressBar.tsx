import React from "react";

interface CustomProgressBarProps {
  duration: number;
  currentTime: number;
  handleSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomProgressBar = ({
  duration,
  currentTime,
  handleSeek,
}: CustomProgressBarProps) => {
  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="flex items-center w-96">
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-300 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="absolute w-96 opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default CustomProgressBar;
