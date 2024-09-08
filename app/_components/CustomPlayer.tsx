import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BsThreeDots } from "react-icons/bs";
import {
  FaFastBackward,
  FaFastForward,
  FaPause,
  FaPlay,
  FaVolumeUp,
} from "react-icons/fa";
import { IoVolumeMute } from "react-icons/io5";
import { Song } from "../_hooks/useFetchSongs";
import CustomProgressBar from "./CustomProgressBar";

interface CustomAudioPlayerProps {
  filteredSongs: Song[];
  currentIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

const CustomAudioPlayer = ({
  filteredSongs,
  currentIndex,
  handlePrevious,
  handleNext,
}: CustomAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    handleNext();
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center w-1/2"
    >
      <div className="flex flex-col justify-start w-96 items-start">
        <h1 className="text-3xl font-bold">
          {filteredSongs[currentIndex]?.name}
        </h1>
        <p className="text-md text-gray-300/75">
          {filteredSongs[currentIndex]?.artist}
        </p>
      </div>
      {filteredSongs[currentIndex] ? (
        <img
          src={`https://cms.samespace.com/assets/${filteredSongs[currentIndex]?.cover}`}
          alt={filteredSongs[currentIndex]?.title}
          className="w-96 h-96 object-cover rounded-lg mt-4"
        />
      ) : (
        <div className="w-96 h-96 bg-gray-600 rounded-lg mt-4"></div>
      )}

      <audio
        ref={audioRef}
        src={filteredSongs[currentIndex]?.url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="flex flex-col items-center  mt-4">
        <CustomProgressBar
          duration={duration}
          currentTime={currentTime}
          handleSeek={handleSeek}
        />

        <div className="flex items-center justify-between w-96 mt-4">
          <div className="bg-gray-500/55 p-2 rounded-full">
            <BsThreeDots size={20} className="cursor-pointer" />
          </div>
          <div className="flex items-center gap-5">
            <FaFastBackward
              size={24}
              onClick={handlePrevious}
              className="cursor-pointer"
            />
            {isPlaying ? (
              <FaPause
                size={24}
                onClick={togglePlayPause}
                className="cursor-pointer"
              />
            ) : (
              <FaPlay
                size={24}
                onClick={togglePlayPause}
                className="cursor-pointer"
              />
            )}
            <FaFastForward
              size={24}
              onClick={handleNext}
              className="cursor-pointer"
            />
          </div>

          <div className="bg-gray-500/55 p-2 rounded-full">
            <div className="relative flex items-center">
              {isMuted ? (
                <IoVolumeMute
                  size={20}
                  onClick={toggleMute}
                  className="cursor-pointer"
                />
              ) : (
                <FaVolumeUp
                  size={20}
                  onClick={toggleMute}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomAudioPlayer;
