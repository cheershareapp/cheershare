<p align="center" >
  <a href="https://cheershare.app">
    <img alt="CheerShare App" src="https://cheershare.app/Logo.png"/>
  </a>
  <p>
    💝 CheerShare Group Cards - A complete group card system for work and family life!
  </p>
</p>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcheershareapp%2Fcheershare&env=MONGODB_URI,NEXTAUTH_URL&envDescription=API%20Keys%20needed%20for%20deployment&envLink=https%3A%2F%2Fcheershare.app%2Fdocs%2Fenv-vars&project-name=cheershare&repository-name=cheershare&redirect-url=https%3A%2F%2Fcheershare.app%2Fdocs%2Fvercel-deployed) [![build](https://circleci.com/gh/FaridSafi/react-native-gifted-chat.svg?style=shield)](https://circleci.com/gh/FaridSafi/react-native-gifted-chat) [![](https://img.shields.io/badge/license-MIT-blue.svg) ](https://github.com/cheershareapp/cheershare/blob/master/LICENSE "License")[![](https://vercelbadge.vercel.app/api/sughodke/cheershare)](#)

#### What is it?
CheerShare is an open-source, collaborative platform designed to bring joy and appreciation to people's lives through digital group cards. Perfect for celebrating special occasions, expressing gratitude, or simply staying connected, CheerShare enables users to create personalized, multimedia-rich cards that can include messages, photos, videos, and GIFs. By fostering a space for collective contributions, it enhances the sense of community and connection, especially important in remote or distributed environments.

[See it Live](https://cheershare.app/cheer/5fd1a8b788449c70ecccda24)

## Sponsor
[Buy me a coffee](https://www.buymeacoffee.com/cheershare)

As an open-source project, CheerShare is free to use and relies on the support and contributions of its community. Donations are welcomed to help sustain and improve the platform, ensuring it remains a vibrant and accessible tool for personal and professional expressions of kindness and celebration. Join us in spreading cheer and appreciation, one shared card at a time.

## Roll Your Own Instance

CheerShare is a delightful open-source project that allows you to create and share digital group cards. Here's a guide to help you set up your own instance of CheerShare. We'll be using Vercel for deployment and MongoDB for data storage, with optional integrations for enhanced functionality.

### Instructions to Run on Vercel

1. **Fork the Repository**: Start by forking the CheerShare repository on GitHub to your own account.

2. **Set Up Vercel**: If you don’t have a Vercel account, create one at [Vercel](https://vercel.com). Then, connect your GitHub account to Vercel.

3. **Deploy the Forked Repository**: In Vercel, create a new project and select the forked CheerShare repository. Vercel will automatically detect the build settings. Review and adjust if necessary, then deploy.

4. **Environment Variables**: Set the necessary environment variables in Vercel for your project. This will include database URLs and API keys for any integrations you choose to use.

### Setup Mongo

1. **Create a MongoDB Account**: Sign up for a MongoDB account at [MongoDB](https://www.mongodb.com).

2. **Create a Cluster**: Follow MongoDB’s documentation to create a new cluster.

3. **Database Connection**: Obtain the connection string for your MongoDB cluster. This will be used as an environment variable in your Vercel project settings.

### Setup SendPulse (Optional)

1. **Register on SendPulse**: Create an account on [SendPulse](https://sendpulse.com).

2. **Obtain API Credentials**: In your SendPulse dashboard, navigate to 'Settings' and then 'API' to generate your API ID and Secret.

3. **Configure Environment Variables**: Add the SendPulse API ID and Secret as environment variables in your Vercel project settings.

### Setup Giphy (Optional)

1. **Create a Giphy Developer Account**: Register at [Giphy Developers](https://developers.giphy.com).

2. **Create an App & Obtain API Key**: Follow Giphy’s documentation to create a new app and get your API key.

3. **Set the API Key in Vercel**: Add the Giphy API key to your Vercel project’s environment variables.

### Setup Unsplash (Optional)

1. **Sign Up for Unsplash Developer Account**: Visit [Unsplash Developers](https://unsplash.com/developers) and sign up.

2. **Create an Application & Get API Key**: Follow Unsplash’s guide to create an application and retrieve the Access Key.

3. **Add API Key to Vercel**: Input the Unsplash Access Key into your project’s environment variables on Vercel.

### Facebook and Google Authentication (Optional)

1. **Set Up Facebook App**: Go to the [Facebook for Developers](https://developers.facebook.com) portal and create a new app. Get the App ID and App Secret.

2. **Set Up Google Project**: Visit the [Google Developer Console](https://console.developers.google.com), create a new project, and enable the Google+ API. Obtain the Client ID and Client Secret.

3. **Update Environment Variables**: Add the Facebook and Google credentials to your Vercel project’s environment variables.

### Final Steps

Once you have completed these steps and set up your environment variables, redeploy your project on Vercel. Your CheerShare instance should now be up and running, ready for creating and sharing heartfelt digital cards!

Remember, contributions to the project are always welcome, and your feedback helps make CheerShare better for everyone. Happy sharing!


# Roadmap

- [ ] Compute and store aspect ratio hint from unsplash/giphy
- [ ] Logo background #209CEE https://fonts.google.com/specimen/Leckerli+One?query=leck
- [ ] Figure out which font we want to use, https://fonts.google.com/specimen/Vollkorn
- [ ] P95 Add spinner to board viewer
- [x] Sidebar for Editor screen
- [x] APIs to save and load cheerboards
- [x] Bootstrap + Commerce-like theme
- [x] Implement page protection with next-auth
- [x] Configure google and facebook oauth tokens
- [x] Configure unsplash and giphy oauth tokens
- [x] Use `<Link>` instead of `<a>`
- [x] Use `<Image>` instead of `<img>`
- [x] Use session and authentication to filter access
- [x] integrate a special splash page
- [x] Figure out email server
- [x] Sign in modal, when the user creates a board without authentication https://next-auth.js.org/configuration/pages
- [x] on logout navigate to homepage
- [x] secure edit and delete of pins, right now anyone can update anyones. MVP, check that you can edit that board.
- [x] Rename tiers lookup table
- [x] Column breaks for editor page
- [x] Prettier board summary layout


## Local Development

First, run the development server:

```bash
brew services start mongodb-community
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data Structures

User schema is defined by NextAuth
User has a 1 to many relationship with Boards

Boards schema should have title, recipient, pinCount, background, deliveryStatus, font, lockedStatus, coverImage
Boards has a 1 to many relationship with Pins

Pins schema should have mediaUrl, mediaRatioHint, sortOrder, message, owner, likeCount

User also has a 1 to 1 relationship with Profile
Profile should contain personal settings (timezone, credit card, email preference, etc)

## Additional resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Buy me a coffee](https://www.buymeacoffee.com/cheershare)
