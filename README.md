# CRM Project Backend Documentation

## API Documentation
Postman Collection URL:
https://crm-backend-new.postman.co/workspace/CRM-BACKEND-NEW-Workspace~5bafd9b7-8696-4a95-9fd8-e9e6ad6ad944/collection/37446654-0d427c5f-926d-4da3-bb6a-3f02c26fbdfa?action=share&creator=39667115

## Project Flow Documentation

### Architecture Overview
The project follows a modular architecture with the following key components:
- Express.js server
- Sequelize ORM for database management
- RESTful API endpoints
- JWT-based authentication
- Role-based access control
- File upload functionality

### Core Components Flow

1. **Server Initialization**
   - Database connection and sync
   - Express middleware setup
   - CORS configuration
   - Routes registration

2. **Authentication Flow**
   - User registration
   - Login authentication
   - JWT token generation
   - Session management

3. **Main Module Flows**

   a. **User Management**
   - User CRUD operations
   - Role assignment
   - Permission management
   - Department and designation handling

   b. **Client Management**
   - Client registration
   - Sub-client handling
   - Client profile management
   - Client interaction tracking

   c. **Project Management**
   - Project creation and tracking
   - Task management
   - Milestone tracking
   - Project reporting

   d. **HR Management**
   - Employee management
   - Attendance tracking
   - Leave management
   - Training programs
   - Job applications and interviews

   e. **Sales & CRM**
   - Lead management
   - Deal pipeline
   - Quotations and proposals
   - Customer tracking

   f. **Finance Management**
   - Invoice generation
   - Payment tracking
   - Expense management
   - Contract handling

4. **Support Features**
   - File upload system
   - Notification system
   - Activity logging
   - Message communication
   - Calendar management

### API Routes Structure
```
/api/v1/
├── auth/                  # Authentication endpoints
├── users/                 # User management
├── roles/                 # Role management
├── permissions/          # Permission settings
├── clients/              # Client management
├── employees/            # Employee management
├── departments/          # Department handling
├── projects/             # Project management
├── tasks/                # Task management
├── leads/                # Lead management
├── deals/                # Deal management
├── invoices/             # Invoice handling
└── ...                   # Other module endpoints
```

### Database Flow
- Sequelize models for data structure
- Relationships between entities
- Data validation and constraints
- Transaction management

### Security Implementation
- JWT authentication
- Role-based access control
- Input validation
- Error handling
- Response standardization

### Error Handling Flow
1. Request validation
2. Business logic validation
3. Database operation validation
4. Standardized error responses
5. Error logging

## Getting Started

### Prerequisites
- Node.js
- MySQL/PostgreSQL
- npm/yarn

### Installation Steps
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Run database migrations
5. Start the server: `npm start`

### Environment Configuration
Create a `.env` file with the following variables:
```
PORT=your_port
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
