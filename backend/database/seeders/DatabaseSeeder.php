<?php

namespace Database\Seeders;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Dan Le',
        //     'email' => 'dan@gmail.com',
        //     // 'password' => Hash::make('password'),
        //     'password' => "123234546",
        //     'address' => "Helsinki, Finland",
        //     'phone' => "123234546"
        // ]);
        $this->call([
            UserSeeder::class
        ]);
    }
}
