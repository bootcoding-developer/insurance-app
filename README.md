# Insurance App

The Insurance App is a full-stack MERN application designed to manage insurance records. It provides three core features for managing Customers, Insurers, and Insurance policies. Each module includes CRUD (Create, Read, Update, Delete) operations, along with additional features like searching, sorting, filtering, and pagination.

## Features

### 1. Customer Management
- Add, edit, delete, and view customer details.
- Search customers by name, email, or phone number.
- Sort customer data by various fields (e.g., name, date created).
- Apply filters based on customer status or other attributes.
- Paginate through large lists of customers efficiently.

### 2. Insurer Management
- Manage insurer details including name, email, contact information, and policies offered.
- Perform CRUD operations for insurers.
- Search, sort, and filter insurers based on various criteria.
- Support for pagination for handling large datasets.

### 3. Insurance Policy Management
- Create, update, delete, and view insurance policy details.
- Search for policies by policy number, type, or associated customer/insurer.
- Sort policies by premium, start/end dates, or status.
- Filter policies by insurance type (e.g., health, auto) or status (e.g., active, expired).
- Pagination support for displaying a large number of policies.

---

## Tech Stack

### Frontend
- **React.js**: For building the user interface with reusable components.
- **React Router**: For managing navigation and routing between pages.
- **Axios**: For making HTTP requests to the backend.
- **Tailwind CSS**: For responsive and modern UI design.

### Backend
- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Framework for building RESTful APIs.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB.

### Database
- **MongoDB**: NoSQL database to store data for customers, insurers, and policies.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/insurance-app.git
   cd insurance-app
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory with the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongo_database_url
     ```

4. Start the application:
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # Start the frontend server
   cd client
   npm start
   ```

5. Open the app in your browser:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

---

## Usage

- **Customer Management**: Add and manage customer records.
- **Insurer Management**: Maintain insurer details and offerings.
- **Insurance Policies**: Create and track insurance policies.

---

## Folder Structure

```
insurance-app/
├── client/         # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/         # Express backend
│   ├── models/     # Mongoose schemas
│   ├── routes/     # API endpoints
│   ├── controllers/ # Business logic
│   ├── utils/      # Helper functions
│   └── package.json
└── README.md
```

---

## Future Enhancements
- Implement user authentication and role-based access control.
- Add analytics dashboards for policy trends and customer insights.
- Enable notifications for policy expirations and premium due dates.
- Integrate payment gateways for online premium payment.

---

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for review.

---

## License
This project is licensed under the [MIT License](LICENSE).
