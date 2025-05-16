import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/api/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const connection = await db.getConnection();
  const [data] = await connection.query('SELECT * FROM question ORDER BY id ASC');
  connection.release();
  return res.json(data);
}
