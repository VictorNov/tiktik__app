import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import { urlFor } from '../utils/client';
import { Video } from '../types';

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play()
        .catch((err) => console.log(err));
      setPlaying(true);
    }
  }
  
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 items-center cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex flex-col items-start gap-2">
                <p className="flex items-center gap-2 md:text-md font-bold text-primary">
                  {post.postedBy.userName}
                  <GoVerified
                    className="text-blue-400 text-md inline"
                  />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onPointerEnter={() => {setIsHover(true)}}
          onPointerLeave={() => {setIsHover(false)}}
          className="rounded-3xl w-fit"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              muted={isVideoMuted}
              ref={videoRef}
              className="lg:w-[600px] w-[200px] lg:h-[530px] md:h-[400px] h-[300px]
              rounded-2xl object-cover cursor-pointer bg-gray-100"
              src={post.video.asset.url}
            >
            </video>
          </Link>

          {isHover && (
            <div className="text-black text-2xl lg:text-4xl absolute bottom-6 cursor-pointer left-8
            md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3
            drop-shadow-[1px_1px_0_#FFFFFF]">
              {playing ? (
                <button
                  onClick={onVideoPress}
                >
                  <BsFillPauseFill />
                </button>
              ) : (
                <button
                  onClick={onVideoPress}
                >
                  <BsFillPlayFill />
                </button>
              )}
              {isVideoMuted ? (
                <button
                  onClick={() => setIsVideoMuted(false)}
                >
                  <HiVolumeOff />
                </button>
              ) : (
                <button
                  onClick={() => setIsVideoMuted(true)}
                >
                  <HiVolumeUp />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;