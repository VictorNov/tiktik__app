import type { NextApiRequest, NextApiResponse } from 'next';
import { postDetailQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';
import { uuid } from 'uuidv4';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const query = postDetailQuery(id);

    const data = await client.fetch(query);

    res.status(200).json(data[0]);
  } else if (req.method === 'PUT') {
    const { id }: any = req.query;
    const { userId, comment } = req.body;

    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          _key: uuid(),
          postedBy: {
            _ref: userId,
            _type: 'postedBy'
          },
          comment: comment,
        }
      ])
      .commit()

    res.status(200).json(data);
  }
}