# Pure Laundry

Aplikasi web sistem akuntansi laundry dengan empat entitas: pelanggan, layanan, transaksi, dan pembayaran.

## Dokumentasi

- [Dokumentasi skema database dan ERD](docs/skema-erd-sistem-akuntansi-laundry.md)

## Menjalankan

- Buka `frontend/index.html` langsung di browser. Tanpa konfigurasi Supabase, aplikasi berjalan dengan data contoh yang tersimpan di browser.
- Untuk mode web server opsional, jalankan `node backend/app.js`, lalu buka `http://localhost:3000`. Tidak ada dependensi npm.
- Untuk menyambungkan database, jalankan `database/schema.sql` di Supabase SQL Editor. Di aplikasi, buka ikon pengaturan lalu isi Project URL dan publishable key.

Mode browser langsung dan server lokal sama-sama mengakses Supabase dari frontend. File `backend/app.js` hanya menyajikan frontend dan menyediakan `GET /api/health`; ia tidak menyimpan kredensial database.

**Keamanan:** skema awal mengizinkan akses CRUD anon agar demo dapat digunakan langsung dengan publishable key. Batasi tabel memakai autentikasi dan policy RLS khusus sebelum memasukkan data laundry sungguhan. Jangan pernah memasukkan service role key ke frontend.
