-- Pure Laundry: ERD inti terdiri dari 4 entitas.
-- Jalankan seluruh file ini di Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.pelanggan (
  id uuid primary key default gen_random_uuid(),
  nama text not null check (length(trim(nama)) > 0),
  telepon text not null unique,
  alamat text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.layanan (
  id uuid primary key default gen_random_uuid(),
  nama text not null unique check (length(trim(nama)) > 0),
  harga_per_kg numeric(12, 2) not null check (harga_per_kg >= 0),
  estimasi_hari integer not null default 2 check (estimasi_hari > 0),
  aktif boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.transaksi (
  id uuid primary key default gen_random_uuid(),
  kode text not null unique,
  pelanggan_id uuid not null references public.pelanggan(id) on update cascade on delete restrict,
  layanan_id uuid not null references public.layanan(id) on update cascade on delete restrict,
  tanggal_masuk date not null default current_date,
  berat_kg numeric(8, 2) not null check (berat_kg > 0),
  total numeric(12, 2) not null check (total >= 0),
  status text not null default 'Diterima' check (status in ('Diterima', 'Diproses', 'Siap diambil', 'Selesai', 'Dibatalkan')),
  catatan text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.pembayaran (
  id uuid primary key default gen_random_uuid(),
  transaksi_id uuid not null unique references public.transaksi(id) on update cascade on delete cascade,
  jumlah numeric(12, 2) not null check (jumlah >= 0),
  metode text not null default 'Tunai' check (metode in ('Tunai', 'Transfer', 'QRIS', 'Kartu')),
  status text not null default 'Belum lunas' check (status in ('Belum lunas', 'Lunas')),
  tanggal_bayar timestamptz,
  created_at timestamptz not null default now(),
  check ((status = 'Belum lunas' and tanggal_bayar is null) or (status = 'Lunas' and tanggal_bayar is not null))
);

create index if not exists transaksi_pelanggan_id_idx on public.transaksi(pelanggan_id);
create index if not exists transaksi_layanan_id_idx on public.transaksi(layanan_id);
create index if not exists transaksi_tanggal_masuk_idx on public.transaksi(tanggal_masuk desc);
create index if not exists pembayaran_status_idx on public.pembayaran(status);

-- Browser menggunakan publishable key. Batasi akses lebih lanjut sebelum dipakai
-- untuk data nyata: aktifkan autentikasi dan ganti policy terbuka dengan policy per pengguna.
alter table public.pelanggan enable row level security;
alter table public.layanan enable row level security;
alter table public.transaksi enable row level security;
alter table public.pembayaran enable row level security;

drop policy if exists "Pure Laundry browser access" on public.pelanggan;
create policy "Pure Laundry browser access" on public.pelanggan for all to anon, authenticated using (true) with check (true);

drop policy if exists "Pure Laundry browser access" on public.layanan;
create policy "Pure Laundry browser access" on public.layanan for all to anon, authenticated using (true) with check (true);

drop policy if exists "Pure Laundry browser access" on public.transaksi;
create policy "Pure Laundry browser access" on public.transaksi for all to anon, authenticated using (true) with check (true);

drop policy if exists "Pure Laundry browser access" on public.pembayaran;
create policy "Pure Laundry browser access" on public.pembayaran for all to anon, authenticated using (true) with check (true);

grant select, insert, update, delete on public.pelanggan to anon, authenticated;
grant select, insert, update, delete on public.layanan to anon, authenticated;
grant select, insert, update, delete on public.transaksi to anon, authenticated;
grant select, insert, update, delete on public.pembayaran to anon, authenticated;
