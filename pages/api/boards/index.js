import dbConnect from '../../../utils/db'
import Pin from '../../../models/Pin'
import Board from '../../../models/Board'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  const { method } = req
  const session = await getSession({ req })

  if (!session) {
    // TODO re-enable Not Signed in
    // return res.status(401).end()
  }

  await dbConnect();
  const filter = {};

  switch (method) {
    case 'GET':
      try {
        // TODO replace with Board.index(filter)
        const boards = await Board.find(filter); /* find all the data in our database */
        const responsePromise = boards.map(async board => {
          return {
            ...board.toJSON(),
            pinCount: await Pin.countDocuments({ boardId: board._id })
          }
        });
        res.status(200).json(await Promise.all(responsePromise))
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'POST':
      try {
        const board = await Board.create(
            req.body
        ); /* create a new model in the database */

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
