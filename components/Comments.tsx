import React, {Dispatch, SetStateAction} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import { IUser } from '../types';

interface IProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  comments: IComment[];
  addComment: (e: React.FormEvent) => void;
  isPostingComment: boolean;
}

interface IComment {
  comment: string,
  length?: number,
  postedBy: {
    _ref: string,
    _id: string,
  },
  _key: string,
}

const Comments = ({ comment, setComment, comments, addComment, isPostingComment }: IProps) => {
  const { userProfile, allUsers }: any = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-auto lg:h-[475px]">
        {comments?.length ? (
          comments.map((item, index) => (
            <>
              {allUsers.map((user: IUser) => (
                user._id === (item.postedBy._id || item.postedBy._ref) && (
                  <div
                    className={`p-2 flex flex-col gap-2 ${userProfile?._id === user._id ? 'items-end' : 'items-start'}`}
                    key={index}
                  >
                    <Link
                      href={`/profile/${user._id}`}
                    >
                      <div className="flex items-center gap-3 cursor-pointer">
                        <div className="w-8 h-8">
                          <Image
                            src={user.image}
                            width={34}
                            height={34}
                            className="rounded-full"
                            alt={user.userName}
                            layout="responsive"
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

                    <div className="bg-white px-4 py-1.5 rounded-lg">
                      <p>
                        {item.comment}
                      </p>
                    </div>
                  </div>
                )
              ))}
            </>
          ))
        ) : (
          <NoResults text="Еще ни одного комментария" />
        )}
      </div>

      {userProfile && (
        <div className="absolute w-full bottom-0 left-0 pb-6 px-2 md:px-10">
          <form
            className="flex gap-4"
            onSubmit={addComment}
          >
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Напишите комментарий"
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-full border-gray-100
              focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button
              type="submit"
              className="text-md text-gray-400"
              onClick={addComment}
            >
              {isPostingComment ? 'Сохраняю...' : 'Оставить комментарий'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;