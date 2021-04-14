import React from "react";
import Head from 'next/head'
import Link from "next/link";
import {Figure} from "react-bootstrap";
import Typical from 'react-typical';
import Header from "components/header";

export default function Home() {
    return (<>
        <Head>
            <title>Welcome to Cheershare</title>
            <meta property="og:title" content="Celebrate your friends and loved ones!" />
            <meta property="og:type" content="website" />
            <meta property="og:description" content="Share your cheer with our sharable poster board. Create your Cheerboard today!" />
        </Head>
        <Header className="py-3" index/>
        <main>
            <section className="fdb-block fdb-viewport py-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col">
                            <h1>Pricing</h1>
                            <p className="lead">Choose the option that's right for you. From single group cards to ongoing plans,
                                for personal use or for the office.</p>
                        </div>
                    </div>

                    <div className="row mt-5 align-items-top">
                        <div className="col-12 col-sm-10 col-md-6 col-lg-5 m-auto col-xl-3 text-left">
                            <div className="bg-gray p-3 text-center rounded sl-1">
                                <h2 className="font-weight-light">Mini</h2>
                                <p className="h3 pb-2">Free</p>
                                <p>Great for a small group of contributors, 1-to-1 boards, or to test the Cheershare system.</p>
                                <p className="text-center">
                                    <Link href="/cheer/">
                                        <a className="btn btn-outline-success">Start for free</a>
                                    </Link>
                                </p>

                                <hr className="mt-5 mb-5" />

                                <p>Up to 10 posts</p>
                                <p>Email support</p>
                                <p>Upgrade anytime</p>
                            </div>
                        </div>

                        <div className="col-12 col-sm-10 col-md-6 col-lg-5 m-auto col-xl-3 text-left pt-5 pt-md-0">
                            <div className="bg-gray p-3 text-center rounded sl-1">
                                <h2 className="font-weight-light">Premium</h2>
                                <p className="h3 pb-2"><del>$5.99</del> SALE!
                                    <br/>$3.99 <small className="text-muted">/ board</small></p>
                                <p>Best for a larger group of contributors on a birthday, work anniversary, or special occasion.</p>
                                <p className="text-center">
                                    <Link href="/cheer/">
                                        <a className="btn btn-success">Create Cheerboard</a>
                                    </Link>
                                </p>

                                <hr className="mt-5 mb-5" />

                                <p>Up to 100 posts</p>
                                <p>Priority email support</p>
                                <p>Upgrade anytime</p>
                            </div>
                        </div>

                        <div className="col-12 col-sm-10 col-md-6 col-lg-5 m-auto col-xl-3 text-left pt-5 pt-xl-0">
                            <div className="bg-gray p-3 text-center rounded sl-1">
                                <h2 className="font-weight-light">Milestone</h2>
                                <p className="h3 pb-2"><del>$19.99</del> Limited time only!
                                    <br/>$12.99 <small className="text-muted">/ board</small></p>
                                <p>Perfect for extra large groups or milestones that you will celebrate in-person.</p>
                                <p className="text-center">
                                    <Link href="/cheer/">
                                        <a className="btn btn-outline-success">Create Cheerboard</a>
                                    </Link>
                                </p>

                                <hr className="mt-5 mb-5" />

                                <p>3000 users included</p>
                                <p>Help center access</p>
                            </div>
                        </div>

                        <div className="col-12 col-sm-10 col-md-6 col-lg-5 m-auto col-xl-3 text-left pt-5 pt-xl-0">
                            <div className="bg-gray p-3 text-center rounded sl-1">
                                <h2 className="font-weight-light">Enterprise</h2>
                                <p className="h3 pb-2">Call Us</p>
                                <p>Want unlimited boards, multiple creators, & more? Check out our Business and Enterprise plans for all your organization's needs.</p>
                                <p className="text-center">
                                    <Link href="/cheer/">
                                        <a className="btn btn-outline-success">Contact</a>
                                    </Link>
                                </p>

                                <hr className="mt-5 mb-5" />

                                <p>Enterprise SSO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="fdb-block pt-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-12">
                            <h1>Features</h1>
                        </div>
                    </div>

                    <div className="row text-center justify-content-center mt-5 pt-5">
                        <div className="col-12 col-sm-4 col-lg-3 m-md-auto">
                            <img alt="image" className="fdb-icon" src="images/icons/layers.svg"/>
                                <h3>Add text, pics, GIFs, videos</h3>
                        </div>

                        <div className="col-12 col-sm-4 col-lg-3 m-auto pt-4 pt-sm-0">
                            <img alt="image" className="fdb-icon" src="images/icons/monitor.svg"/>
                                <h3>Desktop & mobile friendly</h3>
                        </div>

                        <div className="col-12 col-sm-4 col-lg-3 m-auto pt-4 pt-sm-0">
                            <img alt="image" className="fdb-icon" src="images/icons/gift.svg"/>
                                <h3>Easily invite others with a link</h3>
                        </div>
                    </div>
                </div>

                <div className="row text-center mt-5">
                    <div className="col">
                        <h5>Every Cheershare offers:</h5>
                    </div>
                </div>
                <div className="row text-center justify-content-sm-center no-gutters pt-0 pt-md-3">
                    <div className="col"/>
                    <div className="col-12 col-sm-8 col-md-3 m-auto">
                        <p>· Email and Facebook integration</p>
                    </div>

                    <div className="col-12 col-sm-8 col-md-3 m-auto pt-1 pt-md-0">
                        <p>· Accessible forever</p>
                    </div>

                    <div className="col-12 col-sm-8 col-md-3 m-auto pt-1 pt-md-0">
                        <p>· Deliver online or print as poster</p>
                    </div>
                    <div className="col"/>
                </div>

                <div className="row text-center justify-content-md-center pt-0 pt-md-3">
                    <div className="col"/>
                    <div className="col-12 col-sm-8 col-md-3 m-auto">
                        <p>· Customize background and fonts</p>
                    </div>

                    <div className="col-12 col-sm-8 col-md-3 m-auto pt-1 pt-md-0">
                        <p>· Emoji friendly</p>
                    </div>

                    <div className="col-12 col-sm-8 col-md-3 m-auto pt-1 pt-md-0">
                        <p>· No ads / no selling your data</p>
                    </div>
                    <div className="col"/>
                </div>
            </section>

            <footer className="mb-4 footer-small">
                <div className="container">
                    <div className="row align-items-center text-center">
                        <div className="col-12 col-lg-4 text-lg-left">
                            © 2018-2020 CheerShare
                        </div>

                        <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                            <img alt="company logo" src="/favicon-32x32.png" height="40" />
                        </div>

                        <div className="col-12 col-lg-4 text-lg-right mt-4 mt-lg-0">
                            <ul className="nav justify-content-lg-end justify-content-center">
                                <li className="nav-item">
                                    <Link href="/privacy"><a className="nav-link">Privacy</a></Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link">Terms</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link">About</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    </>);
}
