import React, { useState, useEffect } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

import useAuthStore from '../store/authStore';

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ handleLike, handleDislike, likes }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(true);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [likes])

  return (
    <div className="mt-4 flex gap-6 mb-6 items-center cursor-pointer">
        {alreadyLiked ? (
          <button
            className="bg-primary rounded-full p-2 md:p-3 text-[#F51997]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </button>
        ) : (
          <button
            className="bg-primary rounded-full p-2 md:p-3"
            onClick={handleLike}
          >
            <MdFavoriteBorder className="text-lg md:text-2xl" />
          </button>
        )}
        <p className="text-md font-semibold">
          {likes?.length || 0} Нравится
        </p>
      </div>
  );
};

export default LikeButton;