# GMS Backend API — Build Tracker

Placeholder/empty files removed from repo (2026-07-15) to keep it clean. Full planned tree stays documented in the root `README.md`. This file tracks what's actually implemented, so future work can pick up step by step against the real repo state.

## ✅ Implemented — Auth (login/logout) + Role/Permission system

- `app/Models/User.php` — HasApiTokens (Sanctum), `role` fillable, `hasRole()`, `hasPermission()`
- `app/Models/Role.php` — NEW (not in original README list, added for role↔permission relation)
- `app/Models/Permission.php` — NEW (same reason)
- `app/Http/Middleware/Api/RoleCheckMiddleware.php` — `role:admin` / `role:staff,trainer,member` route guard
- `app/Http/Controllers/Api/V1/Admin/AuthController.php` — `login()`, `logout()` (role must be `admin`)
- `app/Http/Controllers/Api/V1/User/AuthController.php` — `login()`, `logout()` (role must NOT be `admin`)
- `routes/api.php` — `/api/v1/admin/login`, `/api/v1/admin/logout` (auth:sanctum,role:admin), `/api/v1/user/login`, `/api/v1/user/logout` (auth:sanctum,role:staff,trainer,member)
- `bootstrap/app.php` — registered `api` routing file + `role` middleware alias
- `database/migrations/2024_01_01_000001_create_users_table.php` — id, name, email, phone, password, `role` enum(admin,staff,trainer,member), timestamps
- `database/migrations/2024_01_01_000015_create_roles_and_permissions.php` — `roles`, `permissions`, `permission_role` pivot
- `database/migrations/2026_07_15_101807_create_personal_access_tokens_table.php` — Sanctum (auto-published)
- `database/seeders/RolesSeeder.php` — seeds 4 roles + 9 permissions, attaches per role
- `database/seeders/AdminSeeder.php` — seeds `admin@gms.test` / `password`
- `database/seeders/DatabaseSeeder.php` — calls RolesSeeder → AdminSeeder
- Package: `laravel/sanctum` installed via composer
- `.env` — DB switched to **MySQL** (`gms` database, `root`/`root` local), app key generated
- `bootstrap/app.php` — `$exceptions->shouldRenderJsonWhen(...)` added so API exceptions render as JSON instead of HTML
- `app/Providers/AppServiceProvider.php` — `Authenticate::redirectUsing(fn () => null)` so failed auth doesn't try to redirect to a non-existent `login` route (this API has none) and instead returns a clean 401 JSON

Verified: `php artisan migrate:fresh --seed` runs clean against MySQL. DB currently has only: `users`, `roles`, `permissions`, `permission_role`, `personal_access_tokens`, `cache`, `jobs` tables.

Verified over HTTP (curl, port 8123) — all passing:
- `POST /api/v1/admin/login` → 200, returns `user` + Sanctum `token`
- `POST /api/v1/admin/logout` with `Authorization: Bearer <token>` → 200, revokes token
- Reusing a revoked token → `401 {"message":"Unauthenticated."}` (was a 500 crash before the two fixes above)
- Missing token on a protected route → `401 {"message":"Unauthenticated."}`
- `POST /api/v1/user/login` with an `admin`-role account → `422 {"message":"Invalid credentials."}` (role mismatch correctly rejected)

See `postman-api-test.md` for exact request bodies and how to create roles/permissions/users via `artisan tinker` (no CRUD API for these yet).

**Not yet built:** register (public sign-up), password reset, profile endpoints, permission-based (as opposed to role-based) middleware, rate limiting on login.

## Not started (removed placeholder files — see root README.md for full planned tree)

Everything else in the original planned structure (Public/Admin/User controllers beyond auth, Requests, Resources, Models for Member/Payment/Trainer/etc., Repositories, Services, Enums, Events, Listeners, Jobs, Notifications, Policies, Exceptions, Helpers, the 30 domain migrations for branches/members/subscriptions/payments/etc., remaining seeders and factories) was scaffolded empty earlier and has now been deleted — no code or files exist for these yet. Recreate a file only when actually implementing it, following the paths laid out in the root `README.md` structure diagram.
