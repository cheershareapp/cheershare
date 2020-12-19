import {signIn} from "next-auth/client";

/*
 * Send the user back to a callbackUrl
 *
 * Example Url:
 * http://.../api/auth/signin?callbackUrl=%2Fcheer
 *
 */

export const redirectToLogin = (callbackUrl, server) => {
    const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'https://getcheershare.com';
    callbackUrl = NEXTAUTH_URL+callbackUrl;

    if (server) {
        // @see https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
        // server rendered pages need to do a server redirect
        server.writeHead(302, {
            Location: `/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
        });
        server.end();

        return { props: {} };
    } else {
        // only client side pages have access to next/router
        signIn(null, { callbackUrl });
    }
};
