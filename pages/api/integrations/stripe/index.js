import Stripe from 'stripe'
import {getSession} from "next-auth/client";

import Board from "models/Board";

import dbConnect from "utils/db";
import {tiers} from "utils/stripeHelper";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-03-02',
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed')
    }

    const session = await getSession({req});
    const {selection, id} = req.body;
    const selectionInfo = tiers[selection];

    // Validate the amount that was passed from the client.
    if (!selection || !selectionInfo) {
        return res.status(400).end('Check request inputs')
    }

    try {
        await dbConnect();
        const board = await Board.findById(id);

        // Create Checkout Sessions from body params.
        const checkoutSession = await stripe.checkout.sessions.create({
            submit_type: 'auto',
            customer_email: session.user.email,
            payment_method_types: ['card'],
            line_items: [
                {
                    name: `${selectionInfo.prettyName} Cheershare Board`,
                    amount: selectionInfo.amount,
                    currency: 'usd',
                    quantity: 1,
                    description: `Share \"${board.title}\" to more friends and family.`,
                    images: [board.coverImage],
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/api/integrations/stripe/${id}?sessionId={CHECKOUT_SESSION_ID}&selection=${selection}`,
            cancel_url: `${req.headers.origin}/cheer/${id}/upgrade`,
        });

        res.status(200).json(checkoutSession)
    } catch (err) {
        res.status(500).json({statusCode: 500, message: err.message})
    }
}
