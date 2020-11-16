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
  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const pets = await Board.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: pets })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const data = await Board.create(
            req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data })
      } catch (error) {
        // TODO suppress the error?
        res.status(400).json({ success: false, error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
