# WifiPribadi - Website Pendaftaran Konsumen Internet

Website modern untuk pendaftaran konsumen paket internet WifiPribadi dengan portal admin untuk mengelola data.

## 📋 Fitur Utama

### 1. **Pilihan Masuk**
   - Admin Login
   - Konsumen Registration

### 2. **Mode Konsumen**
   - Form pendaftaran lengkap:
     - Nama lengkap
     - Nomor HP
     - Alamat lengkap
     - Upload foto KTP
     - Pilihan paket:
       - Paket Keluarga: Rp 150.000/bulan
       - Paket Keluarga+Vocer: Rp 200.000/bulan
   - Validasi data otomatis
   - Real-time update ke admin dashboard

### 3. **Mode Admin**
   - Login dengan kredensial:
     - Username: `ADMIN321`
     - Password: `WIFIPRIBADI321`
   - Dashboard menampilkan semua data konsumen
   - Fitur untuk mencentang/memproses data
   - Melihat foto KTP konsumen
   - Status penunjuk (Pending/Pemrosesan)

### 4. **Design**
   - Warna merah modern (kekinian)
   - Dekorasi awan (megamendung) bergerak
   - Background batik khas Cirebon
   - Responsive design (mobile-friendly)

## 🚀 Cara Menggunakan

### Buka Website
1. Buka folder proyek: `wifipribadi`
2. Double-click file `index.html` atau buka di browser
3. Atau copy path file dan buka di browser: `file:///C:/Users/TOPAN%20RIVALDI/OneDrive/Desktop/gabut/wifipribadi/index.html`

### Untuk Konsumen
1. Klik tombol "Masuk Konsumen"
2. Isi formulir dengan data lengkap:
   - Nama lengkap
   - Nomor HP (min 10 digit)
   - Alamat lengkap
   - Upload foto KTP
   - Pilih paket
3. Klik "Daftar"
4. Data akan langsung terkirim dan terlihat di dashboard admin

### Untuk Admin
1. Klik tombol "Masuk Admin"
2. Masukkan credentials:
   - Nama: `ADMIN321`
   - Password: `WIFIPRIBADI321`
3. Klik "Masuk"
4. Di Dashboard Admin, Anda akan melihat:
   - Tabel data semua konsumen yang terdaftar
   - Tombol untuk melihat foto KTP
   - Tombol untuk mencentang/memproses data
   - Status setiap data (Pending/Pemrosesan)

## 📁 Struktur File

```
wifipribadi/
├── index.html          # File HTML utama
├── style.css           # File styling & design
├── script.js           # File JavaScript (logic)
└── assets/
    └── images/         # Folder untuk menyimpan gambar
```

## 💾 Penyimpanan Data

- Data konsumen disimpan di Local Storage browser
- Data akan tersimpan secara otomatis ketika konsumen mendaftar
- Data akan tetap ada meski browser ditutup/web direload

## 🎨 Customization

### Mengubah Warna
Edit variabel di `style.css`:
```css
:root {
    --primary-red: #c41e3a;      /* Warna merah utama */
    --dark-red: #8b0000;         /* Warna merah gelap */
    --light-red: #ff6b6b;        /* Warna merah terang */
}
```

### Mengubah Kredensial Admin
Edit nilai di `script.js`:
```javascript
const ADMIN_USERNAME = 'ADMIN321';
const ADMIN_PASSWORD = 'WIFIPRIBADI321';
```

### Mengubah Paket
Edit di bagian `<select>` dalam `index.html`:
```html
<option value="Paket Keluarga - Rp 150.000">Paket Keluarga - Rp 150.000/bulan</option>
<option value="Paket Keluarga+Vocer - Rp 200.000">Paket Keluarga+Vocer - Rp 200.000/bulan</option>
```

## ✨ Fitur Special

- ☁️ **Animasi Awan**: Awan megamendung bergerak-gerak santai
- 🎨 **Batik Cirebon**: Background dengan motif batik Cirebon
- 📱 **Responsive**: Bekerja sempurna di desktop, tablet, dan mobile
- 🔄 **Real-time Update**: Admin dashboard auto-refresh setiap 2 detik
- 🖼️ **Preview KTP**: Bisa melihat foto KTP dalam modal pop-up
- ✅ **Validasi Form**: Validasi data konsumen otomatis

## 🔐 Keamanan

⚠️ **CATATAN PENTING**: 
- Data disimpan di Local Storage browser (tidak terenkripsi)
- Password admin BUKAN production-grade
- Untuk penggunaan production, gunakan backend server yang aman

## 📝 Tips

1. **Test Data**: Untuk testing, Anda bisa gunakan nomor HP apapun (minimal 10 digit)
2. **Clear Data**: Untuk menghapus semua data, buka DevTools (F12) → Console → ketik:
   ```javascript
   localStorage.clear()
   ```
3. **Backup Data**: Data bisa di-export dari console browser jika diperlukan

## 🎯 Browser Compatibility

- Chrome ✅
- Firefox ✅
- Edge ✅
- Safari ✅
- Mobile browsers ✅

---

**Dibuat dengan ❤️ untuk WifiPribadi**
