
# RajaOngkir Calculator

Aplikasi untuk menghitung biaya pengiriman di Indonesia menggunakan API RajaOngkir. Aplikasi ini dirancang dengan antarmuka modern dan responsif menggunakan React, TypeScript, dan Tailwind CSS.

## Fitur Utama

- 🚚 **Perhitungan Biaya Pengiriman** - Hitung biaya pengiriman antar kota di Indonesia dengan berbagai jasa kurir (JNE, TIKI, POS Indonesia).
- 🔄 **Pemilihan Kota Intuitif** - Pilih provinsi terlebih dahulu, lalu kota, untuk sistem pencarian yang lebih efisien.
- 📱 **Tampilan Responsif** - Desain yang optimal di perangkat desktop maupun mobile.
- 🔐 **Fitur Autentikasi** - Daftar dan masuk untuk menyimpan riwayat perhitungan pengiriman.
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
git clone git@github.com:dekagalang/rajaongkir-calculator.git
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
│   ├── layout/          # Komponen layout
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
   - Halaman dashboard hanya tersedia untuk pengguna yang sudah login

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

## Hasil Aplikasi

Aplikasi **RajaOngkir Calculator** telah berhasil diimplementasikan dengan desain modern dan fitur yang lengkap. Aplikasi ini memungkinkan pengguna untuk:

- Menghitung biaya pengiriman antar kota di Indonesia menggunakan berbagai layanan kurir populer.  
- Memilih lokasi asal dan tujuan dengan antarmuka yang intuitif.  
- Mendaftar dan masuk untuk pengalaman yang lebih personal.  
- Mengelola dan melihat informasi akun pengguna.  

---

### **Implementasi Kriteria**  

#### **a. Fetch Data dari External API**  
Aplikasi ini menggunakan API **RajaOngkir** untuk mendapatkan data secara real-time. Implementasinya dapat dilihat pada:  

```typescript
// Contoh dari rajaOngkir.ts
export const fetchProvinces = async (): Promise<Province[]> => {
  try {
    const response = await fetch(PROVINCE_API_URL);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.rajaongkir.results;
  } catch (error) {
    console.error("Failed to fetch provinces:", error);
    return [];
  }
};
```

---

#### **b. Implementasi Konsep React**  

##### **1. Conditional Rendering**  
Aplikasi menerapkan conditional rendering untuk menampilkan komponen secara dinamis berdasarkan state:  

```tsx
// Contoh conditional rendering pada pemilihan kota
{selectedProvinceId && (
  <motion.div className="space-y-1">
    <Label className="text-xs text-muted-foreground">Kota</Label>
    <Select value={value?.city_id || ""} onValueChange={handleCityChange}>
      {/* City options */}
    </Select>
  </motion.div>
)}

// Contoh conditional rendering untuk loading state
{isLoading ? (
  <div className="animate-spin h-8 w-8 border-4 border-primary"></div>
) : (
  <div>{content}</div>
)}
```

##### **2. Reusable Component**  
Aplikasi dibangun dengan komponen yang dapat digunakan kembali, misalnya:  

```tsx
// GlassCard component yang digunakan di berbagai tempat
<GlassCard className="w-full">
  <h3 className="text-lg font-medium mb-6">Informasi Akun</h3>
  {/* Content */}
</GlassCard>

// CitySelector component untuk memilih kota asal dan tujuan
<CitySelector label="Asal" value={originCity} onChange={setOriginCity} />
<CitySelector label="Tujuan" value={destinationCity} onChange={setDestinationCity} />
```

##### **3. Reactivity**  
Reactivity diimplementasikan dengan React Hooks dan state management:  

```tsx
// State management dengan useState
const [weight, setWeight] = useState<number>(1);
const [courier, setCourier] = useState<string>("jne");

// useEffect untuk reactivity
useEffect(() => {
  if (!selectedProvinceId) return;
  
  const getCities = async () => {
    setIsLoading(true);
    const data = await fetchCities(selectedProvinceId);
    setCities(data);
    setIsLoading(false);
  };
  
  getCities();
}, [selectedProvinceId]);
```

##### **4. Routing (Auth)**  
Autentikasi dan routing diimplementasikan dengan React Router dan Context API:  

```tsx
// Protected route pada Dashboard
if (!isLoading && !isAuthenticated) {
  return <Navigate to="/sign-in" />;
}

// Auth context untuk manajemen state otentikasi
const { isAuthenticated, logout } = useAuth();
```

---

#### **c. Penggunaan ESLint**  
ESLint dikonfigurasi dengan aturan TypeScript dan React untuk memastikan kode yang bersih dan konsisten.  

---

#### **d. Penggunaan CSS**  
Styling diimplementasikan dengan Tailwind CSS, meliputi:  

```tsx
// Contoh penggunaan Tailwind dan animasi
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="mb-12"
>
  <h1 className="text-3xl font-bold mb-2">Selamat datang, {user?.name}</h1>
</motion.div>
```

```tsx
// Design sistem yang konsisten
<div className="p-4 bg-secondary/20 rounded-lg">
  <p className="text-sm text-gray-500 mb-1">Nama</p>
  <p className="font-medium text-lg">{user?.name}</p>
</div>
```

---

#### **e. Penggunaan ReactJS**  
Aplikasi dibangun dengan React 18, mengimplementasikan:  

- **Functional components**  
- **React Hooks** (`useState`, `useEffect`, `useContext`)  
- **Context API** untuk state management global  

---

#### **f. Penggunaan TypeScript**  
TypeScript digunakan untuk type safety di seluruh aplikasi:  

```typescript
// Interface untuk data
export interface City {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}

// Type safety pada props komponen
interface CitySelectorProps {
  label: string;
  value: City | null;
  onChange: (city: City) => void;
}
```