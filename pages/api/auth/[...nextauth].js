import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
    // Configure one or more authentication providers
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Providers.Email({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
        }),
    ],

    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)