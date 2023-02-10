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

        $sections = [
            [
                'name' => 'Hamilton6',
                'campus_id' => 4,
                'job_id' => 1,
                'date_start_courses' => '2023-02-24',
                'date_end_courses' => '2023-07-31',
                'date_start_holiday1' => '2023-04-17',
                'date_end_holiday1' => '2023-04-21',
                'date_start_holiday2' => '2023-06-26',
                'date_end_holiday2' => '2023-06-30',
                'date_start_intership' => '2023-08-01',
                'date_end_intership' => '2023-11-01'
            ],
            [
                'name' => 'Hamilton7',
                'campus_id' => 4,
                'job_id' => 1,
                'date_start_courses' => '2023-02-24',
                'date_end_courses' => '2023-07-31',
                'date_start_holiday1' => '2023-04-17',
                'date_end_holiday1' => '2023-04-21',
                'date_start_holiday2' => '2023-06-26',
                'date_end_holiday2' => '2023-06-30',
                'date_start_intership' => '2023-08-01',
                'date_end_intership' => '2023-11-01'
            ],
        ];

        foreach ($sections as $section) {
            Section::create($section);
        }

        $users = [
            [
                'first_name' => 'Lunasha',
                'last_name' => 'Admin',
                'github_id' => '93606228',
                'section_id' => 1,
                'email' => 'lunasha@admin.dev',
                'is_admin' => true,
                'is_coach' => true,
                'password' => bcrypt(env('ADMIN_PASSWORD')),
                'email_verified_at' => now()
            ],
            [
                'first_name' => 'Lunasha',
                'last_name' => 'Coach',
                'github_id' => '93606228',
                'section_id' => 1,
                'email' => 'lunasha@coach.dev',
                'is_coach' => true,
                'password' => bcrypt(env('COACH_PASSWORD')),
                'email_verified_at' => now()
            ],
            [
                'first_name' => 'Lunasha',
                'last_name' => 'User',
                'github_id' => '93606228',
                'section_id' => 1,
                'email' => 'lunasha@user.dev',
                'password' => bcrypt(env('USER_PASSWORD')),
                'email_verified_at' => now()
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
                
        
    }
}
