import React from "react";

interface CustomProgressBarProps {
  duration: number; // Duration of the audio track in seconds
  currentTime: number; // Current playback time in seconds
  handleSeek: (event: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for seeking the audio track
}

const CustomProgressBar = ({
  duration,
  currentTime,
  handleSeek,
}: CustomProgressBarProps) => {
  const progressPercentage = (currentTime / duration) * 100; // Calculate the progress percentage

  return (
    <div className="flex items-center w-96">
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-300 rounded-full"
          style={{ width: `${progressPercentage}%` }} // Set the width of the progress bar based on the progress percentage
        ></div>
      </div>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek} // Call the handleSeek function when the input value changes
        className="absolute w-96 opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default CustomProgressBar;
