import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        Providers.Email({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
        }),

        /*
        // Testing Only
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                // Waiting on https://github.com/nextauthjs/next-auth/pull/784
                const user = { id: 1, name: 'J Smith', email: 'yo.jsmith@example.com' };
                if (user) {
                    // Any user object returned here will be saved in the JSON Web Token
                    return Promise.resolve(user)
                } else {
                    return Promise.resolve(null)
                }
            }
        })
         */
    ],

    // A database is optional, but required to persist accounts in a database
    database: process.env.MONGODB_URI,

    // Testing Only
    // session: { jwt: true },
    callbacks: {
        /**
         * @param  {object} session      Session object
         * @param  {object} user         User object    (if using database sessions)
         *                               JSON Web Token (if not using database sessions)
         * @return {object}              Session that will be returned to the client
         */
        session: async (session, user, sessionToken) => {
            // Add id property to session
            session.user.id = user.id;
            return Promise.resolve(session)
        }
    }
};

export default (req, res) => NextAuth(req, res, options)