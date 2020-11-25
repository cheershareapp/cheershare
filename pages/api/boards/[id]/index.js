import { getSession } from '@nuvest/next-auth/client'
import dbConnect from '../../../../utils/db'
import Board from '../../../../models/Board'
import Pin from "../../../../models/Pin";

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).end()
    }

    await dbConnect();

    switch (method) {
        case 'GET' /* Get a model by its ID */:
            try {
                const response = await Board.index({_id: id}, { nestPins: true });

                res.status(200).json(response[0]);
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;

        case 'PUT' /* Edit board by its ID */:
            try {
                const board = await Board.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!board) {
                    return res.status(400).json({ success: false })
                }
                if (board.ownerId !== session.user.id) {
                    return res.status(401).json({ success: false })
                }
                const pins = await Pin.find({ boardId: board.id });

                res.status(200).json({
                    pins: pins.map(v => v.toJSON()),
                    ...board.toJSON()
                } )
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;

        case 'DELETE' /* Delete board by its ID */:
            try {
                const deletedBoard = await Board.deleteOne({ _id: id, ownerId: session.user.id });
                if (!deletedBoard) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;

        default:
            res.status(400).json({ success: false });
            break
    }
}
