# Company Crawler

Company Crawler is a full stack application designed to fetch and manage company information from specified websites. The application periodically crawls these websites, extracts relevant company details, and stores them in a database. The data is then transferred to Elasticsearch using Logstash, enabling users to perform searches based on company name, CIN, and PIN.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Crawl and fetch company information from specified websites.
- Store company information in a database.
- Transfer data to Elasticsearch using Logstash.
- Search companies by name, CIN, and PIN.
- Periodic crawling using cron jobs.

## Tech Stack

- **Frontend**: TypeScript, React
- **Backend**: TypeScript, Node.js, Express
- **Database**: Mysql
- **Search Engine**: Elasticsearch
- **Data Transfer**: Logstash
- **Task Scheduling**: Cron

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- Elasticsearch
- Logstash
- Mysql

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/yourusername/company-crawler.git
    cd company-crawler
    ```

2. **Install dependencies for both frontend and backend:**

    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. **Set up your environment variables:**

    Create a `.env` file in the `backend` directory and add the necessary configuration variables (e.g., database connection string, Elasticsearch endpoint, etc.).

## Running the Application

1. **Start the frontend:**

    ```sh
    cd frontend
    npm run dev
    ```

    The frontend should now be running on `http://localhost:3000`.

2. **Build and start the backend:**

    ```sh
    cd backend
    npm run build
    npm start
    ```

    The backend should now be running on `http://localhost:4000`.

## Usage

1. **Run the cron job:**

    To ensure that the application periodically crawls for new company information, set up the cron job on your system as per the instructions in the `cron-job.sh` script provided in the repository.

    ```sh
    ./src/cron.ts
    ```

2. **Search for companies:**

    Once the application is running, you can perform searches based on company name, CIN, and PIN through the frontend interface.


## License

This project is licensed under the MIT License

