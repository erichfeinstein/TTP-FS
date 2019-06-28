# TTP-FS Assessment

#### Eric Feinstein

This is my application that I built for the fullstack assessment as part of the NYC TTP application process for Spotify's 2019 Fellowship.

## Concept

This application allows users to invest in stocks and monitor their portfolio's performance.

- When a user makes an account, they are given \$5000 dollars to begin investing with.
- When buying a stock, you are able to see the name and realtime price per share.
- On top of viewing a portfolio, the user may view their own transaction history.

## Tech Stack

This application is built with the NERD stack:

- Node.js
- Express.js
- React.js
- Databases using SQL

Writing my entire stack in JavaScript allowed me to quickly move from writing my React app to adjusting my server or database schema without much interruption.

## Database Schema

#### User

Users have an email, encrypted password, and balance. Emails are unique, so no two users can have an account using the same email address.

#### Stock

In my database, a 'stock' refers to a stock symbol, and a specific user's number of shares owned in that stock.

#### Transaction

Similarly, each 'transaction' refers to a stock symbol and a specific user, but in this case the number of shares in each row refers to the number of shares traded at a single time. This was done to accurately display the user their own transaction history (i.e. if they buy shares multiple times of a single stock).

### Note

Separating Stock and Transaction was done both to simplify the difference between a user's portfolio and a user's transaction history. Additionally, this schema allows for a smooth addition of a **selling** shares feature.

## Considerations

Since this application involves exchanging money, I wanted to be sure that it was secure and could not be exploited. For this reason, I took the following action:

- Upon purchasing, price per share is determined by the server making its own request to IEX. This was done to prevent a user from maliciously attempting to buy many shares at an low or inaccurate price.
- There is a lot of form validation occuring across the React app. Attempting to make invalid requests, like buying shares of a stock that doesn't exist, will cause an error, and a helpful message will be displayed to the user.
- User security and sessions: On top of user's passwords being encrypted, I wanted to make sure that sensitive user info was secure. I used the **passport.js** library to create user sessions, and used the active user session's info to handle any requests for transaction history, retrieiving a portfolio, or buying shares. Another added benefit of **passport.js** is that it was easy to keep a user signed in even if they leave the page and return later!

## Challenges

- Keeping things RESTful. Due to the inclusion of both the Transaction table and Stock table, I wondered how to handle my API route organization. I decided to that a POST request to **/api/transactions** would create a row in both the Stock table and Transaction table, instead of **post**ing to two different endpoints.
