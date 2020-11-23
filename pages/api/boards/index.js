import dbConnect from '../../../utils/db'
import Board from '../../../models/Board'
import { getSession } from '@nuvest/next-auth/client'

export default async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end()
  }

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const boards = await Board.index({ $or: [
            {ownerId: session.user.id},
            {recipientId: session.user.id}
          ]});

        res.status(200).json(boards)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'POST':
      try {
        const board = await Board.create({
          ...req.body,

          /* create a new Board with the session owner */
          ownerId: session.user.id
        });

        res.status(201).json({
          ...board.toJSON(),
          pinCount: 0
        })
      } catch (error) {
        // TODO suppress the error?
        res.status(400).json({ success: false, error })
      }
      break;
    default:
      res.status(400).json({ success: false });
      break
  }
}
