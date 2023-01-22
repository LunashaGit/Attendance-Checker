<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\User;
class CreateAttendance extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:attendance';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create Attendance CRON';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Create Attendance CRON');
        $users = User::where('is_coach', 0)->where('is_admin', 0)->get();
        $attendance = DB::table('attendances');
        foreach ($users as $user) {
            $attendance->insert([
                'user_id' => $user->id,
                'date' => now()->format('Y-m-d'),
                'beginning' => null,
                'lunch' => null,
                'return' => null,
                'end' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        return Command::SUCCESS;
    }
}
