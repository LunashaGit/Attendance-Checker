<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Attendance;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Section;
class AttendanceController extends Controller
{   
    public function index()
    {
        $users = User::where('is_coach', 0)->where('is_admin', 0)->get();
        $attendances = Attendance::where('date', now()->format('Y-m-d'))->get();
        return Inertia::render('Attendance/Index', [
            'users' => $users,
            'attendances' => $attendances,
        ]);
    }
    
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

    public function update(Request $request)
    {
        $attendance = Attendance::where('user_id', $request->user_id)->where('date', now()->format('Y-m-d'))->first();
        $attendance->update([
            'location' => $request->location,
            $request->column => $request->value,
        ]);
        return response()->json([
            'message' => 'success',
            $request->column => $request->value,
            'location' => $request->location,
        ]);
    }

    public function getByUser(Request $request)
    {
        $attendance = Attendance::where('user_id', $request->user_id)->where('date', now()->format('Y-m-d'))->first();
        return response()->json($attendance);
    }

    public function getByDate(Request $request)
    {
        $attendances = Attendance::with('user.section')
        ->whereHas('user.section', function ($query) use ($request) {
            $query->where('id', $request->section_id);
        })
        ->where('date', $request->date)
        ->get();

        return response()->json($attendances);
    }

    public function updateByDate(Request $request){
        $attendance = Attendance::where('id', $request->id)->first();

        $attendance->update([
            $request->column => $request->value,
        ]);

        return response()->json($attendance);
    }

    public function clockOut()
    {
        return Inertia::render('ClockOut/Index',[
            'sections' =>  Section::all(),
        ]);
    }

    public function beforeTodayAndWithNullInside(Request $request)
    {
        $attendance = Attendance::whereDate('date', '<', now()->format('Y-m-d'))
        ->where(function ($query) {
            $query->whereNull('beginning')
            ->orWhereNull('lunch')
            ->orWhereNull('return')
            ->orWhereNull('end');
        })
        ->where('user_id', $request->user_id)
        ->get();
        
        return response()->json($attendance);
    }
}
