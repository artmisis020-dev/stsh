# Admin Flow Diagram

```mermaid
flowchart TD
    A[Start] --> B[Admin Login]
    B --> C[Admin Dashboard]

    C --> D[User Management]
    D --> E[View Pending Users]
    E --> F{Approve/Reject?}
    F -->|Approve| G[User Status: Approved]
    F -->|Reject| H[User Status: Rejected]

    C --> I[Terminal KIT Actions]
    I --> J[View Pending Actions]
    J --> K[Actions Status: Pending Admin]

    K --> L[Select Actions for Provider Request]
    L --> M[Create Provider Request]
    M --> N[Add External ID]
    N --> O[Add Comment]
    O --> P[Submit Provider Request]

    P --> Q[Actions Status: Pending Provider]
    Q --> R[Provider Request Status: Pending]

    R --> S[Receive Provider Results<br/>Manual Input]
    S --> T[Update Action Results]
    T --> U{All Actions Complete?}

    U -->|No| V[Provider Request Status: Partial Success]
    U -->|Yes| W[Provider Request Status: Completed]

    C --> X[Provider Requests Management]
    X --> Y[View All Provider Requests]
    Y --> Z[Expandable Request Details]
    Z --> AA[View Nested Terminal KIT Actions]
    AA --> BB[Mark Individual Actions<br/>Done/Rejected]

    C --> CC[History & Analytics]
    CC --> DD[View Action History]
    DD --> EE[View Terminal KIT Status]

    C --> FF[Logout]
    FF --> A

    G --> C
    H --> C
    W --> C
    V --> C
```

## Admin Journey Description

1. **Authentication**: Admins login to access admin dashboard
2. **User Management**: Approve or reject pending user registrations
3. **Action Processing**: Review pending Terminal KIT actions from clients
4. **Provider Request Creation**: Select multiple actions and create provider requests
5. **Result Processing**: Manually input provider responses and update action statuses
6. **Request Monitoring**: Track provider request progress and individual action completion

## Key Admin Responsibilities

- **User Approval**: Review and approve/reject new user registrations
- **Action Review**: Examine pending Terminal KIT actions
- **Provider Coordination**: Create and manage provider requests
- **Result Processing**: Update system with provider responses
- **Status Tracking**: Monitor completion of all actions within requests

## Admin Dashboard Sections

- **Pending Users**: User registration approvals
- **Pending Actions**: Terminal KIT actions awaiting provider requests
- **Provider Requests**: Active requests with expandable action details
- **History**: Complete audit trail of all actions and requests</content>
<parameter name="filePath">/home/artmisis/projects/starshield/docs/admin-flow.md