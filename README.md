# Tenderpoa REST APIs

## Overview

This repository contains a set of REST APIs for tracking tenders. These APIs are designed to facilitate the creation, retrieval, updating, and deletion of tender-related information. The system is built to streamline the tender tracking process and provide a reliable interface for interacting with tender data.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites:

- Node.js and npm installed
- MongoDB or another compatible database
- API Key for authentication

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/cngetich37/tenderpoa-backend.git
   ```

2. Install dependencies:

   ```bash
   cd tenderpoa-backend
   npm install
   ```

3. Set up your environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/tenderdb
   API_KEY=your-api-key
   ```

   Adjust the values accordingly.

4. Start the server:

   ```bash
   npm start
   ```

The server should now be running at `http://localhost:3000`.

## Usage

### Authentication

All endpoints require authentication using an API key. Include your API key in the `Authorization` header of your requests.

Example:

```http
GET /api/tenders
Authorization: Bearer your-api-key
```

### Endpoints

### Users Endpoints

#### 1. Register a User

- **URL**: `/api/users/signup`
- **Method**: `POST`
- **Description**: register a user with the system.

#### 2. Login a User

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Description**: Authenticate a user using json web tokens

#### 3. Account Recovery

- **URL**: `/api/users/forgot-password`
- **Method**: `POST`
- **Description**: It enables the user to recover the account when he/she forgets the password

#### 4. Reset Password

- **URL**: `/api/users/reset-password/:token`
- **Method**: `POST`
- **Description**: User resets the password for the account

### Tenders Endpoints

#### 1. Get Open Tenders

- **URL**: `/api/tenders/`
- **Method**: `GET`
- **Description**: Get all tenders that have tender status as Open

#### 2. Get Tender by ID

- **URL**: `/api/tenders/:id`
- **Method**: `GET`
- **Description**: Retrieve details of a specific tender by its ID.

#### 3. Create a Tender

- **URL**: `/api/tenders`
- **Method**: `POST`
- **Description**: Create a new tender.

#### 4. Make Bid

- **URL**: `/api/tenders/:id`
- **Method**: `PUT`
- **Description**: Update details of an open tender to bidded once the bidder has bidded the tender.

#### 5. Delete Tender by ID

- **URL**: `/api/tenders/:id`
- **Method**: `DELETE`
- **Description**: Delete a specific tender by its ID.

#### 6. Get Bidded Tenders

- **URL**: `/api/tenders/bidded`
- **Method**: `GET`
- **Description**: Get tenders that are already bidded

#### 7. Get Closed Tenders

- **URL**: `/api/tenders/closed`
- **Method**: `GET`
- **Description**: Get tenders that are closed.

#### 8. Get Due Tenders

- **URL**: `/api/tenders/due`
- **Method**: `GET`
- **Description**: Get tenders that are due.

#### 9. Update Tender Status to Due when it is due

- **URL**: `/api/tenders/update-due`
- **Method**: `PUT`
- **Description**: Update the Tender status to Due when it is due and still open( closing date time is current date)

#### 10. Update Tender Status to Closed when it is past Due date

- **URL**: `/api/tenders/closed-tenders`
- **Method**: `PUT`
- **Description**: Update the Tender status to Closed when it is past due date and still open( closing date time is current date)

## Examples

### Get All Tenders

```http
GET /api/tenders
Authorization: Bearer your-api-key
```

Response:

```json
[
  {
    "_id": "656c398439682bd462d9182a",
    "tenderNo": "ICT/Y/78/23",
    "tenderDescription": "Supply of routers and switches",
    "client": "Liquid Telecom",
    "siteVisitDate": "2023-11-30T09:14:59.462Z",
    "timeExtension": "4",
    "bidSecurity": 250000,
    "bidSourceInsurance": "Bank",
    "closingDateTime": "2023-11-30T09:14:59.462Z",
    "location": "Kilimani",
    "tenderValueDollars": 10000,
    "dollarRate": 150,
    "tenderValueKsh": 1500000,
    "company": "Company A",
    "tenderStatus": "Open",
    "createdAt": "2023-12-03T08:17:08.476Z",
    "updatedAt": "2023-12-03T08:17:08.476Z",
    "__v": 0
  }
]
```

For more examples, refer to the [Examples](/examples) directory.

## Contributing

If you would like to contribute to the development of this project, please follow the [Contributing Guidelines](/CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.
