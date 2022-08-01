import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';

interface IProps {
  userData: {
    user: IUser,
    likes: Video[],
    created: Video[],
  }
}

const Profile = ({ userData }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const { user, likes, created } = userData;

  const videos = showUserVideos
    ? 'border-b-2 border-black -mb-[2px]' : 'text-gray-400';
  const liked = !showUserVideos
    ? 'border-b-2 border-black -mb-[2px]' : 'text-gray-400';

  useEffect(() => {
    setVideosList(showUserVideos ? created : likes)
  }, [showUserVideos, created, likes])

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt={user.userName}
            layout="responsive"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="tracking-wider flex gap-1 items-center md:text-2xl
          font-bold text-primary lowercase">
            {user.userName.replaceAll(' ', '')}
            <GoVerified className="text-blue-400"/>
          </p>
          <p className="capitalize md:text-xl text-gray-400 text-xs">
            {user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Видео
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Нравится
          </p>
        </div>

        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((video, index) => <VideoCard post={video} key={index} />)
          ) : (
            <NoResults text="Пока нет ни одного видео" />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
 params: {id},
}: { params: { id: string } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { userData: data }
  }
};

export default Profile;