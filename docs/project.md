# Terminal KIT Management System

## 📌 Overview

This project is a full-stack web application that allows clients to request activation/deactivation of Terminal KITs, and administrators to process those requests and interact with a third-party provider.

The system consists of:

* Client UI
* Admin UI
* Backend API
* PostgreSQL database

---

## 🎯 Core Features

### Client

* Register account
* Wait for admin approval
* Login
* Submit requests with:

  * Activation Terminal KITs
  * Temporary deactivation Terminal KITs
  * Permanent deactivation Terminal KITs
  * Comment
* View own request history

### Admin

* Approve or reject users
* View pending Terminal KIT actions
* Select Terminal KITs and create provider requests
* Manually input provider responses (from email)
* Track request results

---

## 🧠 Domain Model

### Terminal KIT State

* `active`
* `deactivated_temp`
* `deactivated_perm`

### Action Types

* `activate`
* `deactivate_temp`
* `deactivate_perm`

### Action Status

* `pending_admin`
* `pending_provider`
* `completed`
* `failed`

---

## 🗄️ Database Schema

### users

* id
* email
* password_hash
* role (admin | client)
* status (pending | approved | rejected)
* created_at
* updated_at

### client_requests

* id
* user_id
* comment
* created_at
* updated_at

### terminal_kits

* id
* terminal_kit (unique)
* current_state
* created_at
* updated_at

### terminal_kit_actions

* id
* terminal_kit_id
* action_type
* status
* previous_state (nullable)
* resulting_state (nullable)
* client_request_id
* provider_request_id (nullable)
* created_at
* updated_at

### provider_requests

* id
* external_id
* status
* created_at
* updated_at

---

## 🔄 Business Rules

### Validation Rules

* Active Terminal KIT cannot be activated again
* Permanently deactivated Terminal KIT cannot be activated
* Temporarily deactivated Terminal KIT can be activated
* Active Terminal KIT can be deactivated
* Terminal KIT cannot have more than one active action at a time

### Request Rules

* Client requests are immutable
* One request can contain multiple actions
* Duplicate Terminal KITs in a single request are not allowed

### Provider Interaction

* Admin manually receives response via email
* Admin inputs results into system
* Partial success is allowed

---

## 🔁 Workflow

### Client Flow

1. Register
2. Wait for approval
3. Login
4. Submit request
5. System validates and creates Terminal KIT actions

### Admin Flow

1. Login
2. View pending actions
3. Select actions
4. Create provider request
5. Wait for email response
6. Input results
7. System updates states on terminal kit actions and terminal kits

---

## 🌐 API (High-Level)

### Auth

* POST /auth/register
* POST /auth/login

### Users (Admin)

* GET /users/pending
* PATCH /users/:id/approve
* PATCH /users/:id/reject

### Client Requests

* POST /client-requests
* GET /client-requests/my

### Terminal KIT Actions

* GET /terminal-kit-actions/pending-admin

### Provider Requests

* POST /provider-requests
* GET /provider-requests
* POST /provider-requests/:id/results

---

## 🏗️ Architecture

### Monorepo Structure

```
/apps
  /frontend
  /backend
/packages
  /shared
```

### Backend

* NestJS (TypeScript)
* Prisma ORM
* PostgreSQL

### Frontend

* Next.js (React + TypeScript)
* React Query
* Axios
* React Hook Form

### Shared

* DTOs
* Enums

---

## 🔐 Authentication

* JWT-based authentication
* Password hashing (bcrypt)

---

## 🧾 Audit Logging

* Tracks Terminal KIT state transitions
* Stores previous and next state

---

## 🚀 Future Improvements

* Redis + queue for async processing
* Automated provider integration (API/webhook)
* Retry mechanisms
* Role expansion

---

## ⚠️ Key Design Principles

1. One active action per Terminal KIT at a time
2. Separate Terminal KIT state from action state
3. Keep client requests immutable
4. Prefer simple and explicit workflows

---

## 🧪 Development Notes

* Focus on correctness of state transitions
* Avoid overengineering in MVP
* Use shared types between FE and BE

---

## 📦 Tech Stack

* Backend: NestJS
* Frontend: Next.js
* Language: TypeScript
* Database: PostgreSQL
* ORM: Prisma

---

## ✅ MVP Scope

* Manual provider handling
* Basic UI
* Core workflows only

---

This document serves as a source of truth for developers and AI tools (e.g., GitHub Copilot) to understand system design and generate consistent code.

<!-- 

3) Also need to add check after user pressed submit we should send request to submit if all terminal kits correct, what i mean here: 
 - id for activation should not be already in active state
- id for deletion should not be in deleted
 - any terminal kits should not be already in some of our pending states 
Later we maybe can add even more. but for lets keep this logic.
For our check we send terminal kits with possible  -->




bg - #0000
text - #EDD7BF
