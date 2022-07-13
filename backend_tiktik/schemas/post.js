export default {
  name: 'post',
  title: 'Пост',
  type: 'document',
  fields: [
    {
      name: 'caption',
      title: 'Заголовок',
      type: 'string',
    },
    {
      name: 'video',
      title: 'Видео',
      type: 'file',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'userId',
      title: 'UserId',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'Автор',
      type: 'postedBy',
    },
    {
      name: 'likes',
      title: 'Нравится',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
    },
    {
      name: 'comments',
      title: 'Комментарии',
      type: 'array',
      of: [{ type: 'comment' }],
    },
    {
      name: 'topic',
      title: 'Описание',
      type: 'string',
    },
  ],
};