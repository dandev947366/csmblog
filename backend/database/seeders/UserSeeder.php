<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; // Add missing semicolon here

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seeds 100 users using the User factory
        User::factory()->count(100)->create();
    }
}
