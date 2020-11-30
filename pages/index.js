import Head from 'next/head'
import styles from '../styles/Home.module.css'

import {useSession} from 'next-auth/client'
import Footer from "../components/footer";
import Header from "../components/header";
import Link from "next/link";
import React from "react";
import {Figure} from "react-bootstrap";

export default function Home() {
    const [session, loading] = useSession();
    // if (error) return <div>failed to load</div>;
    // if (!data) return <div>loading...</div>;
    return (<>
        <Head>
            <title>Welcome to Cheershare</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Header/>
        <main>
            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 font-weight-normal">The Perfect Group Card for Special Occasions</h1>
                    <p className="lead font-weight-normal">Celebrate someone with an online group card filled with messages, GIFs, photos, & videos!</p>
                    <a className="btn btn-outline-secondary" href="#">Create Cheerboard</a>
                </div>
                <div className="product-device shadow-sm d-none d-md-block"></div>
                <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
            </div>

            <div className="container marketing">
                <div className="row">
                    <div className="col-lg-3">
                        <svg className="bd-placeholder-img rounded-circle" width="140" height="140"
                             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140"
                             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#777"/>
                            <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                        </svg>

                        <h4>Create a Kudoboard</h4>
                        <p>Choose a recipient to celebrate with the group greeting card.</p>
                    </div>
                    <div className="col-lg-3">
                        <svg className="bd-placeholder-img rounded-circle" width="140" height="140"
                             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140"
                             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#777"/>
                            <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                        </svg>

                        <h4>Invite your friends</h4>
                        <p>Get creative. Attach messages, photos, GIFs or videos to the recipient's board.</p>
                    </div>
                    <div className="col-lg-3">
                        <svg className="bd-placeholder-img rounded-circle" width="140" height="140"
                             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140"
                             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#777"/>
                            <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                        </svg>

                        <h4>Deliver Appreciation</h4>
                        <p>Invite others to add their contributions and watch the virtual group card grow.</p>
                    </div>
                </div>

                <div className="album py-5 bg-light">
                    <div className="container">

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {['Birthday', 'Farewell', 'Work Anniversary', 'Get Well Soon', 'Retirement', 'Promotion'].map((caption, i) => <div className="col text-center">
                                <h5 className="display-4 font-weight-normal">{caption}</h5>
                                <Figure>
                                    <Figure.Image
                                        alt="171x180"
                                        src={`https://placeimg.com/300/300/${i}/grayscale`}
                                    />
                                    <Figure.Caption>
                                        {caption}
                                    </Figure.Caption>
                                </Figure>
                            </div>)}
                        </div>
                    </div>
                </div>

                <hr className="featurette-divider"/>

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It’ll blow your mind.</span>
                        </h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula
                            porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl
                            consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div className="col-md-5">
                        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                             width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img"
                             aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice"
                             focusable="false"><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#eee"/>
                            <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
                        </svg>

                    </div>
                </div>

                <hr className="featurette-divider"/>

                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading">Oh yeah, it’s that good. <span
                            className="text-muted">See for yourself.</span></h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
                            ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque
                            nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <svg
                            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                            width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img"
                            aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice"
                            focusable="false"><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#eee"/>
                            <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
                        </svg>

                    </div>
                </div>

                <hr className="featurette-divider"/>

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">And lastly, this one. <span
                            className="text-muted">Checkmate.</span></h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum
                            id ligula porta felis euismod semper. Praesent commodo cursus magna, vel
                            scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div className="col-md-5">
                        <svg
                            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                            width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img"
                            aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice"
                            focusable="false"><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#eee"/>
                            <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
                        </svg>

                    </div>
                </div>

                <hr className="featurette-divider"/>

                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Pricing</h1>
                    <p className="lead">Quickly build an effective pricing table for your potential customers with this
                        Bootstrap example. It’s built with default Bootstrap components and utilities with little
                        customization.</p>
                </div>

                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    <div className="col">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Free</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$0 <small className="text-muted">/
                                    mo</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>10 users included</li>
                                    <li>2 GB of storage</li>
                                    <li>Email support</li>
                                    <li>Help center access</li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-outline-primary">Sign up for
                                    free
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Pro</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$15 <small className="text-muted">/
                                    mo</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>20 users included</li>
                                    <li>10 GB of storage</li>
                                    <li>Priority email support</li>
                                    <li>Help center access</li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-primary">Get started</button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Enterprise</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$29 <small className="text-muted">/
                                    mo</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>30 users included</li>
                                    <li>15 GB of storage</li>
                                    <li>Phone and email support</li>
                                    <li>Help center access</li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-primary">Contact us</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <Footer/>
    </>);
}
