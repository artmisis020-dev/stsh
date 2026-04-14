# ID Management System

## 📌 Overview

This project is a full-stack web application that allows clients to request activation/deactivation of IDs, and administrators to process those requests and interact with a third-party provider.

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

  * Activation IDs
  * Temporary deactivation IDs
  * Permanent deactivation IDs
  * Comment
* View own request history

### Admin

* Approve or reject users
* View pending ID actions
* Select IDs and create provider requests
* Manually input provider responses (from email)
* Track request results

---

## 🧠 Domain Model

### ID State

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

### client_requests

* id
* user_id
* comment
* created_at

### ids

* id
* value (unique)
* current_state
* created_at

### id_actions

* id
* id_id
* action_type
* status
* client_request_id
* provider_request_id (nullable)
* created_at

### provider_requests

* id
* external_id
* status
* created_at

### audit_logs

* id
* id_id
* prev_state
* new_state
* created_at

---

## 🔄 Business Rules

### Validation Rules

* Active ID cannot be activated again
* Permanently deactivated ID cannot be activated
* Temporarily deactivated ID can be activated
* Active ID can be deactivated
* ID cannot have more than one active action at a time

### Request Rules

* Client requests are immutable
* One request can contain multiple actions
* Duplicate IDs in a single request are not allowed

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
5. System validates and creates ID actions

### Admin Flow

1. Login
2. View pending actions
3. Select actions
4. Create provider request
5. Wait for email response
6. Input results
7. System updates states and logs

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

### ID Actions

* GET /id-actions/pending-admin

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

* Tracks ID state transitions
* Stores previous and next state

---

## 🚀 Future Improvements

* Redis + queue for async processing
* Automated provider integration (API/webhook)
* Retry mechanisms
* Role expansion

---

## ⚠️ Key Design Principles

1. One active action per ID at a time
2. Separate ID state from action state
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
