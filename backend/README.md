# Homebanking API

Homebanking API allows for user registration, check movements, do mock deposits and do mock withdraws, accounts transfers and do mock
service payments.

## Technologies

- Typescript
- [Hapi.dev](https://hapi.dev/)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [Hapi JWT Auth](https://www.npmjs.com/package/hapi-auth-jwt2)
- [LowDB](https://www.npmjs.com/package/lowdb)

## Setup

1. `npm install`


2. Rename `.env-example` file to `.env` and replace the `JWT_SECRET_KEY` variable value with your own.


3. Create folder `database` in the project root (not repository root).


4. `npm run dev:tsc` for initial compile


5. Ready to be run locally at http://localhost:4000

## Scripts

`npm run dev` to compile and run the API in dev mode with hot reload on changes.

`npm run start` to run the current compile in production mode.

`npm run test` to run `api.test.ts` test file.

## Database

[Model used for the database](MODEL.md)

API data is saved using the file system and are human-readable `JSON` files.

Files will be located in a folder named `database` at the root of the back-end project.

Depending on the run environment a new file is used:

- `devDB.json` if in dev mode
- `testingDB.json` if in testing mode
- `prodDB.json` if in production mode

There's no model migration system.

## Endpoints

Request bodies must be in JSON format, response bodies are also in JSON format.

Endpoints that do not require authentication are marked with a `*`. The remaining endpoints check the
header `Authorization` for a valid JWT token that contains the user identifier. This token
is obtained through login.

| Method   | URL                  | Description                      |
|----------|----------------------|----------------------------------|
| `POST`*  | subscribe            | Registers a new user account     |
| `POST`*  | login                | User login                       |
| `GET`    | funds                | Gets user wallet                 |
| `PUT`    | funds                | Add funds to user wallet         |
| `DELETE` | funds?funds={amount} | Remove funds from user wallet    |
| `GET`    | movements            | Gets all user movements          |
| `GET`    | internalMovements    | Gets all user internal movements |
| `GET`    | transfers            | Gets all user transfers          |
| `GET`    | payments             | Gets all user payments           |
| `POST`   | transfers            | Processes new transfer by user   |
| `POST`   | payments             | Processes new payment by user    |

[More endpoint details here](ENDPOINTS.md)

## Development mode

API extras in development mode:

- New endpoint `DELETE: DELETE` to reset `devDB.json` database file

## Postman

Postman request collection can be found in this [folder](postman/).
