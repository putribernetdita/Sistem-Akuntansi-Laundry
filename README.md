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

## Mengunggah ke GitHub

Pastikan **Git for Windows** sudah terpasang. Buat repository kosong di GitHub, lalu buka terminal pada folder proyek dan ganti URL remote dengan URL repository Anda:

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPOSITORY.git
git push -u origin main
```

Jika repository lokal sudah memiliki remote `origin`, gunakan `git remote set-url origin https://github.com/USERNAME/NAMA-REPOSITORY.git` sebagai pengganti perintah `git remote add`. File `.gitignore` di folder ini mengecualikan file environment lokal, dependensi, hasil build, dan file sistem operasi dari commit.
