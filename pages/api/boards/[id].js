import dbConnect from '../../../utils/db'
import Board from '../../../models/Board'
import Pin from "../../../models/Pin";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const board = await Board.findById(id);
        if (!board) {
          return res.status(400).json({ success: false })
        }
        // TODO const board = await Board.findOne().or([{ _id : id }, { slug: id }]);
        const pins = await Pin.find({ boardId: board.id });

        res.status(200).json({
            pins: pins.map(v => v.toJSON()),
            ...board.toJSON()
        } )
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const pet = await Board.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!pet) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: pet })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedPet = await Board.deleteOne({ _id: id })
        if (!deletedPet) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
