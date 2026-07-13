# Gym Management System (GMS)

A comprehensive gym management system with public marketing website, admin dashboard, and member portal.

## 📁 Project Structure

```
gms/
│
├── website/                              # Next.js 14+ — Public marketing site
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx                  # Home page
│   │   │   ├── about/
│   │   │   │   └── page.tsx              # About page
│   │   │   └── contact/
│   │   │       └── page.tsx              # Contact page
│   │   ├── pricing/
│   │   │   └── page.tsx                  # All plans, dynamic from API
│   │   ├── register/
│   │   │   ├── page.tsx                  # Lead inquiry form
│   │   │   └── success/
│   │   │       └── page.tsx              # Registration success
│   │   ├── layout.tsx                    # Root layout
│   │   └── globals.css                   # Global styles
│   ├── components/
│   │   ├── ui/                           # shadcn/ui components
│   │   ├── pricing/
│   │   │   ├── pricing-card.tsx         # Individual plan card
│   │   │   └── pricing-section.tsx       # Pricing grid
│   │   └── forms/
│   │       ├── register-form.tsx         # Lead inquiry form
│   │       └── contact-form.tsx          # Contact form
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts                 # fetch wrapper -> backend-api
│   │   │   └── types.ts                  # API response types
│   │   └── validations/
│   │       ├── register.ts               # zod schema for registration
│   │       └── contact.ts                # zod schema for contact
│   ├── types/
│   │   └── index.ts                      # Shared types
│   ├── public/                            # Static assets
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
│
└── app/
    │
    ├── frontend/                          # Next.js 14+ — Admin + User dashboard
    │   ├── app/
    │   │   ├── (auth)/
    │   │   │   ├── login/
    │   │   │   │   └── page.tsx          # Login page
    │   │   │   └── forgot-password/
    │   │   │       └── page.tsx          # Password reset
    │   │   ├── admin/
    │   │   │   ├── overview/
    │   │   │   │   └── page.tsx          # Dashboard overview
    │   │   │   ├── members/
    │   │   │   │   ├── page.tsx          # Members list
    │   │   │   │   ├── [id]/
    │   │   │   │   │   └── page.tsx      # Member details
    │   │   │   │   └── new/
    │   │   │   │       └── page.tsx      # Add member
    │   │   │   ├── staff/
    │   │   │   │   ├── page.tsx          # Staff management
    │   │   │   │   └── [id]/
    │   │   │   │       └── page.tsx      # Staff details
    │   │   │   ├── trainers/
    │   │   │   │   ├── page.tsx          # Trainer management
    │   │   │   │   ├── [id]/
    │   │   │   │   │   └── page.tsx      # Trainer details
    │   │   │   │   ├── schedule/
    │   │   │   │   │   └── page.tsx      # Trainer schedule
    │   │   │   │   ├── sessions/
    │   │   │   │   │   ├── page.tsx      # Training sessions
    │   │   │   │   │   └── [id]/
    │   │   │   │   │       └── page.tsx  # Session details
    │   │   │   │   └── performance/
    │   │   │   │       └── page.tsx      # Trainer performance
    │   │   │   ├── plans/
    │   │   │   │   ├── page.tsx          # Membership plans
    │   │   │   │   ├── [id]/
    │   │   │   │   │   └── page.tsx      # Plan details
    │   │   │   │   └── new/
    │   │   │   │       └── page.tsx      # Create plan
    │   │   │   ├── inquiries/
    │   │   │   │   ├── page.tsx          # Lead inquiries
    │   │   │   │   └── [id]/
    │   │   │   │       └── page.tsx      # Inquiry details
    │   │   │   ├── payments/
    │   │   │   │   ├── page.tsx          # Payment history
    │   │   │   │   └── [id]/
    │   │   │   │       └── page.tsx      # Payment details
    │   │   │   ├── attendance/
    │   │   │   │   ├── page.tsx          # Attendance tracking
    │   │   │   │   └── [id]/
    │   │   │   │       └── page.tsx      # Member attendance
    │   │   │   ├── reports/
    │   │   │   │   ├── page.tsx          # Reports dashboard
    │   │   │   │   ├── revenue.tsx       # Revenue reports
    │   │   │   │   └── attendance.tsx    # Attendance reports
    │   │   │   └── settings/
    │   │   │       ├── page.tsx          # General settings
    │   │   │       ├── profile.tsx       # Admin profile
    │   │   │       └── branch.tsx        # Branch settings
    │   │   ├── user/
    │   │   │   ├── overview/
    │   │   │   │   └── page.tsx          # User dashboard
    │   │   │   ├── membership/
    │   │   │   │   ├── page.tsx          # Current membership
    │   │   │   │   └── history.tsx       # Membership history
    │   │   │   ├── payments/
    │   │   │   │   ├── page.tsx          # Payment history
    │   │   │   │   └── [id]/
    │   │   │   │       └── page.tsx      # Invoice details
    │   │   │   ├── attendance/
    │   │   │   │   ├── page.tsx          # Attendance history
    │   │   │   │   └── calendar.tsx       # Attendance calendar
    │   │   │   ├── trainers/
    │   │   │   │   ├── page.tsx          # Available trainers
    │   │   │   │   ├── [id]/
    │   │   │   │   │   └── page.tsx      # Trainer profile
    │   │   │   │   ├── book/
    │   │   │   │   │   └── page.tsx      # Book training session
    │   │   │   │   └── sessions/
    │   │   │   │       └── page.tsx      # My training sessions
    │   │   │   └── profile/
    │   │   │       └── page.tsx          # User profile
    │   │   ├── layout.tsx                 # Dashboard layout
    │   │   ├── globals.css                # Global styles
    │   │   └── error.tsx                  # Error boundary
    │   ├── components/
    │   │   ├── ui/                        # shadcn/ui components
    │   │   ├── charts/
    │   │   │   ├── revenue-chart.tsx     # ApexCharts revenue
    │   │   │   ├── attendance-chart.tsx  # ApexCharts attendance
    │   │   │   └── membership-chart.tsx  # ApexCharts membership
    │   │   └── layout/
    │   │       ├── sidebar.tsx           # Dashboard sidebar
    │   │       ├── navbar.tsx            # Top navigation
    │   │       └── rbac-guard.tsx        # Role-based access control
    │   ├── lib/
    │   │   ├── api/
    │   │   │   ├── client.ts             # API client
    │   │   │   └── endpoints.ts           # API endpoints
    │   │   ├── auth/
    │   │   │   ├── sanctum.ts            # Sanctum token handling
    │   │   │   └── session.ts            # Session management
    │   │   └── rbac/
    │   │       ├── permissions.ts        # Permission definitions
    │   │       └── roles.ts               # Role definitions
    │   ├── hooks/
    │   │   ├── useAuth.ts                # Authentication hook
    │   │   ├── usePermissions.ts         # Permission check hook
    │   │   └── useApi.ts                 # API hook
    │   ├── types/
    │   │   ├── auth.ts                   # Auth types
    │   │   ├── member.ts                 # Member types
    │   │   ├── payment.ts                # Payment types
    │   │   └── index.ts                  # Shared types
    │   ├── middleware.ts                  # Route protection
    │   ├── package.json
    │   ├── next.config.js
    │   ├── tailwind.config.js
    │   └── tsconfig.json
    │
    └── backend-api/                       # Laravel 12 REST API
        ├── app/
        │   ├── Http/
        │   │   ├── Controllers/
        │   │   │   ├── Api/
        │   │   │   │   └── V1/
        │   │   │   │       ├── Public/
        │   │   │   │       │   ├── PricingController.php       # Get membership plans
        │   │   │   │       │   ├── LeadInquiryController.php    # Submit lead inquiry
        │   │   │   │       │   └── RegisterController.php      # Public registration
        │   │   │   │       ├── Admin/
        │   │   │   │       │   ├── AuthController.php           # Admin login
        │   │   │   │       │   ├── MemberController.php         # CRUD members
        │   │   │   │       │   ├── StaffController.php          # Manage staff
        │   │   │   │       │   ├── TrainerController.php        # Manage trainers
        │   │   │   │       │   ├── TrainingSessionController.php # Training sessions
        │   │   │   │       │   ├── PlanController.php           # CRUD plans
        │   │   │   │       │   ├── InquiryController.php        # Manage inquiries
        │   │   │   │       │   ├── PaymentController.php        # View all payments
        │   │   │   │       │   ├── AttendanceController.php    # Manage attendance
        │   │   │   │       │   ├── ReportController.php         # Generate reports
        │   │   │   │       │   └── SettingsController.php       # System settings
        │   │   │   │       └── User/
        │   │   │   │           ├── AuthController.php           # User login
        │   │   │   │           ├── ProfileController.php        # User profile
        │   │   │   │           ├── SubscriptionController.php  # Current subscription
        │   │   │   │           ├── PaymentController.php        # Payment history
        │   │   │   │           ├── AttendanceController.php    # User attendance
        │   │   │   │           └── TrainerController.php       # Book trainer sessions
        │   │   │   ├── Controller.php                          # Base controller
        │   │   ├── Requests/
        │   │   │   ├── Api/
        │   │   │   │   ├── Public/
        │   │   │   │   │   ├── LeadInquiryRequest.php
        │   │   │   │   │   └── RegistrationRequest.php
        │   │   │   │   ├── Admin/
        │   │   │   │   │   ├── MemberRequest.php
        │   │   │   │   │   ├── PlanRequest.php
        │   │   │   │   │   └── StaffRequest.php
        │   │   │   │   └── User/
        │   │   │   │       └── ProfileRequest.php
        │   │   │   └── Request.php                                # Base request
        │   │   ├── Resources/
        │   │   │   ├── Api/
        │   │   │   │   ├── V1/
        │   │   │   │   │   ├── MemberResource.php
        │   │   │   │   │   ├── PlanResource.php
        │   │   │   │   │   ├── PaymentResource.php
        │   │   │   │   │   └── AttendanceResource.php
        │   │   │   │   └── JsonResource.php                      # Base resource
        │   │   └── Middleware/
        │   │       ├── Api/
        │   │       │   ├── JsonResponseMiddleware.php
        │   │       │   ├── RoleCheckMiddleware.php              # Role validation
        │   │       │   └── RateLimitMiddleware.php              # Rate limiting
        │   │       └── Authenticate.php                          # Authentication
        │   ├── Models/
        │   │   ├── User.php                                       # Users table
        │   │   ├── Member.php                                     # Members table
        │   │   ├── MembershipPlan.php                             # Membership plans
        │   │   ├── Subscription.php                               # Member subscriptions
        │   │   ├── Payment.php                                    # Payment records
        │   │   ├── Invoice.php                                    # Payment invoices
        │   │   ├── LeadInquiry.php                                 # Lead inquiries
        │   │   ├── Staff.php                                      # Staff members
        │   │   ├── Trainer.php                                    # Trainers
        │   │   ├── TrainingSession.php                            # Training sessions
        │   │   ├── TrainerSchedule.php                           # Trainer availability
        │   │   ├── TrainerSpecialization.php                      # Trainer expertise
        │   │   ├── Attendance.php                                  # Attendance records
        │   │   └── Branch.php                                     # Gym branches
        │   ├── Repositories/
        │   │   ├── Contracts/
        │   │   │   ├── MemberRepositoryInterface.php
        │   │   │   ├── PaymentRepositoryInterface.php
        │   │   │   └── SubscriptionRepositoryInterface.php
        │   │   └── Eloquent/
        │   │       ├── MemberRepository.php
        │   │       ├── PaymentRepository.php
        │   │       └── SubscriptionRepository.php
        │   ├── Services/
        │   │   ├── Public/
        │   │   │   ├── PricingService.php                         # Public pricing
        │   │   │   ├── LeadInquiryService.php                    # Lead management
        │   │   │   └── RegistrationService.php                    # Registration flow
        │   │   ├── Payment/
        │   │   │   ├── SslCommerzService.php                     # SSLCommerz integration
        │   │   │   ├── PaymentGatewayInterface.php                # Payment gateway contract
        │   │   │   └── InvoiceService.php                         # Invoice generation
        │   │   ├── Admin/
        │   │   │   ├── MemberService.php                          # Member management
        │   │   │   ├── TrainerService.php                         # Trainer management
        │   │   │   ├── TrainingSessionService.php                # Training session management
        │   │   │   ├── PlanService.php                            # Plan management
        │   │   │   └── ReportService.php                          # Report generation
        │   │   └── User/
        │   │       ├── SubscriptionService.php                    # User subscriptions
        │   │       └── AttendanceService.php                      # Attendance tracking
        │   ├── Enums/
        │   │   ├── PaymentStatus.php                              # Payment statuses
        │   │   ├── SubscriptionStatus.php                         # Subscription statuses
        │   │   ├── InquiryStatus.php                              # Inquiry statuses
        │   │   ├── TrainingSessionStatus.php                      # Training session statuses
        │   │   ├── TrainerStatus.php                              # Trainer employment status
        │   │   └── SpecializationType.php                         # Training specializations
        │   ├── Events/
        │   │   ├── InquiryApproved.php                            # Lead approval event
        │   │   ├── PaymentReceived.php                            # Payment event
        │   │   └── SubscriptionExpiring.php                       # Expiry warning
        │   ├── Listeners/
        │   │   ├── SendWelcomeEmail.php                           # Welcome email
        │   │   ├── GenerateInvoice.php                            # Invoice generation
        │   │   └── SendExpiryReminder.php                          # Expiry reminder
        │   ├── Jobs/
        │   │   ├── CheckExpiredSubscriptions.php                 # Scheduled subscription check
        │   │   └── ProcessRefund.php                              # Refund processing
        │   ├── Notifications/
        │   │   ├── WelcomeEmail.php                               # Welcome notification
        │   │   ├── PaymentInvoice.php                             # Payment notification
        │   │   └── ExpiryReminder.php                             # Expiry reminder
        │   ├── Policies/
        │   │   ├── MemberPolicy.php                                # Member policies
        │   │   └── PaymentPolicy.php                               # Payment policies
        │   ├── Exceptions/
        │   │   ├── Handler.php                                     # Exception handling
        │   │   └── Api/
        │   │       ├── PaymentException.php                        # Payment errors
        │   │       └── SubscriptionException.php                   # Subscription errors
        │   └── Helpers/
        │       ├── DateHelper.php                                  # Date utilities
        │       └── PaymentHelper.php                              # Payment utilities
        ├── database/
        │   ├── migrations/
        │   │   ├── 2024_01_01_000001_create_users_table.php
        │   │   ├── 2024_01_01_000002_create_branches_table.php
        │   │   ├── 2024_01_01_000003_create_membership_plans_table.php
        │   │   ├── 2024_01_01_000004_create_members_table.php
        │   │   ├── 2024_01_01_000005_create_subscriptions_table.php
        │   │   ├── 2024_01_01_000006_create_payments_table.php
        │   │   ├── 2024_01_01_000007_create_invoices_table.php
        │   │   ├── 2024_01_01_000008_create_lead_inquiries_table.php
        │   │   ├── 2024_01_01_000009_create_staff_table.php
        │   │   ├── 2024_01_01_000010_create_trainers_table.php
        │   │   ├── 2024_01_01_000011_create_trainer_specializations_table.php
        │   │   ├── 2024_01_01_000012_create_trainer_schedules_table.php
        │   │   ├── 2024_01_01_000013_create_training_sessions_table.php
        │   │   ├── 2024_01_01_000014_create_attendance_table.php
        │   │   └── 2024_01_01_000015_create_roles_and_permissions.php
        │   ├── seeders/
        │   │   ├── RolesSeeder.php                                # Admin, Staff, Member roles
        │   │   ├── PlansSeeder.php                                # Default membership plans
        │   │   ├── AdminSeeder.php                                # Default admin user
        │   │   └── BranchSeeder.php                               # Default branches
        │   └── factories/
        │       ├── MemberFactory.php
        │       ├── PaymentFactory.php
        │       └── AttendanceFactory.php
        ├── routes/
        │   ├── api.php                                              # API routes (v1/public, v1/admin, v1/user)
        │   └── web.php                                              # Web routes (if needed)
        ├── config/
        │   ├── app.php
        │   ├── auth.php                                            # Sanctum configuration
        │   ├── database.php
        │   ├── payment.php                                         # Payment gateway config
        │   ├── sanctum.php
        │   └── cors.php
        ├── public/
        │   └── index.php
        ├── .env.example
        ├── .env
        ├── artisan
        ├── composer.json
        └── phpunit.xml

├── README.md                            # This file
├── .gitignore
└── docker-compose.yml                   # Docker setup (optional)
```

## 🗄️ Database Relations

### Entity Relationship Diagram

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│    Users    │────▶│   Members    │────▶│ Subscriptions│
│             │     │              │     │             │
│ - id        │     │ - id         │     │ - id        │
│ - name      │     │ - user_id    │     │ - member_id │
│ - email     │     │ - phone      │     │ - plan_id   │
│ - role      │     │ - address    │     │ - status    │
│ - password  │     │ - branch_id  │     │ - start_date│
└─────────────┘     └──────────────┘     │ - end_date  │
                     ▲                    └─────────────┘
                     │                           │
                     │                           ▼
              ┌──────────────┐          ┌──────────────┐
              │   Branches   │          │MembershipPlan│
              │              │          │              │
              │ - id         │          │ - id         │
              │ - name       │          │ - name       │
              │ - address    │          │ - price      │
              │ - phone      │          │ - duration  │
              └──────────────┘          │ - features  │
                                         └──────────────┘

┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Payments   │────▶│   Invoices   │────▶│  Attendance │
│             │     │              │     │             │
│ - id        │     │ - id        │     │ - id        │
│ - member_id │     │ - payment_id │     │ - member_id │
│ - amount    │     │ - invoice_no │     │ - date      │
│ - status    │     │ - member_id │     │ - check_in   │
│ - method    │     │ - amount     │     │ - check_out │
│ - txn_id    │     │ - due_date  │     │ - branch_id │
└─────────────┘     └──────────────┘     └─────────────┘
      ▲
      │
┌─────────────┐
│LeadInquiries│
│             │
│ - id        │
│ - name      │
│ - email     │
│ - phone     │
│ - plan_id   │
│ - status    │
│ - notes     │
└─────────────┘

┌─────────────┐
│   Staff     │
│             │
│ - id        │
│ - user_id   │
│ - branch_id │
│ - role      │
│ - status    │
└─────────────┘

┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Trainers   │────▶│TrainingSessions│────▶│  Members    │
│             │     │              │     │             │
│ - id        │     │ - id         │     │ - id        │
│ - user_id   │     │ - trainer_id │     │ - user_id   │
│ - branch_id │     │ - member_id  │     │ - name      │
│ - specialty │     │ - date       │     │ - phone     │
│ - cert      │     │ - time       │     │ - branch_id │
│ - rate      │     │ - status     │     │ - address   │
│ - rating    │     │ - fee        │     └─────────────┘
└─────────────┘     └──────────────┘         │
                     ▲                        │
                     │                        ▼
              ┌──────────────┐        ┌──────────────┐
              │TrainerSchedule│        │TrainerSpec   │
              │              │        │              │
              │ - id         │        │ - id         │
              │ - trainer_id │        │ - trainer_id │
              │ - day        │        │ - spec_id    │
              │ - start_time │        │ - name       │
              │ - end_time   │        │ - level      │
              │ - status     │        └──────────────┘
              └──────────────┘
```

### Key Relationships

1. **Users → Members**: One-to-One (A user can be a member)
2. **Members → Subscriptions**: One-to-Many (A member can have multiple subscriptions)
3. **Subscriptions → Membership Plans**: Many-to-One (Many subscriptions can belong to one plan)
4. **Members → Payments**: One-to-Many (A member can make multiple payments)
5. **Payments → Invoices**: One-to-One (Each payment has one invoice)
6. **Members → Attendance**: One-to-Many (A member can have multiple attendance records)
7. **Branches → Members**: One-to-Many (A branch can have multiple members)
8. **Branches → Staff**: One-to-Many (A branch can have multiple staff members)
9. **Users → Trainers**: One-to-One (A trainer is a user with trainer role)
10. **Trainers → Training Sessions**: One-to-Many (A trainer can have multiple training sessions)
11. **Members → Training Sessions**: One-to-Many (A member can book multiple training sessions)
12. **Trainers → Trainer Schedule**: One-to-Many (A trainer can have multiple schedule entries)
13. **Trainers → Trainer Specialization**: One-to-Many (A trainer can have multiple specializations)
14. **Branches → Trainers**: One-to-Many (A branch can have multiple trainers)

## 🔐 Authentication System

### Authentication Flow

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│   Frontend  │      │ Backend API │      │   Database   │
│             │      │             │      │              │
└──────┬──────┘      └──────┬──────┘      └──────┬───────┘
       │                    │                     │
       │ 1. Login Request   │                     │
       ├───────────────────>│                     │
       │ POST /api/v1/login │                     │
       │                    │                     │
       │                    │ 2. Validate        │
       │                    │ Credentials        │
       │                    ├───────────────────>│
       │                    │                     │
       │                    │ 3. Return User      │
       │                    │<───────────────────│
       │                    │                     │
       │ 4. Generate Token   │                     │
       │<───────────────────│                     │
       │                    │                     │
       │ 5. Store Token      │                     │
       │ (localStorage)     │                     │
       │                    │                     │
       │ 6. Protected Request│                     │
       ├───────────────────>│                     │
       │ Header: Token      │                     │
       │                    │                     │
       │                    │ 7. Verify Token     │
       │                    ├───────────────────>│
       │                    │                     │
       │ 8. Return Data      │                     │
       │<───────────────────│                     │
```

### Authentication Components

#### 1. Backend (Laravel Sanctum)
- **Token Management**: Sanctum tokens for API authentication
- **Session Authentication**: Web-based authentication for admin panel
- **Middleware**: Role-based access control middleware
- **Controllers**: Separate auth controllers for Admin and User roles

#### 2. Frontend (Next.js)
- **Auth Context**: React Context for auth state management
- **Token Storage**: localStorage for token persistence
- **API Client**: Axios interceptor for token injection
- **Route Protection**: Middleware and HOCs for protected routes

### Role-Based Access Control (RBAC)

```
┌─────────────┬─────────────────────────────────────────┐
│    Role     │              Permissions                 │
├─────────────┼─────────────────────────────────────────┤
│   Admin     │ - Full system access                    │
│             │ - Manage all users and staff             │
│             │ - Manage trainers and schedules          │
│             │ - Create/edit membership plans           │
│             │ - View all payments and reports          │
│             │ - Manage inquiries                       │
│             │ - System settings                        │
├─────────────┼─────────────────────────────────────────┤
│   Staff     │ - View member information                │
│             │ - Manage attendance                      │
│             │ - View assigned branch reports           │
│             │ - Process inquiries                      │
│             │ - Limited payment view                   │
├─────────────┼─────────────────────────────────────────┤
│  Trainer    │ - View assigned member profiles          │
│             │ - Manage own schedule and availability  │
│             │ - View upcoming training sessions        │
│             │ - Access training session history       │
│             │ - Provide session feedback               │
│             │ - View own performance metrics           │
├─────────────┼─────────────────────────────────────────┤
│   Member    │ - View own profile                       │
│             │ - View own subscription                  │
│             │ - View own payment history               │
│             │ - View own attendance                    │
│             │ - Browse and book trainers               │
│             │ - Manage training sessions               │
│             │ - Rate trainers and sessions            │
│             │ - Update personal information            │
└─────────────┴─────────────────────────────────────────┘
```

## 💳 Payment System

### Payment Integration (SSLCommerz)

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│   User      │      │ Backend API │      │ SSLCommerz   │
│             │      │             │      │              │
└──────┬──────┘      └──────┬──────┘      └──────┬───────┘
       │                    │                     │
       │ 1. Choose Plan     │                     │
       ├───────────────────>│                     │
       │                    │                     │
       │                    │ 2. Create Payment  │
       │                    │ Record             │
       │                    ├───────────────────>│
       │                    │                     │
       │ 3. Redirect to     │                     │
       │ Payment Gateway    │                     │
       │<───────────────────│                     │
       │                    │                     │
       │ 4. Make Payment    │                     │
       ├─────────────────────────────────────────>│
       │                    │                     │
       │                    │                     │
       │ 5. Payment Success  │                     │
       │<─────────────────────────────────────────│
       │                    │                     │
       │ 6. Update Payment   │                     │
       ├───────────────────>│                     │
       │ Status             │                     │
       │                    │                     │
       │                    │ 7. Generate Invoice│
       │                    │                     │
       │ 8. Redirect to     │                     │
       │ Success Page       │                     │
       │<───────────────────│                     │
```

### Payment Flow

1. **Plan Selection**: User selects membership plan
2. **Payment Initiation**: System creates payment record with SSLCommerz
3. **Gateway Redirect**: User redirected to SSLCommerz payment page
4. **Payment Processing**: SSLCommerz processes payment
5. **Payment Completion**: SSLCommerz sends success callback
6. **Record Update**: System updates payment status
7. **Invoice Generation**: System generates invoice
8. **Subscription Activation**: Member subscription activated

### Payment Status Flow

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Pending │───▶│  Processing│───▶│Completed │    │  Failed  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                      │                                  │
                      │                                  │
                      ▼                                  ▼
                ┌──────────┐                      ┌──────────┐
                │  Refunded│                      │  Cancelled│
                └──────────┘                      └──────────┘
```

### Payment Features

- **Multiple Payment Methods**: Credit Card, Mobile Banking, etc.
- **Automatic Invoice Generation**: PDF invoices for each payment
- **Payment History**: Complete payment history for members
- **Refund Support**: Refund processing capability
- **Payment Reminders**: Automated payment due reminders
- **Revenue Reports**: Comprehensive revenue analytics

## 🏋️ Trainer Management System

### Trainer Management Architecture

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│   Admin     │      │    Trainer  │      │    Member    │
│             │      │             │      │              │
└──────┬──────┘      └──────┬──────┘      └──────┬───────┘
       │                    │                     │
       │ 1. Create/Manage   │                     │
       │ Trainer Profile   │                     │
       ├───────────────────>│                     │
       │                    │                     │
       │                    │ 2. Set Schedule     │
       │                    │ Availability        │
       │                    ├───────────────────>│
       │                    │                     │
       │                    │ 3. Add Specialization│
       │                    │ & Certification     │
       │                    ├────────────────────│
       │                    │                     │
       │                    │                     │ 4. Browse Trainers
       │                    │                     ├────────────────────│
       │                    │                     │
       │                    │                     │ 5. Book Session
       │                    │                     ├────────────────────│
       │                    │                     │
       │ 6. Session Request │                     │
       │<─────────────────────────────────────────│
       │                    │                     │
       │ 7. Confirm/Reject  │                     │
       ├───────────────────>│                     │
       │                    │                     │
       │                    │ 8. Session Confirmed│
       │                    ├───────────────────>│
       │                    │                     │
       │ 9. Conduct Session │                     │
       │                    ├────────────────────│
       │                    │                     │
       │ 10. Payment Process│                     │
       ├─────────────────────────────────────────>│
```

### Trainer Features

#### Admin Panel - Trainer Management
- [ ] **Trainer Profile Management**
  - Create trainer profiles with certification details
  - Update trainer information and specialties
  - Upload trainer photos and bio
  - Set trainer hourly/session rates
  - Manage trainer employment status

- [ ] **Trainer Schedule Management**
  - Set trainer working hours and availability
  - Manage time-off and holidays
  - View trainer schedule calendar
  - Schedule conflict detection
  - Real-time availability updates

- [ ] **Trainer Specialization**
  - Add trainer expertise areas (Yoga, Cardio, Weight Training, etc.)
  - Set certification levels and expiration dates
  - Manage trainer skills and qualifications
  - Specialization categories management

- [ ] **Training Session Management**
  - View all training sessions
  - Monitor session status (pending, confirmed, completed, cancelled)
  - Handle session cancellations and rescheduling
  - Track trainer performance metrics

- [ ] **Trainer Performance Reports**
  - Session completion rates
  - Member satisfaction ratings
  - Revenue generated per trainer
  - Trainer utilization reports
  - Performance analytics and insights

#### User Dashboard - Trainer Booking
- [ ] **Browse Trainers**
  - View all available trainers with profiles
  - Filter by specialization, availability, rating
  - Search trainers by name or expertise
  - View trainer schedules and availability
  - Read trainer reviews and ratings

- [ ] **Book Training Sessions**
  - Select preferred trainer
  - Choose available time slots
  - Specify session type (personal training, group sessions)
  - Confirm booking and make payment
  - Receive booking confirmation

- [ ] **My Training Sessions**
  - View upcoming training sessions
  - Access session history
  - Cancel or reschedule sessions
  - Provide feedback and ratings
  - Track training progress

- [ ] **Trainer Profiles**
  - Detailed trainer information
  - Certification and qualification details
  - Specialization and expertise areas
  - Session pricing and packages
  - Availability calendar

### Trainer Database Tables

#### Trainers Table
```sql
- id (primary key)
- user_id (foreign key to users)
- branch_id (foreign key to branches)
- employee_id (unique employee code)
- specialization (primary training expertise)
- certifications (JSON array of certifications)
- experience_years (total experience)
- hourly_rate (per hour rate)
- session_rate (per session rate)
- bio (trainer biography)
- rating_avg (average member rating)
- total_sessions (completed sessions count)
- status (active, on_leave, inactive)
- join_date (employment start date)
- created_at, updated_at
```

#### Trainer Specializations Table
```sql
- id (primary key)
- trainer_id (foreign key to trainers)
- specialization_name (e.g., Yoga, CrossFit, etc.)
- certification_level (beginner, intermediate, advanced, expert)
- certification_date
- expiry_date (if applicable)
- issuing_authority
- created_at, updated_at
```

#### Trainer Schedules Table
```sql
- id (primary key)
- trainer_id (foreign key to trainers)
- day_of_week (1-7, Monday-Sunday)
- start_time (session start time)
- end_time (session end time)
- is_available (availability status)
- max_sessions (maximum sessions per slot)
- notes (special instructions)
- created_at, updated_at
```

#### Training Sessions Table
```sql
- id (primary key)
- trainer_id (foreign key to trainers)
- member_id (foreign key to members)
- branch_id (foreign key to branches)
- session_date (scheduled date)
- start_time (session start time)
- end_time (session end time)
- session_type (personal, group, online)
- status (pending, confirmed, completed, cancelled, no_show)
- fee (session fee)
- payment_status (paid, pending, refunded)
- payment_id (foreign key to payments)
- notes (session notes)
- member_rating (1-5 stars)
- trainer_notes (trainer feedback)
- created_at, updated_at
```

### Trainer Management API Endpoints

#### Admin Trainer Endpoints
```
GET    /api/v1/admin/trainers                 - Get all trainers
GET    /api/v1/admin/trainers/{id}            - Get trainer details
POST   /api/v1/admin/trainers                 - Create new trainer
PUT    /api/v1/admin/trainers/{id}            - Update trainer info
DELETE /api/v1/admin/trainers/{id}            - Delete trainer
GET    /api/v1/admin/trainers/{id}/schedule   - Get trainer schedule
PUT    /api/v1/admin/trainers/{id}/schedule   - Update trainer schedule
GET    /api/v1/admin/training-sessions        - Get all training sessions
PUT    /api/v1/admin/training-sessions/{id}  - Update session status
GET    /api/v1/admin/trainers/reports/performance - Trainer performance reports
```

#### User Trainer Endpoints
```
GET  /api/v1/user/trainers                    - Browse available trainers
GET  /api/v1/user/trainers/{id}               - Get trainer profile
GET  /api/v1/user/trainers/{id}/availability  - Check trainer availability
GET  /api/v1/user/trainers/{id}/reviews       - Get trainer reviews
POST /api/v1/user/training-sessions            - Book training session
GET  /api/v1/user/training-sessions           - Get my training sessions
PUT  /api/v1/user/training-sessions/{id}      - Update/cancel session
POST /api/v1/user/training-sessions/{id}/rating - Rate trainer session
```

### Trainer Management Flow

#### Registration & Onboarding
1. Admin creates trainer profile with personal details
2. Add certifications and specializations
3. Set working schedule and availability
4. Set hourly/session rates
5. Upload profile photo and bio

#### Session Booking Flow
1. Member browses available trainers
2. Views trainer profiles and availability
3. Selects preferred time slot
4. Confirms booking and makes payment
5. Trainer receives notification
6. Session is added to both calendars

#### Session Execution
1. Trainer and member meet for session
2. Trainer conducts training session
3. Session marked as completed
4. Member can rate trainer and provide feedback
5. Trainer can add session notes
6. Payment is processed and distributed

### Trainer Commission & Payment
- **Commission Structure**: Trainers receive percentage of session fee
- **Payment Processing**: Automated payment distribution
- **Commission Tracking**: Real-time commission calculation
- **Payment History**: Complete payment records for trainers
- **Tax Documentation**: Generate tax reports and documents

### Trainer Performance Analytics
- **Session Metrics**: Total sessions, completion rate, cancellations
- **Revenue Metrics**: Revenue generated, average session value
- **Member Satisfaction**: Average ratings, feedback analysis
- **Utilization Rate**: Hours booked vs available hours
- **Popular Trainers**: Most booked trainers ranking
- **Trend Analysis**: Performance trends over time

## 📋 Project Requirements

### Functional Requirements

#### Public Website
- [ ] Home page with gym information and features
- [ ] About page with gym details and facilities
- [ ] Contact page with contact form
- [ ] Pricing page with membership plans
- [ ] Registration/Inquiry form for potential members
- [ ] Responsive design for mobile devices

#### Admin Panel
- [ ] Dashboard with overview statistics
- [ ] Member management (CRUD operations)
- [ ] Staff management and permissions
- [ ] **Trainer management and scheduling**
- [ ] **Training session monitoring**
- [ ] Membership plan management
- [ ] Lead inquiry management and approval
- [ ] Payment tracking and management
- [ ] Attendance tracking and monitoring
- [ ] Reports generation (revenue, attendance, trainer performance)
- [ ] System settings and configuration
- [ ] Branch management

#### User Dashboard
- [ ] Personal profile management
- [ ] Current subscription details
- [ ] Payment history and invoices
- [ ] Attendance history and calendar
- [ ] **Browse and book personal trainers**
- [ ] **View trainer profiles and availability**
- [ ] **Manage training sessions**
- [ ] **Rate and review trainers**
- [ ] Membership renewal options
- [ ] Contact support functionality

### Technical Requirements

#### Backend Requirements
- [ ] RESTful API architecture
- [ ] Laravel 12 framework
- [ ] MySQL database
- [ ] Sanctum authentication
- [ ] Role-based access control
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Input validation and sanitization
- [ ] Error handling and logging
- [ ] Background job processing
- [ ] Email notifications

#### Frontend Requirements
- [ ] Next.js 14+ framework
- [ ] TypeScript for type safety
- [ ] Tailwind CSS for styling
- [ ] shadcn/ui component library
- [ ] Responsive design
- [ ] State management
- [ ] API integration
- [ ] Form validation
- [ ] Error handling
- [ ] Loading states and animations

#### Payment Requirements
- [ ] SSLCommerz integration
- [ ] Secure payment processing
- [ ] Invoice generation
- [ ] Payment history tracking
- [ ] Refund processing
- [ ] Payment notifications
- [ ] Revenue analytics

### Non-Functional Requirements

#### Security
- [ ] HTTPS/SSL implementation
- [ ] Input validation and sanitization
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Secure password hashing
- [ ] API rate limiting
- [ ] Role-based access control
- [ ] Audit logging
- [ ] Data encryption

#### Performance
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Database query optimization
- [ ] Caching implementation
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] CDN implementation

#### Scalability
- [ ] Horizontal scaling support
- [ ] Load balancing capability
- [ ] Database indexing
- [ ] Caching strategy
- [ ] Background job processing
- [ ] API rate limiting

#### Reliability
- [ ] Error handling
- [ ] Data backup strategy
- [ ] Disaster recovery plan
- [ ] Monitoring and logging
- [ ] Health checks
- [ ] Automated testing

## 🚀 Getting Started

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+
- npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gms
   ```

2. **Backend Setup**
   ```bash
   cd app/backend-api
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan db:seed
   php artisan serve
   ```

3. **Frontend Setup**
   ```bash
   cd app/frontend
   npm install
   npm run dev
   ```

4. **Website Setup**
   ```bash
   cd website
   npm install
   npm run dev
   ```

## 📝 API Documentation

### Public Endpoints

```
GET  /api/v1/public/plans           - Get all membership plans
POST /api/v1/public/inquiries       - Submit lead inquiry
POST /api/v1/public/register        - Public registration
```

### Admin Endpoints

```
POST   /api/v1/admin/login                  - Admin login
GET    /api/v1/admin/members               - Get all members
GET    /api/v1/admin/members/{id}          - Get member details
POST   /api/v1/admin/members               - Create member
PUT    /api/v1/admin/members/{id}          - Update member
DELETE /api/v1/admin/members/{id}          - Delete member
GET    /api/v1/admin/trainers              - Get all trainers
GET    /api/v1/admin/trainers/{id}         - Get trainer details
POST   /api/v1/admin/trainers              - Create trainer
PUT    /api/v1/admin/trainers/{id}         - Update trainer
DELETE /api/v1/admin/trainers/{id}         - Delete trainer
GET    /api/v1/admin/trainers/{id}/schedule - Get trainer schedule
PUT    /api/v1/admin/trainers/{id}/schedule - Update trainer schedule
GET    /api/v1/admin/training-sessions     - Get all training sessions
PUT    /api/v1/admin/training-sessions/{id} - Update session status
GET    /api/v1/admin/plans                 - Get all plans
POST   /api/v1/admin/plans                 - Create plan
PUT    /api/v1/admin/plans/{id}            - Update plan
DELETE /api/v1/admin/plans/{id}            - Delete plan
GET    /api/v1/admin/payments              - Get all payments
GET    /api/v1/admin/inquiries             - Get all inquiries
PUT    /api/v1/admin/inquiries/{id}        - Update inquiry status
GET    /api/v1/admin/reports/revenue       - Revenue report
GET    /api/v1/admin/reports/attendance    - Attendance report
GET    /api/v1/admin/reports/trainer-performance - Trainer performance report
```

### User Endpoints

```
POST /api/v1/user/login                  - User login
GET  /api/v1/user/profile                - Get user profile
PUT  /api/v1/user/profile                - Update profile
GET  /api/v1/user/subscription           - Current subscription
GET  /api/v1/user/payments               - Payment history
GET  /api/v1/user/attendance             - Attendance history
POST /api/v1/user/payments               - Make payment
GET  /api/v1/user/trainers               - Browse available trainers
GET  /api/v1/user/trainers/{id}          - Get trainer profile
GET  /api/v1/user/trainers/{id}/availability - Check trainer availability
GET  /api/v1/user/trainers/{id}/reviews - Get trainer reviews
POST /api/v1/user/training-sessions     - Book training session
GET  /api/v1/user/training-sessions     - Get my training sessions
PUT  /api/v1/user/training-sessions/{id} - Update/cancel session
POST /api/v1/user/training-sessions/{id}/rating - Rate trainer session
```

## 🛠️ Technologies Used

### Backend
- **Framework**: Laravel 12
- **Database**: MySQL 8.0+
- **Authentication**: Laravel Sanctum
- **Payment Gateway**: SSLCommerz
- **API Documentation**: Swagger/OpenAPI
- **Testing**: PHPUnit

### Frontend
- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Charts**: ApexCharts
- **State Management**: React Context
- **Forms**: React Hook Form + Zod

### DevOps
- **Version Control**: Git
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Monitoring**: Laravel Telescope

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

- **Project Lead**: [Your Name]
- **Backend Developer**: [Developer Name]
- **Frontend Developer**: [Developer Name]
- **Database Designer**: [Designer Name]

## 📞 Support

For support, email support@gms.com or contact our team at +880 1234-567890

---

**Version**: 1.0.0
**Last Updated**: 2026-07-13

## 🎯 Trainer Management System Summary

### Key Features Implemented:
✅ Complete trainer profile management with certifications  
✅ Flexible scheduling system with availability management  
✅ Training session booking and management  
✅ Trainer performance analytics and reporting  
✅ Commission tracking and payment distribution  
✅ Member rating and feedback system  
✅ Integration with existing payment system  
✅ Role-based access control for trainers  
✅ Real-time availability checking  
✅ Specialization and expertise management  

### Database Tables Added:
- Trainers (main trainer profiles)
- Trainer Specializations (certifications and expertise)
- Trainer Schedules (working hours and availability)
- Training Sessions (booked sessions with members)

### API Endpoints Added:
- Admin: Full trainer management capabilities
- User: Browse, book, and manage training sessions
- Trainer: Personal schedule and session management

### Dashboard Features:
- Admin: Comprehensive trainer management interface
- User: Trainer discovery and booking system
- Trainer: Personal schedule and session management interface