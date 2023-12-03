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

#### 1. Get All Tenders

- **URL**: `/api/tenders`
- **Method**: `GET`
- **Description**: Retrieve a list of all tenders.

#### 2. Get Tender by ID

- **URL**: `/api/tenders/:id`
- **Method**: `GET`
- **Description**: Retrieve details of a specific tender by its ID.

#### 3. Create a Tender

- **URL**: `/api/tenders`
- **Method**: `POST`
- **Description**: Create a new tender.

#### 4. Update Tender by ID

- **URL**: `/api/tenders/:id`
- **Method**: `PUT`
- **Description**: Update details of a specific tender by its ID.

#### 5. Delete Tender by ID

- **URL**: `/api/tenders/:id`
- **Method**: `DELETE`
- **Description**: Delete a specific tender by its ID.

#### 6. Get Bidded Tenders

- **URL**: `/api/tenders/bidded`
- **Method**: `GET`
- **Description**: Get tenders that are already bidded

#### 7. Get Bidded Tenders

- **URL**: `/api/tenders/closed`
- **Method**: `GET`
- **Description**: Get tenders that are closed.

#### 8. Get Due Tenders

- **URL**: `/api/tenders/due`
- **Method**: `GET`
- **Description**: Get tenders that are due.

#### 9. Get Open Tenders

- **URL**: `/api/tenders/`
- **Method**: `GET`
- **Description**: Get tenders that have tender status as Not Bidded

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
    "tenderStatus": "Not Bidded",
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
