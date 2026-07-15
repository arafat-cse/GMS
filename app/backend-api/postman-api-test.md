# Postman API Test Guide — Auth (Login/Logout) + Role/Permission

## 0. Server start

```bash
cd app/backend-api
php artisan serve
```

Base URL: `http://127.0.0.1:8000`

## 1. Login

### Admin login
```
POST http://127.0.0.1:8000/api/v1/admin/login
Content-Type: application/json

{
  "email": "admin@gms.test",
  "password": "password"
}
```
(default seeded admin — created by `database/seeders/AdminSeeder.php`)

### User login (staff / trainer / member)
```
POST http://127.0.0.1:8000/api/v1/user/login
Content-Type: application/json

{
  "email": "<user email>",
  "password": "<user password>"
}
```

### Response (both)
```json
{
  "user": { "id": 1, "name": "Super Admin", "email": "admin@gms.test", "role": "admin", ... },
  "token": "1|abcdEFGH1234..."
}
```
`token` — eita Sanctum plain-text token, protected route hit korte lagbe.

## 2. Token diye protected route call

Postman e:
- **Authorization** tab → Type: **Bearer Token** → paste `token` value
- OR manually header: `Authorization: Bearer 1|abcdEFGH1234...`

### Logout
```
POST http://127.0.0.1:8000/api/v1/admin/logout      (admin token diye)
POST http://127.0.0.1:8000/api/v1/user/logout       (user token diye)
Authorization: Bearer <token>
```
Response: `{"message": "Logged out"}` — token DB theke revoke hoye jabe, abar use korle 401.

## 3. Role create korar niyom (ekhono kono API endpoint nai — `php artisan tinker` diye)

```bash
php artisan tinker
```
```php
App\Models\Role::create(['name' => 'branch_manager']);
```
Existing roles (seeded): `admin`, `staff`, `trainer`, `member` — `database/seeders/RolesSeeder.php` e.

## 4. Permission create + role ke assign

```php
$permission = App\Models\Permission::create(['name' => 'manage-branch']);

$role = App\Models\Role::where('name', 'branch_manager')->first();
$role->permissions()->attach($permission->id);

// ekbar e shob set (replace) korte chaile:
$role->permissions()->sync([$permission->id]);
```

Existing permissions (seeded): `manage-members`, `manage-staff`, `manage-trainers`, `manage-plans`, `view-payments`, `manage-payments`, `manage-settings`, `view-own-profile`, `manage-own-profile`.

## 5. Notun user create kore role dewa (test login korar jonno)

```php
App\Models\User::create([
    'name' => 'Test Member',
    'email' => 'member@gms.test',
    'password' => bcrypt('password'),
    'role' => 'member', // admin | staff | trainer | member
]);
```

## 6. Code theke permission check korar niyom

```php
$user->hasRole('admin');                 // bool
$user->hasRole('staff', 'trainer');       // multiple role check, jekono ekta match korle true
$user->hasPermission('manage-members');   // role -> permission table check kore
```

## Notes

- Role/permission manage korar jonno kono Admin UI/API endpoint akhono nai — sob `tinker` diye. Future e `Admin/SettingsController` type controller banaile UI theke role/permission CRUD add kora jabe.
- `admin` role diye `/user/login` e login hobe na (blocked), `admin` chara onno role diye `/admin/login` e login hobe na.
