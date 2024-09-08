"use client";

import Image from "next/image";

export const MusicLogo = () => {
  return (
    <Image
      src={
        "https://ik.imagekit.io/umdiwr6ma/logo_spotify.png?updatedAt=1725572848297"
      }
      alt="Spotify Logo"
      width={132}
      height={40}
      className="rounded-full mb-4"
    />
  );
};

export const ProfileImage = () => {
  return (
    <Image
      src={
        "https://ik.imagekit.io/umdiwr6ma/FjU2lkcWYAgNG6d.jpg?updatedAt=1725789480257"
      }
      alt="Spotify User"
      width={40}
      height={40}
      className="rounded-full"
    />
  );
};
