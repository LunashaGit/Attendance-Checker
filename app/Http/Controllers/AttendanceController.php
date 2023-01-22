<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Attendance;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    
    public function schedule()
    {
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
        
    }
}
