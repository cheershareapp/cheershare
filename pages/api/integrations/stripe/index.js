import Stripe from 'stripe'
import {getSession} from "next-auth/client";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-03-02',
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed')
    }
    const session = await getSession({ req });
    const {amount, selection, cancelUrl, coverImageUrl, title} = req.body;
    try {
        // Validate the amount that was passed from the client.
        if (!amount) {
            throw new Error('Invalid amount.')
        }

        // Create Checkout Sessions from body params.
        const checkoutSession = await stripe.checkout.sessions.create({
            submit_type: 'auto',
            customer_email: session.user.email,
            payment_method_types: ['card'],
            line_items: [
                {
                    name: selection,
                    amount: 599, // formatAmountForStripe(amount, CURRENCY),
                    currency: 'usd',
                    quantity: 1,
                    description: "More unified modeling for Checkout items—instead of plans, SKUs, and inline line items, every item is now a price.",
                    images: ['https://getcheershare.com/_next/image?url=https%3A%2F%2Fmedia4.giphy.com%2Fmedia%2F3oEjHNCWpx4iQYytAA%2Fgiphy.gif%3Fcid%3Deef24604flkw8ap0qo82nxkm3fz1aljip0n7zels6hwvpnfz%26rid%3Dgiphy.gif&q=75&w=640'] //[],
                },
            ],
            success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl || `${req.headers.origin}/`,
        });

        res.status(200).json(checkoutSession)
    } catch (err) {
        res.status(500).json({statusCode: 500, message: err.message})
    }
}
