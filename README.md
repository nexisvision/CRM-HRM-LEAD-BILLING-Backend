# CRM-HRM-LEAD-BILLING System

A comprehensive Enterprise Resource Management System with CRM, HRM, Lead Management, and Billing capabilities.

## System Architecture

### Backend (Node.js)
- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT
- **API Style**: RESTful
- **Port**: 5353

### Frontend (To be implemented)
- **Framework**: React.js (recommended)
- **State Management**: Redux/Context API
- **UI Library**: Material-UI/Ant Design
- **Port**: 5000

## Features

### Implemented (Backend)
- 🔐 Multi-level Authentication (Super Admin, Client Admin, Employees)
- 👥 User Management
- 📊 Department & Designation Management
- ⏰ Attendance System
- 📅 Leave Management
- 📢 Announcements
- 📆 Events & Meetings
- 🔑 Role-based Access Control
- 💳 Subscription Management

### Planned
- 📱 Mobile Responsive Frontend
- 📊 Analytics Dashboard
- 📨 Email Notifications
- 💬 Real-time Chat
- 📁 Document Management
- 📈 Reports Generation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Backend Setup
1. Navigate to backend directory:bash
cd backend

2. Install dependencies:


env
DB_NAME=crm
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
TIMEZONE=+05:30
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5000
PORT=5353
SUPER_ADMIN_SECRET_KEY=your_super_admin_key


4. Start the server:

bash
npm run dev



### Frontend Setup (Future Implementation)
1. Create React app in frontend directory
2. Install required dependencies
3. Configure API endpoints
4. Implement user interface

## API Documentation

Detailed API documentation is available in the Postman collection. Key endpoints include:

### Authentication
- POST `/api/v1/auth/super-admin/signup` - Super Admin Registration
- POST `/api/v1/auth/login` - User Login
- POST `/api/v1/auth/signup` - User Registration

### User Management
- GET `/api/v1/users` - Get All Users
- GET `/api/v1/users/:id` - Get User by ID

### Attendance
- POST `/api/v1/attendance` - Mark Attendance
- GET `/api/v1/attendance` - Get All Attendance Records

### Announcements
- POST `/api/v1/announcements` - Create Announcement
- GET `/api/v1/announcements` - Get All Announcements

### Events & Meetings
- POST `/api/v1/events` - Create Event
- GET `/api/v1/meetings` - Get All Meetings

## Project Structure

project-root/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── utils/
│ │ └── server.js
│ ├── .env
│ └── package.json
├── frontend/ (To be implemented)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.js
│ └── package.json
└── README.md



## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/CRM-HRM-LEAD-BILLING](https://github.com/yourusername/CRM-HRM-LEAD-BILLING)

