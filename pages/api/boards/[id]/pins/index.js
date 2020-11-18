import dbConnect from '../../../../../utils/db'
import Pin from "../../../../../models/Pin";

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
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
