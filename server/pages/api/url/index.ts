import { NextApiRequest, NextApiResponse } from 'next';
import debug from '@/utils/debug_log';

import urlController from '@/controllers/url/url.controller';

const log = debug('masa:api:urls:index');


export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // eslint-disable-next-line no-console
  const { method } = req;
  log(method);
  if (!(method === 'POST' || method === 'GET')) {
    res.status(404).end();
  }
  if(method === 'GET') {
    await urlController.findOriginalUrl(req, res);
  }
  if (method === 'POST') {
    await urlController.registerUrl(req, res);
  }
}
