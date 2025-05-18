# Zalendo Voting System

A full-stack campus online voting system for secure and efficient elections, built with React (frontend) and Node.js/Express/MongoDB (backend).

---

## Features

- **User Registration & Login**: Separate flows for voters and admins.
- **Role-based Dashboards**: Different interfaces for admins and voters.
- **Secure Authentication**: Passwords hashed with bcrypt.
- **Vote Casting**: Users can cast votes for candidates in various elections.
- **Results Display**: Real-time election results.
- **Review System**: Users can submit feedback and ratings.
- **Admin Management**: Admins can manage users, candidates, and elections.

---

## Tech Stack

- **Frontend**: React, Axios, React Router, React Hot Toast
- **Backend**: Node.js, Express, Mongoose (MongoDB)
- **Database**: MongoDB
- **Authentication**: Password hashing with bcrypt

---

## Folder Structure

```
campus-online-voting-system/
│
├── client/         # React frontend
│   └── src/
│       └── components/
│       └── contexts/
│       └── styles/
│
├── server/         # Node.js backend
│   └── handlers.js
│   └── helpers.js
│   └── tables.js
│   └── ...
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

---

### Backend Setup

1. **Install dependencies:**
    ```bash
    cd server
    npm install
    ```

2. **Configure environment variables:**
    Create a `.env` file in the `server` directory:
    ```
    MONGODB_URI=mongodb://localhost:27017/zalendo-voting
    port=5005
    ```

3. **Start the backend server:**
    ```bash
    npm start
    ```
    The backend will run on `http://localhost:${port}`.

---

### Frontend Setup

1. **Install dependencies:**
    ```bash
    cd client
    npm install
    ```

2. **Configure environment variables:**
    Create a `.env` file in the `client` directory:
    ```
    REACT_APP_API_URL=http://localhost:${port}$
    ```

3. **Start the frontend:**
    ```bash
    npm start
    ```
    The frontend will run on `http://localhost:${port}`.

---

## Usage

- **Register** as a voter or login as an admin/voter.
- **Admins** can manage elections, candidates, and view results.
- **Voters** can cast votes and view results.
- **All users** can submit reviews.

---

## API Endpoints (Backend)

- `POST /api/register` — Register a new voter
- `POST /api/login` — Login as voter or admin
- `POST /api/review` — Submit a review
- `GET /api/results` — Get election results
- ...and more (see `handlers.js`)

---

## Customization

- Update MongoDB connection string and ports as needed.
- Add more roles or election types in `tables.js` and related handlers.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

MIT

---

## Authors

- [Your Name]
- [Contributors]

---

## Acknowledgements

- Inspired by campus voting needs.
- Built with [React](https://react.dev/) and [Express](https://expressjs.com/).