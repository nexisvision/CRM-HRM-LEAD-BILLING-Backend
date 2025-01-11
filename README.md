<div align="center">

<!-- Header Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,2,2,2,2&height=200&section=header&text=CRM%20Backend&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=35"/>

<!-- Typing Animation -->
<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=1000&color=3DDCFF&center=true&vCenter=true&random=false&width=435&lines=Backend+API+for+CRM+System;JWT+Authentication;Seamless+Database+Management;Role+Based+Access"/>
</p>

<!-- Animated Emojis -->
<p align="center" style="display: flex; justify-content: space-between; max-width: 960px;">
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png" alt="Waving Hand" width="100" height="100"/>
   <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Smiling%20Face%20With%20Sunglasses.webp" alt="Smiling Face With Sunglasses" width="100" height="100" />
</p>

<!-- Hacker Style Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/Status-OK-00ff00?style=for-the-badge&logo=matrix&logoColor=white"/>
  <img src="https://img.shields.io/badge/System-Online-00ff00?style=for-the-badge&logo=matrix&logoColor=white"/>
</p>

<!-- GitHub Stats -->
<p align="center">
  <a href="https://github.com/yash-babariya">
    <img height="160em" src="https://github-readme-stats.vercel.app/api?username=yash-babariya&show_icons=true&theme=react&bg_color=0D1117&title_color=3DDCFF&icon_color=3DDCFF&hide_border=true&count_private=true"/>
    <img height="160em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=yash-babariya&layout=compact&theme=react&bg_color=0D1117&title_color=3DDCFF&hide_border=true"/>
  </a>
</p>

---

## 📚 **API Documentation**
- Postman Collection URL:  
[CRM Backend API Collection](https://crm-backend-new.postman.co/workspace/CRM-BACKEND-NEW-Workspace~5bafd9b7-8696-4a95-9fd8-e9e6ad6ad944/collection/37446654-0d427c5f-926d-4da3-bb6a-3f02c26fbdfa?action=share&creator=39667115)

---


## 🧑‍💻 **Project Flow Documentation**

### 🌐 **Architecture Overview**
This project follows a modular architecture, including the following components:
- **Express.js**: Handles server and API routing
- **Sequelize ORM**: Facilitates interaction with databases
- **RESTful API Endpoints**: Defined for communication between client and server
- **JWT Authentication**: Secure authentication using tokens
- **Role-Based Access Control**: Manage user permissions and access levels
- **File Upload**: Supports file storage and upload functionality

### 🛠️ **Core Components Flow**
#### 1. **Server Initialization**
   - **Database connection & sync**
   - **Express middleware setup**
   - **CORS configuration**
   - **Route registration**

#### 2. **Authentication Flow**
   - **User registration & login**
   - **JWT token generation**
   - **Session management**

#### 3. **Main Module Flows**
   - **User Management**: CRUD operations for users, roles, permissions, and department handling
   - **Client Management**: Client registration, profile management, interaction tracking
   - **Project Management**: Project creation, task management, milestone tracking
   - **HR Management**: Employee, attendance, leave, training management
   - **Sales & CRM**: Lead, deal, quotation, and customer tracking
   - **Finance Management**: Invoice, payment, expense tracking, contract management

#### 4. **Support Features**
   - **File Upload**
   - **Notification System**
   - **Activity Logging**
   - **Calendar Management**
   - **Messaging System**

### API Routes Structure
```
/api/v1/
# API Routes Structure
#
# ├── auth/                  # Authentication endpoints
# ├── users/                 # User management
# ├── roles/                 # Role management
# ├── permissions/          # Permission settings
# ├── clients/              # Client management
# ├── sub-clients/         # Sub-client handling
# ├── employees/           # Employee management
# ├── departments/          # Department management
# ├── designations/        # Designation management
# ├── attendance/          # Attendance tracking
# ├── leaves/              # Leave management
# ├── subscriptions/       # Subscription handling
# ├── announcements/       # Announcement system
# ├── events/              # Event management
# ├── projects/            # Project management
# ├── project-reports/     # Project reporting
# ├── features/            # Feature management
# ├── taskcalendars/       # Task calendar
# ├── currencies/          # Currency management
# ├── branches/            # Branch management
# ├── tasks/               # Task management
# ├── countries/           # Country management
# ├── labels/              # Label management
# ├── sources/             # Source management
# ├── contracts/           # Contract handling
# ├── invoices/            # Invoice generation
# ├── expenses/            # Expense management
# ├── payments/            # Payment tracking
# ├── milestones/          # Milestone tracking
# ├── notes/               # Note management
# ├── activities/          # Activity tracking
# ├── deals/               # Deal management
# ├── leads/               # Lead management
# ├── pipelines/           # Pipeline management
# ├── stages/              # Stage management
# ├── products/            # Product management
# ├── quotations/          # Quotation management
# ├── proposals/           # Proposal management
# ├── tickets/             # Ticket management
# ├── job-applications/    # Job application management
# ├── meetings/            # Meeting management
# ├── jobs/                # Job management
# ├── skills/              # Skill management
# ├── interview-schedules/ # Interview schedule management
# ├── messages/            # Message communication
# ├── appreciations/       # Appreciation management
# ├── trainings/           # Training management
# ├── employeeSalary/      # Employee salary management
# ├── notifications/       # Notification management
# ├── customers/           # Customer management
# ├── sales-quotations/    # Sales quotation management
# ├── sales-invoices/      # Sales invoice management
# ├── sales-revenue/       # Sales revenue management
# └── sales-creditnote/    # Sales creditnote management
```

## 🔧 **API Routes CRUD**

The API supports standard CRUD operations:

- **Create**: `POST /`
- **Get All**: `GET /`
- **Get One**: `GET /:id`
- **Update**: `PUT /:id`
- **Delete**: `DELETE /:id`

---

## 🗄️ **Database Flow**
- **Sequelize Models**: Defines data structure and relationships
- **Transactions**: Manage transactions for safe data operations
- **Data Validation**: Ensures integrity and constraints at every level

---

## 🛡️ **Security Implementation**
- **JWT Authentication**: Secure user authentication and token-based authorization
- **Role-Based Access Control (RBAC)**: Manage permissions for different roles
- **Input Validation**: Prevent injection and ensure clean inputs
- **Error Handling**: Standardized error responses across the system
- **Response Standardization**: Ensure consistent API response format

---

## ⚠️ **Error Handling Flow**
1. **Request Validation**: Ensure proper input format
2. **Business Logic Validation**: Ensure correct logic flow
3. **Database Validation**: Ensure valid database operations
4. **Error Responses**: Standardized JSON error responses
5. **Error Logging**: Log errors for monitoring

---

## 🏁 **Getting Started**

### ⚙️ **Prerequisites**
- **Node.js**: >= v14
- **MySQL/PostgreSQL**: For database storage
- **npm/yarn**: For package management

### 🧑‍🔧 **Installation Steps**
1. Clone the repository:  
   `git clone https://your-repo-url.git`
2. Install dependencies:  
   `npm install`
3. Configure environment variables by creating a `.env` file
4. Run migrations to set up the database schema:  
   `npm run migrate`
5. Start the server:  
   `npm start`

### 🖋️ **Environment Configuration**
Ensure your `.env` file has the following variables:

```dotenv
PORT=your_port
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
