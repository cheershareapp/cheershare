This is a [Next.js](https://nextjs.org/) project to share cheer.

## Todo

- [x] Sidebar for Editor screen
- [x] APIs to save and load cheerboards
- [x] Bootstrap + Commerce-like theme
- [x] Implement page protection with next-auth
- [ ] Configure google and facebook oauth tokens
- [x] Configure unsplash and giphy oauth tokens
- [x] Use `<Link>` instead of `<a>`
- [x] Use `<Image>` instead of `<img>`
- [x] Use session and authentication to filter access
- [ ] Company logo background #209CEE https://fonts.google.com/specimen/Leckerli+One?query=leck
- [ ] Figure out email server

## Data Structures

User schema is defined by NextAuth
User has a 1 to many relationship with Boards

Boards schema should have title, recipient, pinCount, background, deliveryStatus, font, lockedStatus, coverImage
Boards has a 1 to many relationship with Pins

Pins schema should have mediaUrl, mediaRatioHint, sortOrder, message, owner, likeCount

User also has a 1 to 1 relationship with Profile
Profile should contain personal settings (timezone, credit card, email preference, etc)


## Muuri serialization

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Pin 1    | Pin 2    | Pin 3    |
|          |          |          |
```
serialized = [
  [Pin 1],
  [Pin 2],
  [Pin 3]
]

serialized.map((col, columnIndex) => {
  col.map((el, rowIndex) => {
    {
      rowIndex,
      columnIndex,
      ...el.props
    }
  })
})
.flat()
```


| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Pin 1    | Pin 3    |          |
|          | Pin 2    |          |
```
[
  [Pin 1],
  [Pin 2, Pin 3],
  []
]

Change is on Pin 3, change Column to 2 and Row to 2
```
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

