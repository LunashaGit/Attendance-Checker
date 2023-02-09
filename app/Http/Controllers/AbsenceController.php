<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Absence;
use App\Models\Attendance;
use Illuminate\Support\Str;
use Inertia\Inertia;
class AbsenceController extends Controller
{   
    public function index()
    {
        $absences = Absence::all();
        return Inertia::render('Testing/Index', ['absences' => $absences]);
    }

    public function create(Request $request)
    {
        $absence = Absence::create([
            'user_id' => $request->user_id,
            'circumstance' => $request->circumstance,
            'dateBegin' => $request->dateBegin,
            'dateEnd' => $request->dateEnd,
            'timeBegin' => $request->timeBegin,
            'timeEnd' => $request->timeEnd,
            'description' => $request->description,
        ]);
        if ($request->file('file')) {
            $uploadedFile = $request->file('file');

            if ($uploadedFile) {
            $filename = Str::uuid() . '.' . $uploadedFile->getClientOriginalExtension();
            $uploadedFile->storeAs('public/absences', $filename);
            $uploadedFile->move(public_path('images'), $filename);
            $absence->file = $filename;
            }
        } else {
            $absence->file = null;
        }

        $attendances = Attendance::where('user_id', $request->user_id)
            ->whereBetween('date', [$request->dateBegin, $request->dateEnd])
            ->get();

        foreach ($attendances as $attendance) {
            $attendance->update([
                'absence_id' => $absence->id,
            ]);
        }

        $absence->attendances = $attendances;

        $absence->save();

        return response()->json([
            'attendances' => Attendance::where('user_id', $request->user_id)->where('absence_id', null)->where('date', '<', now()->format('Y-m-d'))->get(),
        ]);
    }
    
}
