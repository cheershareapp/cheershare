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
        <main className="">
            <section className="fdb-block fdb-viewport">
                <img src="/images/HeroBackground2.svg" alt="Welcome to Cheershare" style={{position: "absolute", top: 0}}/>
                <div className="container align-items-end justify-content-center d-flex">
                    <div className="row align-items-top text-left">
                        <div className="col-12 col-md-6 col-lg-5">
                            <h1 className="mb-3 pt-5">Group card for
                                <Typical
                                    steps={[
                                        'birthdays.', 1000,
                                        'thank you.', 1000,
                                        'retirement.', 1000,
                                        'promotion.', 1000,
                                        'farewell.', 1000,
                                        'work anniversary.', 1000,
                                        'special occasions.', 1000,
                                    ]}
                                    loop={Infinity}
                                />
                                </h1>
                            <span className="lead pt-5 font-weight-normal">Celebrate with an online group card filled with
                                messages, GIFs, photos, & videos!</span>
                            <p className="mt-5">
                                <Link href="/cheer/"><a className="btn btn-primary btn-lg">Create Cheerboard</a></Link>
                            </p>
                        </div>
                        <div className="col-12 col-md text-right">
                            <img alt="Couple unpacking gifts"
                                 className="rounded img-fluid h-100"
                                 src="/images/HeroOrig.jpg"
                                 style={{objectFit: "cover"}}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="fdb-block bg-dark py-5">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col">
                            <img alt="image" height="40" className="ml-3 mr-3 mb-2 mt-2"
                                 src="images/customers/adobe.svg"/>
                            <img alt="image" height="40" className="ml-3 mr-3 mb-2 mt-2"
                                 src="images/customers/amazon.svg"/>
                            <img alt="image" height="40" className="ml-3 mr-3 mb-2 mt-2"
                                 src="images/customers/ebay.svg"/>
                            {/*
                            <img alt="image" height="40" className="ml-3 mr-3 mb-2 mt-2"
                                 src="images/customers/samsung.svg"/>
                            <img alt="image" height="40" className="ml-3 mr-3 mb-2 mt-2"
                                 src="images/customers/orange.svg"/>
                                                                  */}
                            <img alt="image" height="40" className="ml-3 mr-3 mb-2 mt-2"
                                 src="images/customers/salesforce.svg"/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="fdb-block">
                <div className="px-5" id="how-it-works">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 text-center py-md-3">
                            <h1 className="display-8 font-weight-normal">How Our Group Cards Work</h1>
                            <p className="lead">Start a digital group card for a colleague, friend, or family member. Share the link with anyone,
                                anywhere so they can post. Deliver when you're ready!</p>
                        </div>
                    </div>

                    <div className="row text-center justify-content-center pt-5">
                        <div className="col-12 col-sm-6 col-lg-3">
                            <img alt="image" width="60%" src="/images/Create.svg" />
                            <h3><strong>Create a Cheershare</strong></h3>

                            <p>Choose a recipient to celebrate with the group greeting card.</p>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 pt-4 pt-sm-0 bg-light">
                            <img alt="image" width="60%" src="/images/Add.svg" />

                            <h3><strong>Add Your Content</strong></h3>

                            <p>Get creative. Attach messages, photos, GIFs or videos to the recipient's board.</p>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3 pt-4 pt-lg-0">
                            <img alt="image" width="60%" src="/images/Invite.svg" />

                            <h3><strong>Invite your friends</strong></h3>

                            <p>Invite others to add their contributions and watch the virtual group card grow.</p>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3 pt-4 pt-lg-0 bg-light">
                            <img alt="image" width="60%" src="/images/Deliver.svg" />

                            <h3><strong>Deliver Appreciation</strong></h3>

                            <p>Deliver it online, print it out as a poster, or play it as a slideshow!</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col">
                            <p className="mt-4 text-center"><Link href="/cheer/"><a className="btn btn-success my-4">Create Cheerboard</a></Link></p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="fdb-block text-center pt-1">
                <h1 className="display-8 font-weight-normal">Group Cards for Birthdays, Holidays, & Other Occasions</h1>
                <p className="lead">Get inspired with these sample Cheers</p>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                    {[['Birthday', 'balloons'], ['Farewell', 'dots'], ['Work Anniversary', 'confetti'],
                        ['Get Well Soon', 'circles'], ['Retirement', 'feathers'], ['Promotion', 'fun']].map(([caption, imageName], i) =>
                        <div className="col" key={i}>
                            <Figure>
                                <img
                                    alt={caption}
                                    src={`images/${imageName}-background.png`}
                                    width={300} height={150}
                                    className="figure-img"
                                    style={{objectFit: 'cover'}}
                                />
                                <Figure.Caption>
                                    {caption}
                                </Figure.Caption>
                            </Figure>
                        </div>)}
                </div>
            </div>
            <section className="fdb-block">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8">
                            <p className="lead">
                                "We've had a office birthday with our entire team with Cheershare and the experience has been phenomenal!
                                Cheershare has made gathering names, passing a card and getting it back non-existant.
                                My day is much simpler while also improving the quality of service. Would use again!"
                            </p>

                            <p className="lead"><strong>Darla Bowman</strong> <em className="ml-4">HR Lead at
                                AlohaMD</em></p>
                        </div>
                        <div className="col-8 col-sm-6 col-md-2 col-lg-3 col-xl-2 mt-4 mt-md-0 ml-auto mr-auto mr-md-0">
                            <img alt="Customer Picture" className="img-fluid rounded-circle" src="images/TestimonialProfile.png" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="fdb-block">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 text-center">
                            <h1>Employee appreciation starts here.</h1>
                            <p className="mt-5">
                                <Link href="/cheer/">
                                    <a className="btn btn-secondary">Start for free</a>
                                </Link>
                            </p>
                        </div>
                    </div>
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

            {/*
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
            */}
        </main>
    </>);
}
