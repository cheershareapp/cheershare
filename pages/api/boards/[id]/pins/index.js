import dbConnect from 'utils/db'
import Pin from "models/Pin";
import Board from "models/Board";
import { getSession } from "next-auth/client";

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
        case 'POST' /* Create a new Pin and update the Board with the cover image */:
            try {
                const ownerId = session.user.id;
                const pin = await Pin.create({
                    ...req.body,
                    ownerId,
                    ownerName: session.user.name || session.user.email.split('@')[0]
                });

                const board = await Board.findById(pin.boardId);
                board.collaborators.push(ownerId);
                board.coverImage = board.coverImage || pin.mediaUrl;
                // TODO(future) what happens to coverImage when the last pin is deleted?

                await board.save();
                res.status(201).json(pin)
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break;

        case 'PUT' /* Edit a model by its ID */:
        case 'PATCH' /* Edit list of model by its ID */:
            try {
                const body = Array.isArray(req.body) ? req.body : [req.body];
                const pinsUpdatedPromises = body.map(i => Pin.findByIdAndUpdate(i.id, i, {
                    new: true,
                    runValidators: true,
                }));
                const pins = await Promise.all(pinsUpdatedPromises);
                if (!pins) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({
                    pins: pins.map(v => v.toJSON()),
                });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'DELETE':
            try {
                const deletedPin = await Pin.deleteOne({ _id: id, /* Delete only Pins you own? */ });
                if (!deletedPin) {
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
