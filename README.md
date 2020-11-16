This is a [Next.js](https://nextjs.org/) project to share cheer.

## Todo

- [x] Sidebar for Editor screen
- [ ] APIs to save and load cheerboards
- [x] Bootstrap + Commerce-like theme
- [ ] Implement page protection with next-auth
- [ ] Configure google and facebook oauth tokens
- [ ] Use `<Link>` instead of `<a>`
- [ ] Use `<Image>` instead of `<img>`


## Data Structures

User schema is defined by NextAuth
User has a 1 to many relationship with Boards

Boards schema should have title, recipient, pinCount, background, deliveryStatus, font, lockedStatus, coverImage
Boards has a 1 to many relationship with Pins

Pins schema should have mediaUrl, mediaRatioHint, sortOrder, message, owner, likeCount

User also has a 1 to 1 relationship with Profile
Profile should contain personal settings (timezone, credit card, email preference, etc)


## Getting Started

First, run the development server:

```bash
brew services start mongodb-community
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

