import dbConnect from 'utils/db'
import Pin from "models/Pin";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
    const {
        query: { pinId },
        method,
    } = req;
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).end()
    }

    await dbConnect();

    switch (method) {
        case 'PUT' /* Edit a model by its ID */:
            try {
                const updatedPin = await Pin.findByIdAndUpdate(pinId, req.body, {
                    new: true,
                    runValidators: true,
                });

                if (!updatedPin) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({
                    success: true,
                    // not sure what we should send here
                    data: updatedPin.toJSON()
                });
            } catch (error) {
                console.error(error, 'PUT /api/boards/:id/pins');
                res.status(400).json({ success: false });
            }
            break;

        case 'DELETE':
            try {
                const deletedPin = await Pin.deleteOne({ _id: pinId, /* Delete only Pins you own? */ });
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
