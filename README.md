# Diary App (Praktikum 08 - React Redux Toolkit)

Aplikasi Diary App menggunakan React Native, Expo Router, dan Redux Toolkit untuk pengelolaan global state.

## Perbedaan Local State, Global Redux State, dan Persistent Database

| Aspek | Local State (`useState`) | Global Redux State (Redux Toolkit) | Persistent Database (MySQL / SQLite / API) |
| :--- | :--- | :--- | :--- |
| **Cakupan Data** | Hanya di dalam satu komponen/screen tertentu. | Dapat diakses dan diubah oleh banyak screen sekaligus (terpusat di Store). | Tersimpan di server atau penyimpanan permanen perangkat, dapat diakses lintas sesi/perangkat. |
| **Ketahanan Data** | Hilang saat komponen di-*unmount* atau pindah screen. | Berada di memori (RAM) aplikasi; hilang dan kembali ke `initialState` saat aplikasi direstart/reload. | Permanen; data tetap tersimpan meskipun aplikasi ditutup atau perangkat dimatikan. |
| **Contoh pada Diary App** | Nilai input `title`, `body`, `mood` pada form Create/Edit, serta pilihan filter mood di Home. | Daftar `entries` diary, status `liked` (favorite), serta aksi tambah, edit, hapus, dan clear favorite. | Penyimpanan permanen seluruh catatan diary pengguna melalui REST API dan database server. |

## Fitur Tugas Praktikum yang Diterapkan
1. Reducer `editDiary` untuk memperbarui `title`, `body`, `preview`, dan `mood`.
2. Halaman `app/edit/[id].tsx` untuk mengubah data diary melalui Redux Store.
3. Filter mood pada halaman Home.
4. Statistik **Total Diary** dan **Total Favorite** di halaman Home.
5. Reducer `clearAllFavorites` beserta tombol untuk membersihkan semua favorite.
6. Validasi input `title` minimal 3 karakter pada Create dan Edit.
7. Empty state yang informatif pada halaman Home dan Favorites.