'use strict';

const tables = {
  pelanggan: {
    label: 'Pelanggan', plural: 'Pelanggan', icon: '♙', table: 'pelanggan',
    fields: [
      { name: 'nama', label: 'Nama pelanggan', required: true, placeholder: 'Contoh: Naya Putri' },
      { name: 'telepon', label: 'Nomor telepon', required: true, placeholder: '08xxxxxxxxxx' },
      { name: 'alamat', label: 'Alamat', placeholder: 'Alamat pelanggan' }
    ],
    columns: [['nama', 'Nama pelanggan'], ['telepon', 'Telepon'], ['alamat', 'Alamat'], ['created_at', 'Terdaftar', 'date']]
  },
  layanan: {
    label: 'Layanan', plural: 'Layanan', icon: '✳', table: 'layanan',
    fields: [
      { name: 'nama', label: 'Nama layanan', required: true, placeholder: 'Contoh: Cuci reguler' },
      { name: 'harga_per_kg', label: 'Harga per kilogram (Rp)', type: 'number', min: '0', step: '500', required: true, placeholder: '7000' },
      { name: 'estimasi_hari', label: 'Estimasi pengerjaan (hari)', type: 'number', min: '1', step: '1', required: true, value: '2' },
      { name: 'aktif', label: 'Status layanan', type: 'select', options: [['true', 'Aktif'], ['false', 'Nonaktif']] }
    ],
    columns: [['nama', 'Nama layanan'], ['harga_per_kg', 'Harga / kg', 'currency'], ['estimasi_hari', 'Estimasi', 'days'], ['aktif', 'Status', 'active']]
  },
  transaksi: {
    label: 'Transaksi', plural: 'Transaksi', icon: '▤', table: 'transaksi',
    fields: [
      { name: 'pelanggan_id', label: 'Pelanggan', type: 'relation', relation: 'pelanggan', required: true },
      { name: 'layanan_id', label: 'Layanan', type: 'relation', relation: 'layanan', required: true },
      { name: 'tanggal_masuk', label: 'Tanggal masuk', type: 'date', required: true, value: () => new Date().toISOString().slice(0, 10) },
      { name: 'berat_kg', label: 'Berat (kg)', type: 'number', min: '0.01', step: '0.01', required: true, placeholder: '2.5' },
      { name: 'status', label: 'Status cucian', type: 'select', options: [['Diterima', 'Diterima'], ['Diproses', 'Diproses'], ['Siap diambil', 'Siap diambil'], ['Selesai', 'Selesai'], ['Dibatalkan', 'Dibatalkan']] },
      { name: 'catatan', label: 'Catatan', placeholder: 'Catatan tambahan' }
    ],
    columns: [['kode', 'Kode'], ['pelanggan_id', 'Pelanggan', 'customer'], ['layanan_id', 'Layanan', 'service'], ['tanggal_masuk', 'Tanggal', 'date'], ['berat_kg', 'Berat', 'weight'], ['total', 'Total', 'currency'], ['status', 'Status', 'status']]
  },
  pembayaran: {
    label: 'Pembayaran', plural: 'Pembayaran', icon: '◈', table: 'pembayaran',
    fields: [
      { name: 'transaksi_id', label: 'Transaksi', type: 'relation', relation: 'transaksi', required: true },
      { name: 'jumlah', label: 'Jumlah pembayaran (Rp)', type: 'number', min: '0', step: '500', required: true },
      { name: 'metode', label: 'Metode pembayaran', type: 'select', options: [['Tunai', 'Tunai'], ['Transfer', 'Transfer'], ['QRIS', 'QRIS'], ['Kartu', 'Kartu']] },
      { name: 'status', label: 'Status pembayaran', type: 'select', options: [['Belum lunas', 'Belum lunas'], ['Lunas', 'Lunas']] },
      { name: 'tanggal_bayar', label: 'Tanggal bayar', type: 'date' }
    ],
    columns: [['transaksi_id', 'Transaksi', 'transaction'], ['customer_name', 'Pelanggan', 'payment-customer'], ['jumlah', 'Jumlah', 'currency'], ['metode', 'Metode'], ['status', 'Status', 'payment-status'], ['tanggal_bayar', 'Tanggal bayar', 'optional-date']]
  }
};

const sampleData = {
  pelanggan: [
    { id: 'local-p-1', nama: 'Naya Putri', telepon: '0812-3456-7890', alamat: 'Jl. Melati No. 12', created_at: new Date().toISOString() },
    { id: 'local-p-2', nama: 'Raka Pratama', telepon: '0821-7788-9900', alamat: 'Jl. Kenanga No. 8', created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: 'local-p-3', nama: 'Dina Maharani', telepon: '0856-1122-3344', alamat: 'Jl. Anggrek No. 5', created_at: new Date(Date.now() - 86400000 * 4).toISOString() }
  ],
  layanan: [
    { id: 'local-l-1', nama: 'Cuci reguler', harga_per_kg: 7000, estimasi_hari: 2, aktif: true, created_at: new Date().toISOString() },
    { id: 'local-l-2', nama: 'Cuci express', harga_per_kg: 12000, estimasi_hari: 1, aktif: true, created_at: new Date().toISOString() },
    { id: 'local-l-3', nama: 'Setrika saja', harga_per_kg: 5000, estimasi_hari: 2, aktif: true, created_at: new Date().toISOString() }
  ],
  transaksi: [
    { id: 'local-t-1', kode: 'PL-26001', pelanggan_id: 'local-p-1', layanan_id: 'local-l-1', tanggal_masuk: new Date().toISOString().slice(0, 10), berat_kg: 3, total: 21000, status: 'Diproses', catatan: '', created_at: new Date().toISOString() },
    { id: 'local-t-2', kode: 'PL-26002', pelanggan_id: 'local-p-2', layanan_id: 'local-l-2', tanggal_masuk: new Date(Date.now() - 86400000).toISOString().slice(0, 10), berat_kg: 2, total: 24000, status: 'Siap diambil', catatan: '', created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 'local-t-3', kode: 'PL-26003', pelanggan_id: 'local-p-3', layanan_id: 'local-l-1', tanggal_masuk: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10), berat_kg: 4, total: 28000, status: 'Diterima', catatan: '', created_at: new Date(Date.now() - 86400000 * 2).toISOString() }
  ],
  pembayaran: [
    { id: 'local-b-1', transaksi_id: 'local-t-1', jumlah: 21000, metode: 'QRIS', status: 'Lunas', tanggal_bayar: new Date().toISOString(), created_at: new Date().toISOString() },
    { id: 'local-b-2', transaksi_id: 'local-t-2', jumlah: 24000, metode: 'Tunai', status: 'Belum lunas', tanggal_bayar: null, created_at: new Date().toISOString() },
    { id: 'local-b-3', transaksi_id: 'local-t-3', jumlah: 28000, metode: 'Transfer', status: 'Belum lunas', tanggal_bayar: null, created_at: new Date().toISOString() }
  ]
};

const storageKey = 'pure-laundry-data-v1';
const configKey = 'pure-laundry-supabase-v1';
const money = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
const main = document.querySelector('#main-content');
const recordModal = document.querySelector('#record-modal');
const settingsModal = document.querySelector('#settings-modal');
let data = loadLocalData();
let config = loadConfig();
let activePage = 'dashboard';
let searchTerm = '';
let toastTimer;

function loadLocalData() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && Object.keys(tables).every((table) => Array.isArray(saved[table]))) return saved;
  } catch { /* Use the initial demo data when browser storage is unavailable. */ }
  const initial = structuredClone(sampleData);
  saveLocalData(initial);
  return initial;
}

function saveLocalData(nextData = data) {
  try { localStorage.setItem(storageKey, JSON.stringify(nextData)); } catch { /* The app can still run for this session. */ }
}

function loadConfig() {
  try { return JSON.parse(localStorage.getItem(configKey)) || null; } catch { return null; }
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function formatMoney(value) { return money.format(Number(value) || 0); }
function formatDate(value) {
  if (!value) return '—';
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}
function customerName(id) { return data.pelanggan.find((row) => row.id === id)?.nama || 'Pelanggan dihapus'; }
function serviceName(id) { return data.layanan.find((row) => row.id === id)?.nama || 'Layanan dihapus'; }
function transactionFor(id) { return data.transaksi.find((row) => row.id === id); }
function currentRoute() {
  const route = location.hash.replace(/^#/, '').toLowerCase();
  return route === '' || route === 'dashboard' || tables[route] ? route || 'dashboard' : 'dashboard';
}
function setConnection(connected, label) {
  const pill = document.querySelector('#connection-pill');
  pill.classList.toggle('connected', connected);
  document.querySelector('#connection-label').textContent = label;
}
function showToast(message, isError = false) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.toggle('error', isError);
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
}

async function supabaseRequest(table, { method = 'GET', query = '', body } = {}) {
  const headers = {
    apikey: config.key,
    Authorization: `Bearer ${config.key}`,
    Accept: 'application/json'
  };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (method !== 'GET') headers.Prefer = 'return=representation';
  const response = await fetch(`${config.url.replace(/\/$/, '')}/rest/v1/${table}${query}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const responseBody = await response.text();
  if (!response.ok) {
    let detail = responseBody;
    try { detail = JSON.parse(responseBody).message || responseBody; } catch { /* Show the server response as-is. */ }
    throw new Error(detail || `Supabase request failed (${response.status})`);
  }
  return responseBody ? JSON.parse(responseBody) : [];
}

async function refreshData() {
  if (!config?.url || !config?.key) return;
  const results = await Promise.all(Object.entries(tables).map(async ([key, definition]) => [
    key,
    await supabaseRequest(definition.table, { query: '?select=*&order=created_at.desc' })
  ]));
  data = Object.fromEntries(results);
  saveLocalData();
}

function totalPaid() {
  return data.pembayaran.filter((payment) => payment.status === 'Lunas').reduce((sum, payment) => sum + Number(payment.jumlah || 0), 0);
}
function pendingCount() { return data.pembayaran.filter((payment) => payment.status !== 'Lunas').length; }
function orderStatusBadge(status) {
  const statusClass = status === 'Selesai' ? 'success' : status === 'Dibatalkan' ? 'neutral' : status === 'Siap diambil' ? 'warn' : '';
  return `<span class="badge ${statusClass}">${escapeHtml(status)}</span>`;
}
function paymentStatusBadge(status) {
  return `<span class="badge ${status === 'Lunas' ? 'success' : 'warn'}">${escapeHtml(status)}</span>`;
}
function recentOrderRows() {
  const rows = [...data.transaksi].sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || ''))).slice(0, 5);
  if (!rows.length) return `<tr><td colspan="5"><div class="empty-state"><strong>Belum ada transaksi</strong><span>Transaksi baru akan muncul di sini.</span></div></td></tr>`;
  return rows.map((row) => `<tr><td><span class="cell-strong">${escapeHtml(row.kode)}</span><span class="cell-sub">${escapeHtml(formatDate(row.tanggal_masuk))}</span></td><td>${escapeHtml(customerName(row.pelanggan_id))}</td><td>${escapeHtml(serviceName(row.layanan_id))}</td><td>${formatMoney(row.total)}</td><td>${orderStatusBadge(row.status)}</td></tr>`).join('');
}

function renderDashboard() {
  const today = new Date().toISOString().slice(0, 10);
  const todayOrders = data.transaksi.filter((row) => row.tanggal_masuk === today).length;
  const inProgress = data.transaksi.filter((row) => ['Diterima', 'Diproses', 'Siap diambil'].includes(row.status)).length;
  main.innerHTML = `
    <section class="page-heading"><div><p class="eyebrow">RINGKASAN HARIAN</p><h1>Ruang kendali laundry</h1><p class="page-subtitle">Semua yang perlu kamu pantau, dalam satu tarikan napas.</p></div><button class="button button-primary" type="button" data-create="transaksi"><span class="button-icon">＋</span>Transaksi baru</button></section>
    <section class="welcome-strip"><span class="welcome-basket" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M8 18h32l-3.2 23H11.2L8 18Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M15 18c.8-6.1 4.2-9 9-9s8.2 2.9 9 9M17 25c1.9 2.2 4.2 2.2 6.1 0s4.2-2.2 6.1 0 4.2 2.2 6.1 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></span><span class="welcome-copy"><strong>Pagi yang bersih dimulai di sini, Admin.</strong><span>Semoga hari ini penuh cucian wangi dan catatan yang rapi.</span></span></section>
    <section class="stats-grid" aria-label="Ringkasan usaha">
      <article class="stat-card"><span class="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 19c.7-3.4 2.9-5.2 6.5-5.2s5.8 1.8 6.5 5.2"/></svg></span><p class="stat-label">Pelanggan terdaftar</p><p class="stat-value">${data.pelanggan.length}</p><p class="stat-foot">Orang mempercayakan cucian di sini</p></article>
      <article class="stat-card"><span class="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="4.5" y="5" width="15" height="14" rx="3"/><circle cx="12" cy="12" r="4"/><path d="M8 8h.01M11 8h.01"/></svg></span><p class="stat-label">Transaksi hari ini</p><p class="stat-value">${todayOrders}</p><p class="stat-foot">${data.transaksi.length} transaksi tercatat</p></article>
      <article class="stat-card"><span class="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 8h16l-1.5 12h-13L4 8Z"/><path d="M8 8c.4-3 1.7-4.5 4-4.5S15.6 5 16 8M8 13c1.3 1.5 2.7 1.5 4 0s2.7-1.5 4 0"/></svg></span><p class="stat-label">Sedang dikerjakan</p><p class="stat-value">${inProgress}</p><p class="stat-foot">Masih dalam alur pencucian</p></article>
      <article class="stat-card"><span class="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3.5v17M16.5 7.5c-.8-1.1-2.3-1.7-4.4-1.7-2.3 0-4 1.1-4 2.8 0 4.3 8.6 1.4 8.6 5.7 0 1.8-1.7 3.1-4.4 3.1-2.1 0-3.8-.7-4.8-2"/></svg></span><p class="stat-label">Pemasukan lunas</p><p class="stat-value">${formatMoney(totalPaid())}</p><p class="stat-foot">${pendingCount()} pembayaran menunggu</p></article>
    </section>
    <section class="dashboard-grid">
      <article class="panel"><div class="panel-header"><div><h2 class="panel-title">Transaksi terbaru</h2><p class="panel-caption">Pantau perjalanan cucian pelanggan.</p></div><a class="text-link" href="#transaksi">Lihat semua →</a></div><div class="table-wrap"><table><thead><tr><th>KODE / TANGGAL</th><th>PELANGGAN</th><th>LAYANAN</th><th>TOTAL</th><th>STATUS</th></tr></thead><tbody>${recentOrderRows()}</tbody></table></div></article>
      <aside class="panel quick-panel"><div class="panel-header"><div><h2 class="panel-title">Jalan pintas</h2><p class="panel-caption">Satu langkah, beres.</p></div></div><div class="quick-list"><button class="quick-action" type="button" data-create="pelanggan"><span class="quick-icon">♙</span><span class="quick-copy"><strong>Tambah pelanggan</strong><small>Kenalan baru? Catat di sini.</small></span><span class="quick-arrow">↗</span></button><button class="quick-action" type="button" data-create="layanan"><span class="quick-icon">✳</span><span class="quick-copy"><strong>Atur layanan</strong><small>Tambah pilihan cuci.</small></span><span class="quick-arrow">↗</span></button><button class="quick-action" type="button" data-create="transaksi"><span class="quick-icon">▤</span><span class="quick-copy"><strong>Catat transaksi</strong><small>Cucian baru masuk.</small></span><span class="quick-arrow">↗</span></button><button class="quick-action" type="button" data-create="pembayaran"><span class="quick-icon">◈</span><span class="quick-copy"><strong>Catat pembayaran</strong><small>Perbarui status tagihan.</small></span><span class="quick-arrow">↗</span></button></div></aside>
    </section>`;
}

function formatCell(row, column) {
  const [key, , format] = column;
  const value = row[key];
  if (format === 'currency') return formatMoney(value);
  if (format === 'date') return formatDate(value);
  if (format === 'optional-date') return value ? formatDate(value) : '—';
  if (format === 'days') return `${escapeHtml(value)} hari`;
  if (format === 'weight') return `${escapeHtml(value)} kg`;
  if (format === 'active') return `<span class="badge ${value ? 'success' : 'neutral'}">${value ? 'Aktif' : 'Nonaktif'}</span>`;
  if (format === 'status') return orderStatusBadge(value);
  if (format === 'payment-status') return paymentStatusBadge(value);
  if (format === 'customer') return escapeHtml(customerName(value));
  if (format === 'service') return escapeHtml(serviceName(value));
  if (format === 'transaction') {
    const transaction = transactionFor(value);
    return transaction ? `<span class="cell-strong">${escapeHtml(transaction.kode)}</span>` : 'Transaksi dihapus';
  }
  if (format === 'payment-customer') {
    const transaction = transactionFor(row.transaksi_id);
    return transaction ? escapeHtml(customerName(transaction.pelanggan_id)) : '—';
  }
  return escapeHtml(value || '—');
}

function rowFor(key, row) {
  const definition = tables[key];
  const cells = definition.columns.map((column) => `<td>${formatCell(row, column)}</td>`).join('');
  return `<tr>${cells}<td><div class="row-actions"><button class="row-action" type="button" data-edit="${escapeHtml(key)}" data-id="${escapeHtml(row.id)}" aria-label="Ubah data" title="Ubah">✎</button><button class="row-action delete" type="button" data-delete="${escapeHtml(key)}" data-id="${escapeHtml(row.id)}" aria-label="Hapus data" title="Hapus">×</button></div></td></tr>`;
}

function renderMaster(key) {
  const definition = tables[key];
  let rows = [...data[key]].sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')));
  if (searchTerm) {
    const query = searchTerm.toLocaleLowerCase('id');
    rows = rows.filter((row) => Object.values(row).some((value) => String(value ?? '').toLocaleLowerCase('id').includes(query))
      || (key === 'transaksi' && `${customerName(row.pelanggan_id)} ${serviceName(row.layanan_id)}`.toLocaleLowerCase('id').includes(query))
      || (key === 'pembayaran' && `${transactionFor(row.transaksi_id)?.kode || ''} ${customerName(transactionFor(row.transaksi_id)?.pelanggan_id)}`.toLocaleLowerCase('id').includes(query)));
  }
  const empty = `<tr><td colspan="${definition.columns.length + 1}"><div class="empty-state"><span class="empty-state-icon">${definition.icon}</span><strong>${searchTerm ? 'Belum ada hasil yang cocok' : `${definition.plural} masih kosong`}</strong><span>${searchTerm ? 'Coba kata kunci yang lain.' : 'Tambahkan data pertama untuk mulai mencatat.'}</span></div></td></tr>`;
  main.innerHTML = `
    <section class="page-heading"><div><p class="eyebrow">MASTER DATA / ${escapeHtml(definition.label.toUpperCase())}</p><h1>${escapeHtml(definition.plural)}</h1><p class="page-subtitle">${masterDescription(key)}</p></div><button class="button button-primary" type="button" data-create="${key}"><span class="button-icon">＋</span>Tambah ${escapeHtml(definition.label.toLowerCase())}</button></section>
    <section class="panel table-panel"><div class="panel-header"><div><h2 class="panel-title">Daftar ${escapeHtml(definition.plural.toLowerCase())}</h2><p class="panel-caption">${rows.length} data ditemukan</p></div><div class="page-tools"><label class="search-box"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg><input type="search" id="table-search" placeholder="Cari ${escapeHtml(definition.label.toLowerCase())}..." value="${escapeHtml(searchTerm)}" aria-label="Cari ${escapeHtml(definition.label.toLowerCase())}"></label></div></div><div class="table-wrap"><table><thead><tr>${definition.columns.map((column) => `<th>${escapeHtml(column[1].toUpperCase())}</th>`).join('')}<th><span class="sr-only">AKSI</span></th></tr></thead><tbody>${rows.length ? rows.map((row) => rowFor(key, row)).join('') : empty}</tbody></table></div></section>`;
  const search = document.querySelector('#table-search');
  search.addEventListener('input', () => {
    const selectionStart = search.selectionStart;
    searchTerm = search.value;
    renderMaster(key);
    const nextSearch = document.querySelector('#table-search');
    nextSearch.focus();
    nextSearch.setSelectionRange(selectionStart, selectionStart);
  });
}

function masterDescription(key) {
  return {
    pelanggan: 'Simpan kontak pelanggan dan temukan lagi kapan saja.',
    layanan: 'Kelola pilihan perawatan, harga, dan waktu pengerjaan.',
    transaksi: 'Catat cucian masuk, layanan, dan progres pengerjaannya.',
    pembayaran: 'Pantau tagihan dan pembayaran setiap transaksi.'
  }[key];
}

function render() {
  activePage = currentRoute();
  document.querySelectorAll('.nav-link').forEach((link) => {
    const active = link.dataset.page === activePage;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  main.classList.remove('rendering');
  void main.offsetWidth;
  main.classList.add('rendering');
  if (activePage === 'dashboard') renderDashboard();
  else renderMaster(activePage);
}

function fieldMarkup(field, record) {
  let value = record?.[field.name] ?? (typeof field.value === 'function' ? field.value() : field.value ?? '');
  if (field.type === 'date' && value) value = String(value).slice(0, 10);
  let control;
  if (field.type === 'select') {
    control = `<select name="${field.name}">${field.options.map(([optionValue, label]) => `<option value="${escapeHtml(optionValue)}" ${String(value) === optionValue ? 'selected' : ''}>${escapeHtml(label)}</option>`).join('')}</select>`;
  } else if (field.type === 'relation') {
    const rows = data[field.relation].filter((row) => field.relation !== 'layanan' || row.aktif);
    const options = rows.map((row) => {
      const optionLabel = field.relation === 'pelanggan' ? `${row.nama} · ${row.telepon}` : field.relation === 'layanan' ? `${row.nama} · ${formatMoney(row.harga_per_kg)}/kg` : `${row.kode} · ${customerName(row.pelanggan_id)}`;
      return `<option value="${escapeHtml(row.id)}" ${value === row.id ? 'selected' : ''}>${escapeHtml(optionLabel)}</option>`;
    }).join('');
    control = `<select name="${field.name}" ${field.required ? 'required' : ''}><option value="">Pilih ${escapeHtml(field.label.toLowerCase())}</option>${options}</select>`;
  } else {
    control = `<input name="${field.name}" type="${field.type || 'text'}" value="${escapeHtml(value)}" placeholder="${escapeHtml(field.placeholder || '')}" ${field.required ? 'required' : ''} ${field.min !== undefined ? `min="${field.min}"` : ''} ${field.step ? `step="${field.step}"` : ''}>`;
  }
  return `<label class="field"><span>${escapeHtml(field.label)}${field.required ? ' *' : ''}</span>${control}</label>`;
}

function openRecordModal(key, record = null) {
  if (key === 'transaksi' && (!data.pelanggan.length || !data.layanan.some((service) => service.aktif))) {
    showToast('Tambahkan pelanggan dan layanan aktif sebelum membuat transaksi.', true);
    return;
  }
  if (key === 'pembayaran' && !data.transaksi.length) {
    showToast('Tambahkan transaksi sebelum mencatat pembayaran.', true);
    return;
  }
  const definition = tables[key];
  document.querySelector('#record-title').textContent = record ? `Ubah ${definition.label.toLowerCase()}` : `Tambah ${definition.label.toLowerCase()}`;
  document.querySelector('#record-eyebrow').textContent = `MASTER DATA / ${definition.label.toUpperCase()}`;
  document.querySelector('#record-fields').innerHTML = definition.fields.map((field) => fieldMarkup(field, record)).join('');
  document.querySelector('#record-fields').className = definition.fields.length > 3 ? 'form-fields form-grid' : 'form-fields';
  const form = document.querySelector('#record-form');
  form.dataset.table = key;
  form.dataset.id = record?.id || '';
  if (key === 'transaksi' && !record) {
    const formData = new FormData(form);
    const service = data.layanan.find((row) => row.id === formData.get('layanan_id'));
    if (service) document.querySelector('[name="berat_kg"]').addEventListener('input', (event) => { event.currentTarget.dataset.total = String(Number(event.currentTarget.value) * Number(service.harga_per_kg)); });
  }
  recordModal.showModal();
  if (key === 'pembayaran') syncPaymentAmount(!record);
}

function formRecord(key, formData, previous) {
  const record = {};
  for (const field of tables[key].fields) {
    if (field.name === 'tanggal_bayar') continue;
    const value = formData.get(field.name);
    if (field.name === 'aktif') record[field.name] = value === 'true';
    else if (field.type === 'number') record[field.name] = Number(value);
    else record[field.name] = String(value ?? '').trim();
  }
  if (key === 'transaksi') {
    const service = data.layanan.find((row) => row.id === record.layanan_id);
    record.total = Math.round(record.berat_kg * Number(service?.harga_per_kg || 0) * 100) / 100;
    record.kode = previous?.kode || `PL-${Date.now().toString().slice(-8)}`;
    record.status = record.status || 'Diterima';
    record.catatan = record.catatan || '';
  }
  if (key === 'pembayaran') {
    record.status = record.status || 'Belum lunas';
    const paymentDate = formData.get('tanggal_bayar');
    record.tanggal_bayar = record.status === 'Lunas'
      ? (paymentDate ? new Date(`${paymentDate}T00:00:00`).toISOString() : previous?.tanggal_bayar || new Date().toISOString())
      : null;
  }
  return record;
}

function updateLocalRecord(key, record, id) {
  const records = data[key];
  if (id) data[key] = records.map((row) => row.id === id ? { ...row, ...record } : row);
  else data[key] = [{ id: `local-${key}-${crypto.randomUUID()}`, ...record, created_at: new Date().toISOString() }, ...records];
  saveLocalData();
}

async function saveRecord(key, record, id) {
  if (key === 'transaksi' && !id) {
    const localTransaction = data.transaksi.find((item) => item.id === record.transaksi_id);
    if (localTransaction && data.pembayaran.some((item) => item.transaksi_id === record.transaksi_id)) {
      throw new Error('Pembayaran untuk transaksi ini sudah dicatat.');
    }
  }
  if (!config?.url || !config?.key) {
    updateLocalRecord(key, record, id);
    return;
  }
  if (id) await supabaseRequest(tables[key].table, { method: 'PATCH', query: `?id=eq.${encodeURIComponent(id)}`, body: record });
  else await supabaseRequest(tables[key].table, { method: 'POST', body: record });
  await refreshData();
}

async function deleteRecord(key, id) {
  if (key === 'transaksi' && data.pembayaran.some((payment) => payment.transaksi_id === id)) {
    showToast('Hapus pembayaran yang terkait lebih dahulu.', true);
    return;
  }
  if (!window.confirm(`Hapus ${tables[key].label.toLowerCase()} ini?`)) return;
  if (!config?.url || !config?.key) {
    data[key] = data[key].filter((row) => row.id !== id);
    if (key === 'transaksi') data.pembayaran = data.pembayaran.filter((row) => row.transaksi_id !== id);
    saveLocalData();
  } else {
    await supabaseRequest(tables[key].table, { method: 'DELETE', query: `?id=eq.${encodeURIComponent(id)}` });
    await refreshData();
  }
  showToast(`${tables[key].label} berhasil dihapus.`);
  render();
}

function syncPaymentAmount(setCurrentAmount = true) {
  const transactionSelect = document.querySelector('[name="transaksi_id"]');
  const amountInput = document.querySelector('[name="jumlah"]');
  if (!transactionSelect || !amountInput) return;
  transactionSelect.addEventListener('change', () => {
    const transaction = transactionFor(transactionSelect.value);
    if (transaction) amountInput.value = transaction.total;
  });
  if (setCurrentAmount && transactionFor(transactionSelect.value)) amountInput.value = transactionFor(transactionSelect.value).total;
}

function bindEvents() {
  window.addEventListener('hashchange', () => { searchTerm = ''; render(); });
  document.querySelector('#settings-button').addEventListener('click', () => {
    document.querySelector('[name="url"]').value = config?.url || '';
    document.querySelector('[name="key"]').value = config?.key || '';
    settingsModal.showModal();
  });
  document.querySelectorAll('.close-modal').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }));
  main.addEventListener('click', async (event) => {
    const createButton = event.target.closest('[data-create]');
    if (createButton) { openRecordModal(createButton.dataset.create); return; }
    const editButton = event.target.closest('[data-edit]');
    if (editButton) {
      const record = data[editButton.dataset.edit].find((row) => row.id === editButton.dataset.id);
      if (record) openRecordModal(editButton.dataset.edit, record);
      return;
    }
    const deleteButton = event.target.closest('[data-delete]');
    if (deleteButton) {
      try { await deleteRecord(deleteButton.dataset.delete, deleteButton.dataset.id); }
      catch (error) { showToast(error.message || 'Data tidak dapat dihapus.', true); }
    }
  });
  document.querySelector('#record-modal').addEventListener('close', () => { document.querySelector('#record-form').reset(); });
  document.querySelector('#record-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const key = form.dataset.table;
    const id = form.dataset.id;
    const previous = id ? data[key].find((row) => row.id === id) : null;
    const record = formRecord(key, new FormData(form), previous);
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    try {
      await saveRecord(key, record, id);
      recordModal.close();
      showToast(`${tables[key].label} berhasil ${id ? 'diperbarui' : 'ditambahkan'}.`);
      render();
    } catch (error) {
      showToast(error.message || 'Data belum berhasil disimpan.', true);
    } finally { submit.disabled = false; }
  });
  document.querySelector('#settings-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = String(formData.get('url')).trim().replace(/\/$/, '');
    const key = String(formData.get('key')).trim();
    if (!/^https:\/\/[\w.-]+\.supabase\.co$/i.test(url)) {
      showToast('Masukkan URL project Supabase yang valid.', true);
      return;
    }
    const submit = event.currentTarget.querySelector('[type="submit"]');
    submit.disabled = true;
    try {
      config = { url, key };
      await refreshData();
      localStorage.setItem(configKey, JSON.stringify(config));
      setConnection(true, 'Supabase');
      settingsModal.close();
      showToast('Supabase berhasil dihubungkan.');
      render();
    } catch (error) {
      config = loadConfig();
      if (!config) config = null;
      setConnection(false, 'Koneksi gagal');
      showToast(`Koneksi gagal: ${error.message}`, true);
    } finally { submit.disabled = false; }
  });
  document.querySelector('#footer-date').textContent = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
}

async function initialize() {
  bindEvents();
  setConnection(false, config ? 'Menghubungkan' : 'Mode lokal');
  render();
  if (config?.url && config?.key) {
    try {
      await refreshData();
      setConnection(true, 'Supabase');
      render();
    } catch (error) {
      setConnection(false, 'Koneksi gagal');
      showToast(`Supabase tidak dapat dimuat: ${error.message}`, true);
    }
  }
}

initialize();
