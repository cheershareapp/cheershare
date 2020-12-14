import React from "react";
import Head from 'next/head'
import Link from "next/link";
import {Figure} from "react-bootstrap";
import Header from "components/header";

export default function Home() {
    return (<>
        <Head>
            <title>Welcome to Cheershare</title>
        </Head>
        <Header/>
        <main className="">
            <section className="fdb-block fdb-viewport" style={ {backgroundImage: "url(/images/HeroBackground.svg)"}}>
                <div className="container align-items-end justify-content-center d-flex">
                    <div className="row align-items-top text-left">
                        <div className="col-12 col-md-6 col-lg-5">
                            <h1 className="mb-3 pt-5">The Perfect Group Card for Special Occasions</h1>
                            <span className="lead pt-5">Celebrate someone with an online group card filled with
                                messages, GIFs, photos, & videos!</span>
                            <p className="mt-5">
                                <Link href="/cheer/"><a className="btn btn-primary btn-lg">Create Cheerboard</a></Link>
                            </p>

                        </div>

                        <div className="col-12 col-sm-4 col-md-6 col-lg-4">
                            <img alt="image" className="rounded" src="/images/HeroOrig.jpg"/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="fdb-block">
                <div className="container bg-light">
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
                        <div className="col-12 col-sm-6 col-lg-3 pt-4 pt-sm-0">
                            <img alt="image" width="60%" src="/images/Add.svg" />

                                <h3><strong>Add Your Content</strong></h3>

                                <p>Separated they live in Bookmarksgrove right at the coast</p>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3 pt-4 pt-lg-0">
                            <img alt="image" width="60%" src="/images/Invite.svg" />

                                <h3><strong>Invite your friends</strong></h3>

                                <p>A small river named Duden flows by their place and supplies it</p>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3 pt-4 pt-lg-0">
                            <img alt="image" width="60%" src="/images/Deliver.svg" />

                                <h3><strong>Deliver Appreciation</strong></h3>

                                <p>Far far away, behind the word mountains, far from the countries</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col">
                            <p className="mt-4 text-center"><Link href="/cheer/"><a className="btn btn-success my-4">Create Cheerboard</a></Link></p>
                        </div>
                    </div>
                </div>
            </section>


            <div className="fdb-block text-center py-1">
                <h1 className="display-8 font-weight-normal">Group Cards for Birthdays, Holidays, & Other Occasions</h1>
                <p className="lead">Get inspired with these sample Cheers:</p>

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

            <section className="fdb-block">
                <div className="container">
                    <div className="row text-center">
                        <div className="col">
                            <h1>Pricing</h1>
                            <p className="lead">Choose the option that's right for you. From single group cards to ongoing plans,
                                for personal use or for the office. Every Cheershare offers:</p>
                        </div>
                    </div>

                    <div className="row text-center justify-content-sm-center no-gutters pt-0 pt-md-3">
                        <div className="col-12 col-sm-8 col-md-3 m-auto">
                            <p>· Add text, pics, GIFs, videos</p>
                        </div>

                        <div className="col-12 col-sm-8 col-md-3 m-auto pt-1 pt-md-0">
                            <p>· Accessible forever</p>
                        </div>

                        <div className="col-12 col-sm-8 col-md-3 m-auto pt-1 pt-md-0">
                            <p>· Deliver online or print as poster</p>
                        </div>
                    </div>

                    <div className="row text-center justify-content-md-center pt-0 pt-md-3">
                        <div className="col-12 col-sm-8 col-md-3 m-auto">
                            <p>· Easily invite others with a link</p>
                        </div>

                        <div className="col-12 col-sm-8 col-md-3 m-auto pt-1 pt-md-0">
                            <p>· Desktop & mobile friendly</p>
                        </div>

                        <div className="col-12 col-sm-8 col-md-3 m-auto pt-1 pt-md-0">
                            <p>· No ads / no selling your data</p>
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
                                <p className="h3 pb-2">$5.99 <small className="text-muted">/ board</small></p>
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
                                <p className="h3 pb-2">$19.99 <small className="text-muted">/ board</small></p>
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

            <footer className="mb-4 footer-small">
                <div className="container">
                    <div className="row align-items-center text-center">
                        <div className="col-12 col-lg-4 text-lg-left">
                            © 2018-2020 CheerShare
                        </div>

                        <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                            <img alt="image" src="/favicon-32x32.png" height="40" />
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
