// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
//@ts-ignore
import axios from "axios";

type Data = {
  name: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const response = await axios.post(
      "http://13.48.136.54:8000/api/api-code/",
      {
        headers: {
          Authorization: "Bearer c254f87f-f4a9-4eeb-be38-204e77ea61f9",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ name: "Error" });
  }
}
