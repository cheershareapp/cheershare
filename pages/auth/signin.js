import React from 'react'
import { providers, signIn, csrfToken } from 'next-auth/client'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {useRouter} from "next/router";

export default function SignIn({ providers, csrfToken, callbackUrl }) {
    const router = useRouter();
    const { email, error } = router.query;

    let errorMessage;
    if (error) {
        switch (error) {
            case 'Signin':
            case 'OAuthSignin':
            case 'OAuthCallback':
            case 'OAuthCreateAccount':
            case 'EmailCreateAccount':
            case 'Callback':
                errorMessage = <p>Try signing with a different account.</p>;
                break;
            case 'OAuthAccountNotLinked':
                errorMessage = <p>We have your account with a different provider, please sign in with the same account you used originally.</p>;
                break;
            case 'EmailSignin':
                errorMessage = <p>Check your email address.</p>;
                break;
            default:
                errorMessage = <p>Unable to sign in.</p>;
                break
        }
    }

    return (
        <section className="m-auto p-5 w-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-8 col-xl-6">
                        <div className="row">
                            <div className="col text-center">
                                <h1>Welcome to Cheershare</h1>
                                <p className="lead">Complete the signup to add Cheer! { false && "to Chirag\'s Cheershare."}</p>
                            </div>
                        </div>

                        {errorMessage &&
                        <Alert variant="danger">
                            {errorMessage}
                        </Alert>}

                        {Object.values(providers).slice(0,2).map(provider => (
                            <div className="row align-items-center" key={provider.name}><div className="col mt-4">
                                <form action={provider.signinUrl} method='POST'>
                                    <input type='hidden' name='csrfToken' value={csrfToken} />
                                    {callbackUrl && <input type='hidden' name='callbackUrl' value={callbackUrl} />}
                                    <Button type="submit" className="w-100">Sign in with {provider.name}</Button>
                                </form>
                            </div></div>
                        ))}

                        <hr />
                        <Form method="post" action="/api/auth/signin/email">
                            <Form.Control name='csrfToken' type='hidden' defaultValue={csrfToken}/>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="example@email.com" name='email' value={email}/>
                                <Form.Text className="text-muted">
                                    You'll get a magic link in your inbox. We never share your email with anyone.
                                </Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Sign in with Email
                            </Button>
                        </Form>

                        <Button variant="link" className="w-100 py-3" onClick={() => router.back()}>
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            providers: await providers(context),
            csrfToken: await csrfToken(context)
        }
    }
}