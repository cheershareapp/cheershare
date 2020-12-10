import Head from 'next/head'
import styles from 'styles/Home.module.css'

import {useSession} from 'next-auth/client'
import Footer from "components/footer";
import Header from "components/header";
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
        <main className="px-lg-5">

            <div className="row my-md-3 bg-light">
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 font-weight-normal">The Perfect Group Card for Special Occasions</h1>
                    <p className="lead font-weight-normal">Celebrate someone with an online group card filled with
                        messages, GIFs, photos, & videos!</p>
                    <Link href="/cheer/"><a className="btn btn-outline-secondary">Create Cheerboard</a></Link>
                </div>
                <div className="col-md-7"
                     style={{
                         backgroundImage: 'url(https://net.hr/wp-content/uploads/2017/11/6117861789_80c0a34801_z.jpg?quality=100&strip=all)',
                         backgroundSize: 'cover'}}>
                </div>
            </div>

            {/*
            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 font-weight-normal">The Perfect Group Card for Special Occasions</h1>
                    <p className="lead font-weight-normal">Celebrate someone with an online group card filled with
                        messages, GIFs, photos, & videos!</p>
                    <Link href="/cheer/"><a className="btn btn-outline-secondary">Create Cheerboard</a></Link>
                </div>
                <div className="product-device shadow-sm d-none d-md-block">Want an ongoing plan for your company?</div>
                <div className="product-device product-device-2 shadow-sm d-none d-md-block">Try Kudoboard for Business</div>
            </div>*/}

            <div className="text-center my-4 bg-light p-lg-5 mx-auto my-5">
                <h1 className="display-8 font-weight-normal">How Our Group Cards Work</h1>
                <p className="lead">Start a digital group card for a colleague, friend, or family member. Share the link with anyone,
                    anywhere so they can post. Deliver when you're ready!</p>
                <div className="row">
                    <div className="col-lg-3">
                        <h4><span className="badge badge-light">1</span> Create a Cheershare</h4>
                        <img className="bd-placeholder-img rounded"
                             src={`https://placeimg.com/200/200/tech/sepia/1`} width="100%"/>
                        <p>Choose a recipient to celebrate with the group greeting card.</p>
                    </div>
                    <div className="col-lg-3">
                        <h4><span className="badge badge-light">2</span> Add Your Content</h4>
                        <img className="bd-placeholder-img rounded"
                             src={`https://placeimg.com/200/200/tech/sepia//2`} width="100%"/>
                        <p>Get creative. Attach messages, photos, GIFs or videos to the recipient's board.</p>
                    </div>
                    <div className="col-lg-3">
                        <h4><span className="badge badge-light">3</span> Invite your friends</h4>
                        <img className="bd-placeholder-img rounded"
                             src={`https://placeimg.com/200/200/tech/sepia//3`} width="100%"/>
                        <p>Invite others to add their contributions and watch the virtual group card grow.</p>
                    </div>
                    <div className="col-lg-3">
                        <h4><span className="badge badge-light">4</span> Deliver Appreciation</h4>
                        <img className="bd-placeholder-img rounded"
                             src={`https://placeimg.com/200/200/tech/sepia//4`} width="100%"/>
                        <p>Deliver it online, print it out as a poster, or play it as a slideshow!</p>
                    </div>
                </div>

                <Link href="/cheer/"><a className="btn btn-secondary my-4">Create Cheerboard</a></Link>
            </div>
            <div className="text-center py-5">
                <h1 className="display-8 font-weight-normal">Group Cards for Birthdays, Holidays, & Other Occasions</h1>
                <p className="lead">Get inspired with these sample Cheers:</p>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {['Birthday', 'Farewell', 'Work Anniversary', 'Get Well Soon', 'Retirement', 'Promotion'].map((caption, i) =>
                        <div className="col" key={i}>
                            <Figure>
                                <Figure.Image
                                    alt="171x180"
                                    src={`https://placeimg.com/300/150/${i}`}
                                />
                                <Figure.Caption>
                                    {caption}
                                </Figure.Caption>
                            </Figure>
                        </div>)}
                    <style jsx global>{`
                    .figure-img {
                        -webkit-filter: grayscale(100%);
                    }
                    .figure-img :hover {
                        -webkit-filter: none;
                    }
                    /*
                      // https://stackoverflow.com/a/31144138
                      position: absolute;
                      top: 50%;
                      width: 100%;
                      text-align: center;
                      font-size: 18px;
                    */
                    `}</style>
                </div>
            </div>
            {/*
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
            */}

            <div className='container'>
            <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h1 className="display-4">Pricing</h1>
                <p className="lead">Choose the option that's right for you. From single group cards to ongoing plans,
                    for personal use or for the office. Every Cheershare offers:</p>
                <div className="container my-3">
                    <div className="row">
                        <div className="col">
                            ✅ Add text, pics, GIFs, videos
                        </div>
                        <div className="col">
                            ✅ Easily invite others with a link
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            ✅ Accessible forever
                        </div>
                        <div className="col">
                            ✅ Desktop & mobile friendly
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            ✅ Deliver online or print as poster
                        </div>
                        <div className="col">
                            ✅ No ads / no selling your data
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header text-center">
                            <h4 className="my-0 font-weight-normal">MINI BOARD</h4>
                            <h1 className="card-title pricing-card-title">Free</h1>
                        </div>
                        <div className="card-body">
                            <p>Great for a small group of contributors, 1-to-1 boards, or to test the Cheershare system.</p>
                            <hr/>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>Up to 15 posts</li>
                                <li>Email support</li>
                                <li>Upgrade anytime</li>
                            </ul>
                            <button type="button" className="btn btn-lg btn-block btn-outline-primary">Start for
                                free
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header text-center">
                            <h4 className="my-0 font-weight-normal">Premium Board</h4>
                            <h1 className="card-title pricing-card-title">$5.99<br/><small className="text-muted">/
                                Per Board</small></h1>
                        </div>
                        <div className="card-body">
                            <p>Best for a larger group of contributors on a birthday, work anniversary, or special occasion.</p>
                            <hr/>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>Up to 100 posts</li>
                                <li>Priority email support</li>
                                <li>Upgrade anytime</li>
                            </ul>
                            <button type="button" className="btn btn-lg btn-block btn-outline-primary">Create Cheerboard</button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header text-center">
                            <h4 className="my-0 font-weight-normal">Milestone Board</h4>
                            <h1 className="card-title pricing-card-title">$19.99<br/><small className="text-muted">/
                                Per Board</small></h1>
                        </div>
                        <div className="card-body">
                            <p>Perfect for extra large groups or milestones that you will celebrate in-person.</p>
                            <hr/>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>3000 users included</li>
                                <li>Help center access</li>
                            </ul>
                            <button type="button" className="btn btn-lg btn-block btn-outline-primary">Create Cheerboard</button>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header text-center">
                            <h4 className="my-3 font-weight-normal">Want unlimited boards, multiple creators, & more?</h4>
                            <h6 className="card-title my-5">Check out our Business and Enterprise plans for all your organization's needs.</h6>

                            <button type="button" className="btn btn-lg btn-block btn-primary">See Business Plan</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <footer className="pt-4 my-md-5 pt-md-5 border-top">
                <div className="row">
                    <div className="col-12 col-md">
                        <img className="mb-2" src="favicon-32x32.png" alt=""/>
                            <small className="d-block mb-3 text-muted">&copy; 2017-2020</small>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Features</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="link-secondary" href="#">Cool stuff</a></li>
                            <li><a className="link-secondary" href="#">Random feature</a></li>
                            <li><a className="link-secondary" href="#">Team feature</a></li>
                            <li><a className="link-secondary" href="#">Stuff for developers</a></li>
                            <li><a className="link-secondary" href="#">Another one</a></li>
                            <li><a className="link-secondary" href="#">Last time</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Resources</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="link-secondary" href="#">Resource</a></li>
                            <li><a className="link-secondary" href="#">Resource name</a></li>
                            <li><a className="link-secondary" href="#">Another resource</a></li>
                            <li><a className="link-secondary" href="#">Final resource</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>About</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="link-secondary" href="#">Team</a></li>
                            <li><a className="link-secondary" href="#">Locations</a></li>
                            <li><a className="link-secondary" href="#">Privacy</a></li>
                            <li><a className="link-secondary" href="#">Terms</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </main>
    </>);
}
