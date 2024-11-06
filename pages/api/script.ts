import { writeFile, readFile } from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { scriptService } from '../services.ts/script.service';

interface ScriptBody {
  ids: string;
  dates: Date[];
}

interface ResponseData {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {


    try {
      const filePath = path.join(process.cwd(), 'pages', 'api', 'script.txt');
      const script = await readFile(filePath, { encoding: 'utf-8' })





      return res.status(200).json({ message: script });
    } catch (error) {
      console.error('Error updating script:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  if (req.method === 'PATCH') {


    try {
      const { ids, dates } = req.body as ScriptBody;
   console.log(dates)
   const script =  await scriptService.udateScriptString({ids, dates:String(dates)})

      return res.status(200).json({ message: script });
    } catch (error) {
      console.error('Error updating script:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}
