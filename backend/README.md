# Enterprise CRM System
A subscription-based multi-tenant CRM system with role-based access control and company-specific resource management.

## Table of Contents
- [System Overview](#1-system-overview)
- [Setup Instructions](#2-setup-instructions) 
- [Project Structure](#3-project-structure)
- [API Documentation](#4-api-documentation)
- [Models](#5-models)
- [Security & Best Practices](#6-security--best-practices)

## 1. System Overview

### User Hierarchy
- **Super Admin**: System owner, manages subscriptions and packages
- **Client Admin**: Subscribed company owner, manages company resources
- **Employees**: Company staff with role-based access

### Core Features
- Multi-tenant subscription architecture
- Role-based access control
- Employee management
- Attendance tracking
- Leave management
- Department & designation management
- Document handling
- Announcement & event management
- Permission management
- Role-permission mapping

### Future Plans
- Flexible subscription tiers and pricing
- Usage-based billing
- Advanced reporting and analytics
- Mobile application development
- Integration with third-party services
- Chat and collaboration features
- Task management system
- Client portal
- Email marketing integration
- Custom workflow automation
- API marketplace

### Key Technologies
- Node.js & Express.js
- MySQL with Sequelize ORM
- JWT Authentication
- RESTful API architecture
- Stripe for subscription billing

## 2. Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager