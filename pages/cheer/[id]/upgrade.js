import React, {useState} from 'react';
import Header from "components/header";
import Link from "next/link";
import Footer from "components/footer";
import {Button} from "react-bootstrap";
import { useRouter } from 'next/router'
import fetcher from "utils/fetch";
import getStripe from "utils/stripeHelper";

export default function Upgrade() {
    const router = useRouter();
    const { id } = router.query;

    const [loading, setLoading] = useState(false);

    const handleSelection = async (selection) => {
        setLoading(selection);

        // Create a Checkout Session.
        const response = await fetcher('/api/integrations/stripe/',  {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                selection,
                id
            })
        });

        if (response.statusCode === 500) {
            console.error(response.message);
            return
        }

        // Redirect to Checkout.
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: response.id,
        });

        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        // setError(error.message);

        setLoading(false);
    };

    return (<>
        <Header/>
        <div className="container min-vh-100">
            {/*A Mini Kudoboard is FREE and allows up to 10 contributions. It works great if you have a small number of contributors, want to create a 1-to-1 board between you and the recipient, or would like to trial the system. You can start with a Mini board and upgrade later.*/}
            {/*A Premium Kudoboard allows 100 contributions on a single board for a one-time charge of $5.99. It's perfect for larger groups on birthdays, work anniversaries, and other special occasions! You can start with a Premium board and upgrade later.*/}
            <Button className="float-right" variant="link" onClick={() => router.back()}>Back to
                board</Button>

            <h1 className="mt-3">Pricing</h1>
            <p className="lead mt-5">Choose the option that's right for you. From single group cards to ongoing plans,
                for personal use or for the office. Every Cheershare offers:</p>

            <div className="row mt-5 align-items-top">
                <div className="col-12 col-sm-10 col-md-6 col-lg-5 mx-auto col-xl-4 text-left">
                    <div className="bg-gray p-3 text-center rounded sl-1">
                        <h2 className="font-weight-light">Mini</h2>
                        <p className="h3 pb-2">Free</p>
                        <p>Great for a small group of contributors, 1-to-1 boards, or to test the Cheershare
                            system.</p>
                        <p className="text-center">
                            <a className="btn btn-outline-success disabled">Enabled</a>
                        </p>

                        <hr className="mt-5 mb-5"/>

                        <p>Up to 10 posts</p>
                        <p>Email support</p>
                        <p>Upgrade anytime</p>
                    </div>
                </div>

                <div className="col-12 col-sm-10 col-md-6 col-lg-5 mx-auto col-xl-4 text-left pt-5 pt-md-0">
                    <div className="bg-gray p-3 text-center rounded sl-1">
                        <h2 className="font-weight-light">Premium</h2>
                        <p className="h3 pb-2">$5.99 <small className="text-muted">/ board</small></p>
                        <p>Best for a larger group of contributors on a birthday, work anniversary, or special
                            occasion.</p>
                        <p className="text-center">
                            <a className="btn btn-success" onClick={() => handleSelection('premium')}>
                                {'premium' === loading && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>} Upgrade
                            </a>
                        </p>

                        <hr className="mt-5 mb-5"/>

                        <p>Up to 100 posts</p>
                        <p>Priority email support</p>
                        <p>Upgrade anytime</p>
                    </div>
                </div>

                <div className="col-12 col-sm-10 col-md-6 col-lg-5 mx-auto col-xl-4 text-left pt-5 pt-xl-0">
                    <div className="bg-gray p-3 text-center rounded sl-1">
                        <h2 className="font-weight-light">Milestone</h2>
                        <p className="h3 pb-2">$19.99 <small className="text-muted">/ board</small></p>
                        <p>Perfect for extra large groups or milestones that you will celebrate in-person.</p>
                        <p className="text-center">
                            <a className="btn btn-success" onClick={() => handleSelection('milestone')}>
                                {'milestone' === loading && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>} Upgrade
                            </a>
                        </p>

                        <hr className="mt-5 mb-5"/>

                        <p>3000 users included</p>
                        <p>Help center access</p>
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <div className="col m-auto text-left pt-5 pt-xl-0">
                    <div className="bg-gray p-3 text-center rounded sl-1">
                        <h2 className="font-weight-light">Enterprise</h2>
                        <p className="h3 pb-2">Call Us</p>
                        <p>Want unlimited boards, multiple creators & Enterprise SSO? Check out our Business and
                            Enterprise plans for all your organization's needs.</p>
                        <p className="text-center">
                            <Link href="/cheer/">
                                <a className="btn btn-outline-success">Contact</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>);
}
