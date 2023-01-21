<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Job;
use App\Models\Section;
use App\Models\Campuse;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' => 'LunashaAdmin',
                'email' => 'lunasha@admin.dev',
                'is_admin' => true,
                'is_coach' => true,
                'password' => bcrypt(env('ADMIN_PASSWORD')),
                'email_verified_at' => now()
            ],
            [
                'name' => 'LunashaCoach',
                'email' => 'lunasha@coach.dev',
                'is_coach' => true,
                'password' => bcrypt(env('COACH_PASSWORD')),
                'email_verified_at' => now()
            ],
            [
                'name' => 'LunashaUser',
                'email' => 'lunasha@user.dev',
                'password' => bcrypt(env('USER_PASSWORD')),
                'email_verified_at' => now()
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }

        $jobs = ['WEB_DEV', 'CYBER_SEC', 'DEV_OPS', 'AI', 'SAP', 'HACK_CLUB', 'DIG_SPRINT', 'CYBER_SPRINT', 'AWS_RE/START'];
        
        foreach ($jobs as $job) {
            Job::create([
                'name' => $job
            ]);
        }

        $campuses = ['Brussels','Charleroi','Gand','Liège'];

        foreach ($campuses as $campus) {
            Campuse::create([
                'name' => $campus
            ]);
        }
        
    }
}
