import { NextApiRequest, NextApiResponse } from 'next';
import debug from '../../../../utils/debug_log';

import eventController from '../../../../controllers/event/event.controller';

const log = debug('masa:api:events:[eventId]:orders.list');

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // eslint-disable-next-line no-console
  const { method } = req;
  log(method);
  if (!(method === 'POST' || method === 'GET')) {
    res.status(404).end();
  }
  if (method === 'GET') {
    await eventController.findOrders(req, res);
  }
}
