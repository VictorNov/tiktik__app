import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import { useRouter } from 'next/router';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import useAuthStore from '../../store/authStore';

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false)
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const searchedAccounts = allUsers.filter((user: IUser) => {
    return user.userName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const Accounts = isAccounts
    ? 'border-b-2 border-black -mb-[2px]' : 'text-gray-400';
  const isVideos = !isAccounts
    ? 'border-b-2 border-black -mb-[2px]' : 'text-gray-400';

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${Accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Пользователи
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Видео
        </p>
      </div>

      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser) => (
              <Link href={`/profile/${user._id}`} key={user._id}>
                <div className="flex items-center gap-3 cursor-pointer p-2 font-semibold
                border-b-2 border-gray-200">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt={user.userName}
                    />
                  </div>

                  <div className="">
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName.replaceAll(' ', '')}
                      <GoVerified className="text-blue-400"/>
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`Нет пользователей по запросу ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videos?.length > 0 ? (
            videos.map((video, index) => <VideoCard post={video} key={index} />)
          ) : (
            <NoResults text={`Нет видео по запросу ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
                                           params: {searchTerm},
                                         }: { params: { searchTerm: string } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: data }
  }
};

export default Search;