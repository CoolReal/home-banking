# Model

## User

| Property    | Optional           | Description         |
|-------------|--------------------|---------------------|
| `id`        |                    | User identifier     |
| `email`     |                    | User email          |
| `createdAt` |                    | Date of creation    |
| `updatedAt` |                    | Date of last update |
| `password`  |                    | Hashed password     |
| `lastLogin` | <center>X</center> | Date of last login  |
| `name`      | <center>X</center> | User name           |

## Wallet

| Property    | Optional | Description         |
|-------------|----------|---------------------|
| `id`        |          | Wallet identifier   |
| `userId`    |          | User identifier     |
| `createdAt` |          | Date of creation    |
| `updatedAt` |          | Date of last update |
| `funds`     |          | Funds amount        |

## Movement List

Aggregates all types of movements tied to the given wallet.

| Property            | Optional | Description                     |
|---------------------|----------|---------------------------------|
| `id`                |          | Movement list Identifier        |
| `walletId`          |          | Wallet identifier               |
| `createdAt`         |          | Date of creation                |
| `updatedAt`         |          | Date of last update             |
| `internalMovements` |          | Array of all internal movements |
| `payments`          |          | Array of all payments           |
| `transfers`         |          | Array of all transfers          |

## Internal Movement

Movement type for internal usage, this includes self withdraws and deposits,

| Property           | Optional           | Description                        |
|--------------------|--------------------|------------------------------------|
| `id`               |                    | Internal Movement Identifier       |
| `createdAt`        |                    | Date of creation                   |
| `description`      | <center>X</center> | Description                        |
| `transactionValue` |                    | Transaction value                  |
| `newWalletValue`   |                    | New wallet value after transaction |

## Payment

Movement type for service payment.

| Property           | Optional           | Description                        |
|--------------------|--------------------|------------------------------------|
| `id`               |                    | Internal Movement Identifier       |
| `createdAt`        |                    | Date of creation                   |
| `description`      | <center>X</center> | Description                        |
| `transactionValue` |                    | Transaction value                  |
| `newWalletValue`   |                    | New wallet value after transaction |
| `entity`           |                    | Recipient entity identifier        |
| `reference`        |                    | Entity's payment reference         |

## Transfer

Movement type for inter-wallet fund transactions.

| Property            | Optional           | Description                        |
|---------------------|--------------------|------------------------------------|
| `id`                |                    | Internal Movement Identifier       |
| `createdAt`         |                    | Date of creation                   |
| `description`       | <center>X</center> | Description                        |
| `transactionValue`  |                    | Transaction value                  |
| `newWalletValue`    |                    | New wallet value after transaction |
| `originWalletId`    |                    | Transfer's origin wallet           |
| `recipientWalletId` |                    | Recipient's wallet ID              |
| `recipientEmail`    | <center>X</center> | Recipient's email                  |
| `recipientName`     | <center>X</center> | Recipient's name                   |
