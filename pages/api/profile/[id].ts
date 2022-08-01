import type { NextApiRequest, NextApiResponse } from 'next';

import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const query = singleUserQuery(id);
    const likes = userLikedPostsQuery(id);
    const created = userCreatedPostsQuery(id);

    const user = await client.fetch(query);
    const userLikes = await client.fetch(likes);
    const userCreated = await client.fetch(created);

    const userData = {
      user: user[0],
      likes: userLikes,
      created: userCreated,
    }

    res.status(200).json(userData);
  }
}