# Personal Expense Tracker

A web application designed to track and manage personal expenses, inspired by SIH26102. This is for a university Django assessment.

---

## Tech Stack

- **Backend:** Django, Django REST Framework, Simple JWT
- **Frontend:** React (Vite)
- **Database Engine:** MySQL (SQLite fallback for local development)

---

## Architecture

The application follows a client-server architecture where a React frontend communicates with a Django REST Framework backend backed by MySQL.

```mermaid
flowchart TB
    subgraph FE["Frontend - React + Vite"]
        APP["Application"]
        AUTH["Login / Register"]
        DASH["Dashboard"]
        TRANS["Transaction Management"]
        CHART["Summary Cards and Charts"]
        FORM["Transaction Form"]
        LIST["Transaction History and Filters"]

        APP --> AUTH
        APP --> DASH
        APP --> TRANS
        DASH --> CHART
        TRANS --> FORM
        TRANS --> LIST
    end

    subgraph BE["Backend - Django + DRF"]
        URL["API URLs"]
        AUTHM["JWT Authentication"]
        VIEW["API Views"]
        SERIAL["Serializers"]
        MODEL["User and Transaction Models"]

        URL --> AUTHM
        AUTHM --> VIEW
        VIEW --> SERIAL
        SERIAL --> MODEL
    end

    DB[("MySQL Database")]

    AUTH -->|"Register / Login"| URL
    DASH -->|"Authenticated API requests"| URL
    TRANS -->|"Authenticated API requests"| URL
    AUTHM <-->|"Verify JWT"| MODEL
    MODEL -->|"Django ORM"| DB
```

---

## Entity-Relationship Diagram

The relational schema stores user accounts and their associated transaction records.

```mermaid
erDiagram
    USER ||--o{ TRANSACTION : owns

    USER {
        bigint id PK
        varchar username
        varchar email
        varchar password
    }

    TRANSACTION {
        bigint id PK
        bigint user_id FK
        varchar title
        decimal amount
        varchar type
        varchar category
        date date
        text note
        datetime created_at
        datetime updated_at
    }
```

---

## Setup Guide (since this is a team project)

1. Copy `.env.example` to `.env` in the project root and configure the values.
2. Create and activate a Python virtual environment, then install backend dependencies:
   - `cd backend`
   - `python -m venv .venv`
   - `source .venv/bin/activate`
   - `pip install -r requirements.txt`
3. Run database migrations and start the backend:
   - `python manage.py migrate`
   - `python manage.py runserver`
4. Start the frontend in a separate terminal:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

The backend reads configuration from the root `.env` file. Set `MYSQL_*` variables to use MySQL; if `MYSQL_DATABASE` is not set, SQLite is used for local development.

---

## Application Flow

```mermaid
sequenceDiagram
    actor User
    participant React
    participant Django as Django REST API
    participant DB as MySQL

    User->>React: Login and submit transaction
    React->>Django: POST /api/auth/login/
    Django-->>React: JWT access and refresh tokens
    React->>Django: POST /api/transactions/
    Django->>Django: Authenticate and validate request
    Django->>DB: Save transaction
    DB-->>Django: Transaction saved
    Django-->>React: 201 Created
    React->>Django: GET /api/transactions/summary/
    Django->>DB: Aggregate user's expense data
    DB-->>Django: Summary statistics
    Django-->>React: JSON response
    React-->>User: Display updated dashboard
```

---

## Authors

- [Saptaparno Chakraborty](https://github.com/schak04)
- [Shubham Singh](https://github.com/Staggered95)

---
