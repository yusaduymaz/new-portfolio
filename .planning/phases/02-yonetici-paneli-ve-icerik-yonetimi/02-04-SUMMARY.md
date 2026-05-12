---
phase: 02-yonetici-paneli-ve-icerik-yonetimi
plan: 04
subsystem: "Admin - Posts"
tags: ["CRUD", "Posts", "UI", "Server Actions"]
dependency_graph:
  requires: ["02-02"]
  provides: ["Posts List", "Posts Form", "Server Actions"]
  affects: ["Database"]
tech_stack:
  added: []
  patterns: ["Server Actions", "Supabase Client"]
key_files:
  created:
    - "src/app/admin/posts/actions.ts"
    - "src/app/admin/posts/page.tsx"
    - "src/app/admin/posts/new/page.tsx"
  modified: []
decisions:
  - "Used formData.get('published') === 'on' to check checkbox value."
metrics:
  duration: 5
  completed_date: "2024-05-24"
---

# Phase 02 Plan 04: Blog/Yazı Yönetimi (CRUD) arayüzlerinin oluşturulması.

Yönetici paneli için Blog Yazıları (Posts) listeleme, ekleme, güncelleme ve silme (Server Actions aracılığıyla) özelliklerini barındıran sayfalar oluşturuldu.

## Completed Tasks

1. **Task 1: Server Actions (Yazılar)**
   - `addPost`, `deletePost`, `updatePost` action'ları eklendi.
   - Supabase bağlantısı ve yetkilendirme `auth.getUser()` kullanılarak yapıldı.

2. **Task 2: Yazılar Listeleme ve Ekleme Arayüzü**
   - Yazı listesi (`src/app/admin/posts/page.tsx`) oluşturuldu.
   - Yeni yazı ekleme formu (`src/app/admin/posts/new/page.tsx`) oluşturuldu.

## Deviations from Plan

None - plan executed exactly as written.

## Threat Flags

None - validation and authorization are properly handled in Server Actions as per threat model.

## Known Stubs

None.
