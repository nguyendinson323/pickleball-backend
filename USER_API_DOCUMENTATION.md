# User API Documentation

## User Registration by Type

### Player Registration
**Endpoint:** `POST /api/auth/register`
**User Type:** `player`

**Required Fields:**
```json
{
  "username": "string (3-50 chars, alphanumeric + underscore)",
  "email": "string (valid email format)",
  "password": "string (min 6 chars)",
  "full_name": "string (max 200 chars)",
  "user_type": "player"
}
```

**Optional Fields:**
```json
{
  "date_of_birth": "YYYY-MM-DD",
  "gender": "male|female|other|prefer_not_to_say",
  "phone": "string (max 20 chars)",
  "profile_photo": "string (max 500 chars)",
  "bio": "text",
  "skill_level": "2.5|3.0|3.5|4.0|4.5|5.0|5.5",
  "state": "string (max 100 chars)",
  "city": "string (max 100 chars)",
  "address": "text",
  "latitude": "decimal (10,8)",
  "longitude": "decimal (11,8)",
  "timezone": "string (max 50 chars)",
  "curp": "string (exactly 18 chars)"
}
```

---

### Coach Registration
**Endpoint:** `POST /api/auth/register`
**User Type:** `coach`

**Required Fields:**
```json
{
  "username": "string (3-50 chars, alphanumeric + underscore)",
  "email": "string (valid email format)",
  "password": "string (min 6 chars)",
  "full_name": "string (max 200 chars)",
  "user_type": "coach"
}
```

**Optional Fields:**
```json
{
  "date_of_birth": "YYYY-MM-DD",
  "gender": "male|female|other|prefer_not_to_say",
  "phone": "string (max 20 chars)",
  "profile_photo": "string (max 500 chars)",
  "bio": "text",
  "skill_level": "2.5|3.0|3.5|4.0|4.5|5.0|5.5",
  "state": "string (max 100 chars)",
  "city": "string (max 100 chars)",
  "address": "text",
  "latitude": "decimal (10,8)",
  "longitude": "decimal (11,8)",
  "timezone": "string (max 50 chars)",
  "curp": "string (exactly 18 chars)",
  "website": "string (max 255 chars)"
}
```

---

### Club Registration
**Endpoint:** `POST /api/auth/register`
**User Type:** `club`

**Required Fields:**
```json
{
  "username": "string (3-50 chars, alphanumeric + underscore)",
  "email": "string (valid email format)",
  "password": "string (min 6 chars)",
  "business_name": "string (max 200 chars)",
  "user_type": "club"
}
```

**Optional Fields:**
```json
{
  "phone": "string (max 20 chars)",
  "profile_photo": "string (max 500 chars)",
  "bio": "text",
  "contact_person": "string (max 200 chars)",
  "job_title": "string (max 100 chars)",
  "state": "string (max 100 chars)",
  "city": "string (max 100 chars)",
  "address": "text",
  "latitude": "decimal (10,8)",
  "longitude": "decimal (11,8)",
  "timezone": "string (max 50 chars)",
  "rfc": "string (max 13 chars)",
  "website": "string (max 255 chars)"
}
```

---

### Partner Registration
**Endpoint:** `POST /api/auth/register`
**User Type:** `partner`

**Required Fields:**
```json
{
  "username": "string (3-50 chars, alphanumeric + underscore)",
  "email": "string (valid email format)",
  "password": "string (min 6 chars)",
  "business_name": "string (max 200 chars)",
  "user_type": "partner"
}
```

**Optional Fields:**
```json
{
  "phone": "string (max 20 chars)",
  "profile_photo": "string (max 500 chars)",
  "bio": "text",
  "contact_person": "string (max 200 chars)",
  "job_title": "string (max 100 chars)",
  "state": "string (max 100 chars)",
  "city": "string (max 100 chars)",
  "address": "text",
  "latitude": "decimal (10,8)",
  "longitude": "decimal (11,8)",
  "timezone": "string (max 50 chars)",
  "rfc": "string (max 13 chars)",
  "website": "string (max 255 chars)"
}
```

---

### Admin Registration
**Endpoint:** `POST /api/auth/register`
**User Type:** `admin`

**Required Fields:**
```json
{
  "username": "string (3-50 chars, alphanumeric + underscore)",
  "email": "string (valid email format)",
  "password": "string (min 6 chars)",
  "full_name": "string (max 200 chars)",
  "user_type": "admin"
}
```

**Optional Fields:**
```json
{
  "date_of_birth": "YYYY-MM-DD",
  "gender": "male|female|other|prefer_not_to_say",
  "phone": "string (max 20 chars)",
  "profile_photo": "string (max 500 chars)",
  "bio": "text",
  "state": "string (max 100 chars)",
  "city": "string (max 100 chars)",
  "address": "text",
  "latitude": "decimal (10,8)",
  "longitude": "decimal (11,8)",
  "timezone": "string (max 50 chars)",
  "curp": "string (exactly 18 chars)"
}
```

---

### Super Admin Registration
**Endpoint:** `POST /api/auth/register`
**User Type:** `super_admin`

**Required Fields:**
```json
{
  "username": "string (3-50 chars, alphanumeric + underscore)",
  "email": "string (valid email format)",
  "password": "string (min 6 chars)",
  "full_name": "string (max 200 chars)",
  "user_type": "super_admin"
}
```

**Optional Fields:**
```json
{
  "date_of_birth": "YYYY-MM-DD",
  "gender": "male|female|other|prefer_not_to_say",
  "phone": "string (max 20 chars)",
  "profile_photo": "string (max 500 chars)",
  "bio": "text",
  "state": "string (max 100 chars)",
  "city": "string (max 100 chars)",
  "address": "text",
  "latitude": "decimal (10,8)",
  "longitude": "decimal (11,8)",
  "timezone": "string (max 50 chars)",
  "curp": "string (exactly 18 chars)"
}
```

---

## Common Response Format

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "full_name": "string",
    "user_type": "string",
    "email_verified": false,
    "is_active": true,
    "created_at": "datetime"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "username",
      "message": "Username is required"
    }
  ]
}
```

---

## Field Validation Rules

- **username**: 3-50 characters, alphanumeric + underscore only
- **email**: Valid email format, unique
- **password**: Minimum 6 characters
- **full_name**: Maximum 200 characters
- **business_name**: Maximum 200 characters (for clubs/partners)
- **phone**: Maximum 20 characters
- **profile_photo**: Maximum 500 characters
- **bio**: Text field
- **curp**: Exactly 18 characters (Mexican population registry)
- **rfc**: Maximum 13 characters (Mexican tax ID)
- **website**: Maximum 255 characters
- **skill_level**: Must be one of: 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5
- **gender**: Must be one of: male, female, other, prefer_not_to_say
- **latitude**: Decimal with 10 digits total, 8 decimal places
- **longitude**: Decimal with 11 digits total, 8 decimal places
- **timezone**: Maximum 50 characters 