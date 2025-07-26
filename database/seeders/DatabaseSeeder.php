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
    }
}
