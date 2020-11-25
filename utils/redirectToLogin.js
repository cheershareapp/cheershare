import Router from "next/router";

export const redirectToLogin = (server) => {
    // add the redirected query param for debugging
    // http://localhost:3000/api/auth/signin?callbackUrl=%2Fcheer

    const login = "/api/auth/signin";
    if (server) {
        // @see https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
        // server rendered pages need to do a server redirect
        server.writeHead(302, {
            Location: login,
        });
        server.end();
    } else {
        // only client side pages have access to next/router
        Router.push(login);
    }
};