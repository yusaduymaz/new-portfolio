# Security Analysis & Mitigation Plan

This document outlines the security posture of the Gemini Portfolio application, identified threats, and implemented mitigations.

## 1. Authentication & Authorization

### Threat: Unauthorized Access to Admin Panel
**Description**: Malicious users attempting to access `/admin` to modify portfolio content or read private messages.
**Mitigation**:
- **Layer 1: Edge Middleware**: `src/middleware.ts` intercepts all requests to `/admin` and redirects unauthenticated users to `/login`.
- **Layer 2: Server-Side Layout Guard**: `src/app/admin/layout.tsx` performs a secondary check using `supabase.auth.getUser()` before rendering any admin content.
- **Layer 3: Row Level Security (RLS)**: All Supabase tables have RLS enabled, ensuring only authenticated users can perform mutations (INSERT/UPDATE/DELETE).

### Threat: Public Signup & Impersonation
**Description**: If Supabase public signups are enabled, any user can create an account and gain "authenticated" status.
**Mitigation**:
- **Critical Requirement**: Public signup **MUST** be disabled in the Supabase Dashboard (Authentication -> Settings -> Allow new users to sign up).
- **Hardened Middleware**: The middleware validates the user session on the edge.

## 2. API & Server Actions

### Threat: Unauthorized Action Execution
**Description**: Directly calling Server Actions (e.g., `addProject`) without a valid session.
**Mitigation**:
- All Server Actions in `src/app/admin/**/actions.ts` perform an internal `supabase.auth.getUser()` check. If no user is found, the action returns an `Unauthorized` error.

### Threat: Database Exposure
**Description**: Leaking database credentials or allowing direct access.
**Mitigation**:
- Only the `ANON_KEY` is used on the client-side. The `SERVICE_ROLE_KEY` is never exposed.
- RLS policies ensure that even with the `ANON_KEY`, data is protected.

## 3. Frontend Security

### Threat: Cross-Site Scripting (XSS)
**Description**: Injecting malicious scripts into the page via user input.
**Mitigation**:
- **Next.js Default Protection**: React automatically escapes strings rendered in the UI.
- **No `dangerouslySetInnerHTML`**: Verified that no components use this property for unsanitized data.
- **Security Headers**: Implemented `X-XSS-Protection` and `X-Content-Type-Options: nosniff` in `next.config.mjs`.

### Threat: Clickjacking
**Description**: Embedding the site in an iframe to trick users.
**Mitigation**:
- **X-Frame-Options**: Set to `DENY` in `next.config.mjs`.

## 4. Data Privacy

### Threat: Contact Message Leak
**Description**: Unauthorized reading of visitor messages.
**Mitigation**:
- `messages` table RLS policy `Authenticated users can view messages` ensures only the logged-in admin can read the data.

## 5. Storage Security

### Threat: Unauthorized File Upload
**Description**: Flooding the storage bucket or uploading malicious files.
**Mitigation**:
- Supabase Storage policies restrict uploads to the `projects` and `avatars` buckets to authenticated users only.

---

## Recommended Next Steps

1. **Disable Public Signup**: Ensure "Allow new users to sign up" is **OFF** in Supabase settings.
2. **Rate Limiting**: Implement a rate limiter for the `sendMessage` action to prevent spam.
3. **Audit Logs**: Consider adding a table to log admin actions for traceability.
