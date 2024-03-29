import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';

import useAuthStore from '../store/authStore';
import { client } from '../utils/client';

import { topics } from '../utils/constants';
import { BASE_URL } from '../utils';

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: any } = useAuthStore();

  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    setIsLoading(true);
    setWrongFileType(false);

    if (fileTypes.includes(selectedFile.type)) {
      await client.assets.upload('file', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        })
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  }

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: category,
      }

      await axios.post(`${BASE_URL}/api/post`, document)
        .finally(() => {
          setSavingPost(false);
          router.push('/');
        });
    }
  }

  return (
    <div className="flex w-full absolute left-0 top-[60px] mb-10 pt-10 pb-10 lg:pt-20 bg-[#F8F8F8]
    justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center xl:justify-between
      items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">
              Загрузка Видео
            </p>
            <p className="text-md text-gray-400 mt-1">
              Разместите видео в своем аккаунте
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col
          justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-2 cursor-pointer
          hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Загружается...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-full w-full bg-black"
                    >

                    </video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <FaCloudUploadAlt className="font-bold text-gray-300 text-6xl" />
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-5">
                        MP4, WebM или ogg <br />
                        720x1280 или более <br />
                        До 10 минут <br />
                        Не более 2GB
                      </p>
                      <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md
                      font-medium p-2 w-52 outline-none">
                        Выбрать Файл
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={uploadVideo}
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-md text-red-400 font-semibold mt-4 w-[250px]">
                *Выбран некорректный формат файла
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">
            Заголовок
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
          />

          <label className="text-md font-medium">
            Выберите категорию
          </label>
          <select
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {topics.map((topic) => (
              <option
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                key={topic.name}
                value={topic.name}
              >
                {topic.title}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={() => {}}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Отмена
            </button>
            <button
              onClick={handlePost}
              type="button"
              className="bg-[#f51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              {savingPost ? 'Сохраняю' : 'Загрузить'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Upload;