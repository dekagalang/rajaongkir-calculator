
# RajaOngkir Calculator

Aplikasi untuk menghitung biaya pengiriman di Indonesia menggunakan API RajaOngkir. Aplikasi ini dirancang dengan antarmuka modern dan responsif menggunakan React, TypeScript, dan Tailwind CSS.

## Fitur Utama

- 🚚 **Perhitungan Biaya Pengiriman** - Hitung biaya pengiriman antar kota di Indonesia dengan berbagai jasa kurir (JNE, TIKI, POS Indonesia).
- 🔄 **Pemilihan Kota Intuitif** - Pilih provinsi terlebih dahulu, lalu kota, untuk sistem pencarian yang lebih efisien.
- 📱 **Tampilan Responsif** - Desain yang optimal di perangkat desktop maupun mobile.
- 🔐 **Fitur Autentikasi** - Daftar dan masuk untuk menyimpan riwayat perhitungan pengiriman.
- 📊 **Riwayat Pengiriman** - Lihat dan kelola riwayat perhitungan biaya pengiriman yang telah dilakukan.
- ✨ **Animasi Modern** - Antarmuka yang menarik dengan efek glass-morphism dan animasi transisi.

## Teknologi

- **React** - Library JavaScript untuk membangun antarmuka pengguna
- **TypeScript** - Superset JavaScript dengan penambahan tipe data statis
- **Tailwind CSS** - Framework CSS untuk styling yang cepat dan responsif
- **shadcn/ui** - Komponen UI yang dapat disesuaikan dengan mudah
- **Framer Motion** - Library untuk animasi yang halus dan interaktif
- **React Router** - Untuk navigasi antar halaman
- **Fetch API** - Untuk mengambil data dari API RajaOngkir

## Prasyarat

Sebelum mulai, pastikan Anda memiliki:

- [Node.js](https://nodejs.org/) (versi 18 atau lebih tinggi)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/) atau [bun](https://bun.sh/) (disarankan)

## Cara Instalasi

1. **Clone repository**

```bash
git clone <URL_REPOSITORY>
cd rajaongkir-calculator
```

2. **Install dependensi**

Dengan npm:
```bash
npm install
```

Atau dengan yarn:
```bash
yarn install
```

Atau dengan bun:
```bash
bun install
```

3. **Menjalankan aplikasi (mode development)**

Dengan npm:
```bash
npm run dev
```

Atau dengan yarn:
```bash
yarn dev
```

Atau dengan bun:
```bash
bun dev
```

4. **Buka aplikasi**

Buka browser dan akses `http://localhost:8080`

## Struktur Aplikasi

```
src/
├── components/          # Komponen reusable
│   ├── auth/            # Komponen autentikasi
│   ├── layout/          # Komponen layout (navbar, footer)
│   ├── shipping/        # Komponen untuk pengiriman
│   └── ui/              # Komponen UI dasar (button, input, dll)
├── context/             # React Context untuk state management
├── hooks/               # Custom hooks
├── pages/               # Halaman utama aplikasi
├── services/            # Service untuk API calls
└── lib/                 # Utility functions
```

## Penggunaan Aplikasi

1. **Halaman Utama**
   - Pilih kota asal (pilih provinsi terlebih dahulu, lalu kota)
   - Pilih kota tujuan (pilih provinsi terlebih dahulu, lalu kota)
   - Masukkan berat barang dalam kg
   - Pilih kurir (JNE, TIKI, POS Indonesia, atau semua)
   - Klik tombol "Hitung Biaya Pengiriman"

2. **Autentikasi**
   - Daftar dengan nama, email, dan kata sandi
   - Masuk dengan email dan kata sandi
   - Riwayat pengiriman hanya tersedia untuk pengguna yang sudah login

3. **Halaman Dashboard**
   - Lihat dan kelola riwayat perhitungan biaya pengiriman
   - Hapus riwayat yang tidak diinginkan

## Pengembangan Lanjutan

Untuk mengembangkan aplikasi lebih lanjut:

1. **Kustomisasi Komponen UI**
   - Modifikasi file di `src/components/ui`

2. **Menambahkan Fitur Baru**
   - Buat komponen baru di `src/components`
   - Tambahkan halaman baru di `src/pages`
   - Update routing di `src/App.tsx`

3. **Mengubah Styling**
   - Modifikasi kelas Tailwind di komponen
   - Sesuaikan tema di `tailwind.config.ts`
