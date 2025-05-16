import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/api/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = req.body;
  const connection = await db.getConnection();
  await connection.query('INSERT INTO users SET ?', data);
  return res.json(data);
}
