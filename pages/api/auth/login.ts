import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).end();
  }

  return res.status(200).json({ email, password });
}
