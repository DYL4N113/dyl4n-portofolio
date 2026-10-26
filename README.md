# Personal Portofolio

Website portofolio pribadi yang dibangun untuk menampilkan project, skill, dan pengalaman sebagai developer.

## Fitur Utama
- Desain Modern dan Responsif: Dibangun menggunakan Tailwind CSS untuk tampilan yang bersih di semua ukuran layar.
- Interaktif: Dilengkapi dengan efek partikel kustom yang mengikuti kursor (dinonaktifkan secara otomatis di perangkat touch dan bagi pengguna yang mengaktifkan reduced-motion).
- Backend Terintegrasi: Menggunakan Supabase untuk manajemen data.
- Cepat dan Ringan: Di-bundle menggunakan Vite untuk performa loading yang optimal.

## Teknologi yang Digunakan
- Frontend: React.js dan Vite
- Styling: Tailwind CSS
- Database: Supabase
- Deployment: Vercel

## Cara Menjalankan Secara Lokal
1. Clone repository ini:
   git clone https://github.com/DYL4N113/dyl4n-portofolio.git

2. Masuk ke folder project dan install dependency:
   cd dyl4n-portofolio
   npm install

3. Buat file .env di root folder dan tambahkan kredensial Supabase:
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Jalankan server development:
   npm run dev