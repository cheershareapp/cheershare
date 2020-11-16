import dbConnect from '../../../utils/db'
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
        const boards = await Board.find(filter); /* find all the data in our database */
        res.status(200).json(boards)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'POST':
      try {
        await Board.create(
            req.body
        ); /* create a new model in the database */

        // we send the whole list of boards down as that is what the API expects
        const data = await Board.find(filter);
        res.status(201).json(data)
      } catch (error) {
        // TODO suppress the error?
        res.status(400).json({ success: false, error })
      }
      break;
    default:
      res.status(400).json({ success: false })
      break
  }
}
