export default {
  name: 'comment',
  title: 'Комментарий',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'Автор',
      type: 'postedBy',
    },
    {
      name: 'comment',
      title: 'Комментарий',
      type: 'string',
    },
  ],
}