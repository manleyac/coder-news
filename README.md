# Coder News


## About
Coder News is a fullstack blogging application complete with user authentication, markdown based blog posts, voting, and commenting. 

## Deployment
[See it live here]()

## Demo
TBA

## Technology Used
Client:
- [Create-React-App](https://create-react-app.dev/docs/getting-started/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Grommet](https://v2.grommet.io/)

Server:
- [GraphQL-Yoga](https://github.com/prisma-labs/graphql-yoga)
- [Prisma](https://www.prisma.io/)
- [PostgresQL](https://www.postgresql.org/)

Deployment: 
- [Heroku](https://www.heroku.com/)

## Deploy Locally
Clone repository and install node modules.
```bash
git clone https://github.com/manleyac/coder-news.git
cd coder-news
npm install
cd client
npm install
```
Create a .env file in the root directory for the JSON Web Token Secret.
```js
APP_SECRET="Put Secret Here!"
```
Edit the prisma/.env file to connect to local postgresql database.
Example below for a database named tech-blog at localhost:5432 with user postgres and no password.
```
DATABASE_URL="postgresql://postgres:@localhost:5432/tech-blog?schema=public"
```
Generate the database tables and prisma client with the following commands.
```
npx prisma migrate save --name init --experimental
npx prisma migrate up --experimental
npx prisma generate
```
Run the application in developer mode.
```
npm run dev
```
## Testing
TBA

## License
[MIT](https://choosealicense.com/licenses/mit/)