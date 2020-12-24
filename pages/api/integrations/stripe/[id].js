import Board from "models/Board";
import dbConnect from "utils/db";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).end('Method Not Allowed')
    }

    const {sessionId, id, selection} = req.query;

    // Validate the amount that was passed from the client.
    if (!sessionId || !id) {
        return res.status(400).end('Check request inputs')
    }

    try {
        await dbConnect();
        const board = await Board.findByIdAndUpdate(id, {
            tier: selection
        }, {
            new: true,
            runValidators: true,
        });

        res.redirect(`/cheer/${id}?payment=done`);
    } catch (err) {
        res.status(500).json({statusCode: 500, message: err.message})
    }
}
