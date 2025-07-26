<?php

namespace Database\Seeders;

use App\Enums\ThreadCategory;
use App\Enums\UserRole;
use App\Models\ChatGroup;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $budi = User::create([
            'name' => 'Krusiawan Budi',
            'email' => 'budi@stikom-bali.ac.id',
            'role' => UserRole::STUDENT->value,
            'password' => bcrypt('qwerty123')
        ]);

        $gusMaha = User::create([
            'name' => 'Gus Maha',
            'email' => 'gusmaha@stikom-bali.ac.id',
            'role' => UserRole::STUDENT->value,
            'password' => bcrypt('qwerty123')
        ]);

        $samya = User::create([
            'name' => 'Samya Wiryasuta',
            'email' => 'samya@stikom-bali.ac.id',
            'role' => UserRole::STUDENT->value,
            'password' => bcrypt('qwerty123')
        ]);

        $sura = User::create([
            'name' => 'Radwija Sura',
            'email' => 'sura@stikom-bali.ac.id',
            'role' => UserRole::STUDENT->value,
            'password' => bcrypt('qwerty123')
        ]);

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@stikom-bali.ac.id',
            'role' => UserRole::ADMIN->value,
            'password' => bcrypt('qwerty123')
        ]);

        $ukmProgress = User::create([
            'name' => 'UKM Progress STIKOM Bali',
            'email' => 'ukmprogress@stikom-bali.ac.id',
            'role' => UserRole::ORGANIZATION_UKM->value,
            'password' => bcrypt('qwerty123')
        ]);

        $bem = User::create([
            'name' => 'Badan Eksekutif Mahasiswa ITB STIKOM Bali',
            'email' => 'bem@stikom-bali.ac.id',
            'role' => UserRole::ORGANIZATION_UKM->value,
            'password' => bcrypt('qwerty123')
        ]);

        $chatGroup = ChatGroup::create([
            'name' => 'Chat Group 1'
        ]);

        $budi->messages()->create([
            'chat_group_id' => $chatGroup->id,
            'content' => 'Hello guys'
        ]);

        $gusMaha->messages()->create([
            'chat_group_id' => $chatGroup->id,
            'content' => 'Halo bang',
        ]);

        $samya->messages()->create([
            'chat_group_id' => $chatGroup->id,
            'content' => 'Salam kenal bang',
        ]);

        $sura->messages()->create([
            'chat_group_id' => $chatGroup->id,
            'content' => 'Yo salam kenal bang',
        ]);

        $ukmProgress->events()->create([
            'title' => 'Infinity 2025',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet dui a tellus rhoncus aliquam id pellentesque augue. Aliquam rutrum nisl nec orci volutpat, id pretium erat viverra. Donec elementum risus diam, commodo fermentum justo porttitor eget. Aliquam vulputate erat nec ligula fermentum tristique at id ligula. Duis aliquet efficitur feugiat. Sed nec porttitor mi. Nam at elementum velit.',
            'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzdYsJ8ziPntkRzGghT3EM7bN1bllhe_6cLw&s',
            'start_date' => '2025-10-17',
            'end_date' => null
        ]);

        $ukmProgress->events()->create([
            'title' => 'Infinity 2025',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet dui a tellus rhoncus aliquam id pellentesque augue. Aliquam rutrum nisl nec orci volutpat, id pretium erat viverra. Donec elementum risus diam, commodo fermentum justo porttitor eget. Aliquam vulputate erat nec ligula fermentum tristique at id ligula. Duis aliquet efficitur feugiat. Sed nec porttitor mi. Nam at elementum velit.',
            'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzdYsJ8ziPntkRzGghT3EM7bN1bllhe_6cLw&s',
            'start_date' => '2025-10-17',
            'end_date' => null
        ]);

        $bem->events()->create([
            'title' => 'Apollo 2025',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet dui a tellus rhoncus aliquam id pellentesque augue. Aliquam rutrum nisl nec orci volutpat, id pretium erat viverra. Donec elementum risus diam, commodo fermentum justo porttitor eget. Aliquam vulputate erat nec ligula fermentum tristique at id ligula. Duis aliquet efficitur feugiat. Sed nec porttitor mi. Nam at elementum velit.',
            'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzdYsJ8ziPntkRzGghT3EM7bN1bllhe_6cLw&s',
            'start_date' => '2025-08-23',
            'end_date' => null
        ]);

        $lostItemsThread = $budi->threads()->create([
            'category' => ThreadCategory::LOST_ITEMS->value,
            'title' => 'Kehilangan helm',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet dui a tellus rhoncus aliquam id pellentesque augue. Aliquam rutrum nisl nec orci volutpat, id pretium erat viverra. Donec elementum risus diam, commodo fermentum justo porttitor eget. Aliquam vulputate erat nec ligula fermentum tristique at id ligula. Duis aliquet efficitur feugiat. Sed nec porttitor mi. Nam at elementum velit.',
            'contact_name' => 'Budi',
            'phone_number' => '08123456789'
        ]);

        $studyThread = $gusMaha->threads()->create([
            'category' => ThreadCategory::STUDY->value,
            'title' => 'Cara menghitung SKKM',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet dui a tellus rhoncus aliquam id pellentesque augue. Aliquam rutrum nisl nec orci volutpat, id pretium erat viverra. Donec elementum risus diam, commodo fermentum justo porttitor eget. Aliquam vulputate erat nec ligula fermentum tristique at id ligula. Duis aliquet efficitur feugiat. Sed nec porttitor mi. Nam at elementum velit.',
            'contact_name' => null,
            'phone_number' => null
        ]);

        $samya->comments()->create([
            'thread_id' => $studyThread->id,
            'message' => 'Thanks bro'
        ]);

        $sura->comments()->create([
            'thread_id' => $studyThread->id,
            'message' => 'Nice!'
        ]);

        $studyThread1 = $sura->threads()->create([
            'category' => ThreadCategory::STUDY->value,
            'title' => 'Cara Chat Dosen Dengan Sopan',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet dui a tellus rhoncus aliquam id pellentesque augue. Aliquam rutrum nisl nec orci volutpat, id pretium erat viverra. Donec elementum risus diam, commodo fermentum justo porttitor eget. Aliquam vulputate erat nec ligula fermentum tristique at id ligula. Duis aliquet efficitur feugiat. Sed nec porttitor mi. Nam at elementum velit.',
            'contact_name' => 'sura',
            'phone_number' => '081234563864'
        ]);

        $budi->comments()->create([
            'thread_id' => $studyThread1->id,
            'message' => 'Apakah works ke semua dosen ?'
        ]);

        $studyThread2 = $gusMaha->threads()->create([
            'category' => ThreadCategory::STUDY->value,
            'title' => 'Tips Menyusun Skripsi Tepat Waktu',
            'description' => 'Skripsi bukan hal mudah, tapi bisa diselesaikan dengan konsistensi dan strategi...',
            'contact_name' => 'gusMaha',
            'phone_number' => '081234563865'
        ]);
        $samya->comments()->create([
            'thread_id' => $studyThread2->id,
            'message' => 'Saya coba mulai bikin target mingguan. Terima kasih tipsnya!'
        ]);

        $studyThread3 = $samya->threads()->create([
            'category' => ThreadCategory::STUDY->value,
            'title' => 'Cara Belajar Efektif di Perpustakaan',
            'description' => 'Belajar di perpustakaan bisa jadi sangat produktif jika tahu cara mengatur fokus...',
            'contact_name' => 'samya',
            'phone_number' => '081234563866'
        ]);
        $sura->comments()->create([
            'thread_id' => $studyThread3->id,
            'message' => 'Saya sering keperpus tapi suka ngantuk, ada tips supaya tetap fokus?'
        ]);

        $studyThread4 = $budi->threads()->create([
            'category' => ThreadCategory::STUDY->value,
            'title' => 'Mengatur Waktu Kuliah dan Organisasi',
            'description' => 'Jangan korbankan akademik demi organisasi, kuncinya adalah manajemen waktu yang baik...',
            'contact_name' => 'budi',
            'phone_number' => '081234563867'
        ]);
        $gusMaha->comments()->create([
            'thread_id' => $studyThread4->id,
            'message' => 'Setuju, saya pakai Google Calendar buat atur jadwal.'
        ]);

        $studyThread5 = $sura->threads()->create([
            'category' => ThreadCategory::STUDY->value,
            'title' => 'Teknik Membaca Cepat untuk Mahasiswa',
            'description' => 'Speed reading bisa membantu mempercepat pemahaman materi yang banyak...',
            'contact_name' => 'sura',
            'phone_number' => '081234563868'
        ]);
        $gusMaha->comments()->create([
            'thread_id' => $studyThread5->id,
            'message' => 'Ada rekomendasi buku untuk belajar teknik ini?'
        ]);

        $studyThread6 = $gusMaha->threads()->create([
            'category' => ThreadCategory::STUDY->value,
            'title' => 'Strategi Lulus Mata Kuliah Sulit',
            'description' => 'Jangan takut gagal, yang penting belajar dari pengalaman dan perbaiki strategi...',
            'contact_name' => 'gusMaha',
            'phone_number' => '081234563869'
        ]);
        $budi->comments()->create([
            'thread_id' => $studyThread6->id,
            'message' => 'Kalau saya biasanya minta catatan dari angkatan atas.'
        ]);

        $studyThread7 = $samya->threads()->create([
            'category' => ThreadCategory::STUDY->value,
            'title' => 'Manfaat Diskusi Kelompok Saat Ujian',
            'description' => 'Diskusi kelompok bisa mempercepat pemahaman konsep-konsep sulit...',
            'contact_name' => 'samya',
            'phone_number' => '081234563870'
        ]);
        $budi->comments()->create([
            'thread_id' => $studyThread7->id,
            'message' => 'Tapi kadang suka melenceng ngobrolnya, gimana biar tetap fokus?'
        ]);

        $studyThread8 = $budi->threads()->create([
            'category' => ThreadCategory::STUDY->value,
            'title' => 'Cara Efektif Buat Mind Mapping',
            'description' => 'Mind mapping membantu otak menyusun informasi dengan cara visual...',
            'contact_name' => 'budi',
            'phone_number' => '081234563871'
        ]);
        $sura->comments()->create([
            'thread_id' => $studyThread8->id,
            'message' => 'Saya pakai aplikasi XMind buat bikin mind map, lumayan banget.'
        ]);

        $studyThread9 = $sura->threads()->create([
            'category' => ThreadCategory::STUDY->value,
            'title' => 'Menghadapi Dosen Killer dengan Bijak',
            'description' => 'Pahami karakter dosen, jangan langsung takut. Komunikasi itu kunci...',
            'contact_name' => 'sura',
            'phone_number' => '081234563872'
        ]);
        $samya->comments()->create([
            'thread_id' => $studyThread9->id,
            'message' => 'Kadang grogi sih, tapi kalau sopan biasanya dosen juga enak kok.'
        ]);

        $studyThread10 = $samya->threads()->create([
            'category' => ThreadCategory::STUDY->value,
            'title' => 'Belajar dari Video vs Buku: Mana Lebih Efektif?',
            'description' => 'Setiap orang punya gaya belajar yang berbeda. Keduanya bisa saling melengkapi...',
            'contact_name' => 'samya',
            'phone_number' => '081234563873'
        ]);
        $gusMaha->comments()->create([
            'thread_id' => $studyThread10->id,
            'message' => 'Saya gabungkan dua-duanya, nonton video dulu baru baca.'
        ]);

        
    }
}
