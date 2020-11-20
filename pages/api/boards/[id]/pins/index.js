import dbConnect from '../../../../../utils/db'
import Pin from "../../../../../models/Pin";
import Board from "../../../../../models/Board";

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;

    await dbConnect();

    switch (method) {
        case 'POST' /* Edit a model by its ID */:
            try {
                const pin = await Pin.create(
                    req.body
                );
                res.status(200).json(pin)
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

        case 'DELETE' /* Delete a model by its ID */:
            try {
                const deletedPet = await Board.deleteOne({ _id: id });
                if (!deletedPet) {
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
