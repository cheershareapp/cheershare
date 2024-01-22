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

[Playground](https://cheershare.app/cheer/5fd1a8b788449c70ecccda24)

## Sponsor
[Buy me a coffee](https://www.buymeacoffee.com/cheershare)

As an open-source project, CheerShare is free to use and relies on the support and contributions of its community. Donations are welcomed to help sustain and improve the platform, ensuring it remains a vibrant and accessible tool for personal and professional expressions of kindness and celebration. Join us in spreading cheer and appreciation, one shared card at a time.

# Roll your own instance

Host your own instance on Vercel [Next.js](https://nextjs.org/)

## Setup Mongo

## Setup SendPulse (Optional)
## Setup Giphy (Optional)
## Setup Unsplash (Optional)
## Facebook and Google Authentication (Optional)

## Roadmap

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

## Data Structures

User schema is defined by NextAuth
User has a 1 to many relationship with Boards

Boards schema should have title, recipient, pinCount, background, deliveryStatus, font, lockedStatus, coverImage
Boards has a 1 to many relationship with Pins

Pins schema should have mediaUrl, mediaRatioHint, sortOrder, message, owner, likeCount

User also has a 1 to 1 relationship with Profile
Profile should contain personal settings (timezone, credit card, email preference, etc)


## Local Development

First, run the development server:

```bash
brew services start mongodb-community
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Additional resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

