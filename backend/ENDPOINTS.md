# Endpoints

### POST*: subscribe

Create a new user account, does not validate password strength or email validity.

Request:

| Property   | Optional           | Description                |
|------------|--------------------|----------------------------|
| `email`    |                    | User email                 |
| `password` |                    | Raw password used to login |
| `name`     | <center>X</center> | User name                  |

Response:

| Property   | Optional | Description        |
|------------|----------|--------------------|
| `feedback` |          | Operation feedback |

### POST*: login

Allow users to login and provides JWT token for auth.

Request:

| Property   | Optional | Description  |
|------------|----------|--------------|
| `email`    |          | User email   |
| `password` |          | Raw password |

Response:

| Property   | Optional           | Description              |
|------------|--------------------|--------------------------|
| `feedback` |                    | Operation feedback       |
| `user`     | <center>X</center> | User data, if successful |

- Contains header `Authorization` with JWT token used for auth

### GET: funds

Get user's wallet.

Request: none

Response:

| Property   | Optional           | Description                |
|------------|--------------------|----------------------------|
| `feedback` |                    | Operation feedback         |
| `wallet`   | <center>X</center> | User wallet, if successful |

### PUT: funds

Add funds to user's wallet.

Request:

| Property | Optional | Description  |
|----------|----------|--------------|
| `funds`  |          | Funds amount |

Response:

| Property   | Optional           | Description                          |
|------------|--------------------|--------------------------------------|
| `feedback` |                    | Operation feedback                   |
| `funds`    | <center>X</center> | New user wallet funds, if successful |

### DELETE: funds?funds={amount}

Remove funds from user's wallet.

Query:

| Property | Optional | Description           |
|----------|----------|-----------------------|
| `funds`  |          | Remove `amount` funds |

Response:

| Property   | Optional           | Description                          |
|------------|--------------------|--------------------------------------|
| `feedback` |                    | Operation feedback                   |
| `funds`    | <center>X</center> | New user wallet funds, if successful |

### GET: movements

Get user's movements, includes internal movements, payments and transfers.

Response:

| Property       | Optional           | Description                                     |
|----------------|--------------------|-------------------------------------------------|
| `feedback`     |                    | Operation feedback                              |
| `movementList` | <center>X</center> | List with all the user movements, if successful |

### GET: internalMovements

Get user's internal movements.

Response:

| Property            | Optional           | Description                                              |
|---------------------|--------------------|----------------------------------------------------------|
| `feedback`          |                    | Operation feedback                                       |
| `internalMovements` | <center>X</center> | List with all the user internal movements, if successful |

### GET: transfers

Get user's transfers.

Response:

| Property    | Optional           | Description                                     |
|-------------|--------------------|-------------------------------------------------|
| `feedback`  |                    | Operation feedback                              |
| `transfers` | <center>X</center> | List with all the user transfers, if successful |

### GET: payments

Get user's payments.

Response:

| Property   | Optional           | Description                                    |
|------------|--------------------|------------------------------------------------|
| `feedback` |                    | Operation feedback                             |
| `payments` | <center>X</center> | List with all the user payments, if successful |

### POST: transfers

Process new user transfer.

Request:

| Property            | Optional           | Description           |
|---------------------|--------------------|-----------------------|
| `recipientWalletId` |                    | Recipient's wallet ID |
| `transactionValue`  |                    | Funds amount          |
| `recipientData`     | <center>X</center> | Extra data            |

`recipientData`:

| Property         | Optional           | Description       |
|------------------|--------------------|-------------------|
| `recipientEmail` | <center>X</center> | Recipient's email |
| `recipientName`  | <center>X</center> | Recipient's name  |
| `description`    | <center>X</center> | Extra description |

Response:

| Property   | Optional           | Description                             |
|------------|--------------------|-----------------------------------------|
| `feedback` |                    | Operation feedback                      |
| `transfer` | <center>X</center> | Newly processed transfer, if successful |

### POST: payments

Process new user payment.

Request:

| Property           | Optional | Description                 |
|--------------------|----------|-----------------------------|
| `entity`           |          | Recipient entity identifier |
| `reference`        |          | Entity's payment reference  |
| `transactionValue` |          | Funds amount                |

Response:

| Property   | Optional           | Description                            |
|------------|--------------------|----------------------------------------|
| `feedback` |                    | Operation feedback                     |
| `payment`  | <center>X</center> | Newly processed payment, if successful |
