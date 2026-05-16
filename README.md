# URL Shortener

A simple and efficient URL shortening service built with Node.js.

## Overview

This project provides a service to convert long URLs into short, easy-to-share links. It generates secure 8-character codes using cryptographic methods and uses Prisma ORM for database management.

## Features

- Generate short URLs with secure 8-character codes
- Cryptographically secure code generation
- Prisma ORM for reliable database management
- Simple and efficient API
- Easy to deploy and scale

## Tech Stack

- **Runtime:** Node.js
- **ORM:** Prisma
- **Security:** Node.js Crypto module for code generation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Database (PostgreSQL, MySQL, SQLite, etc. - supported by Prisma)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AshishResolute/urlShortner.git
cd urlShortner
```

2. Install dependencies:
```bash
npm i
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your database connection URL:
   ```
   DATABASE_URL="your_database_connection_string"
   ```

4. Set up Prisma:
```bash
npx prisma migrate dev
```

### Usage

Start the server:
```bash
npm start
```

The server will run and be ready to shorten URLs. Visit the application in your browser or make API requests to create short URLs.

## How It Works

- Each new URL is assigned a unique 8-character code generated using Node.js's `crypto` module
- The mapping between short codes and original URLs is stored in the database using Prisma ORM
- Users can access the original URL by using the short code

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

*(To be specified)*

---

**Note:** This project is currently under development. More features and documentation will be added soon.
