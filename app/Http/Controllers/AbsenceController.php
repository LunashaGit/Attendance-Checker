<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Absence;
use App\Models\Attendance;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\Section;
class AbsenceController extends Controller
{   
    public function index(Request $request)
    {   
        if ($request->is('api/*')) {
            $absences = Absence::where('user_id', $request->user_id)->get();
            return response()->json([
                'absences' => $absences,
            ]);
        }

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

    public function absencesAdmin (Request $request)
    {
        if ($request->is('api/absences/unjustified')) {
            $absences = Attendance::with("user")
            ->whereHas('user', function ($query) use ($request) {
                $query->where('section_id', $request->section_id)
                ->where(function ($q) use ($request) {
                    $q->where('first_name', 'like', '%' . $request->search . '%')
                      ->orWhere('last_name', 'like', '%' . $request->search . '%');
                });
            })
            ->whereDate('date', '<', now()->format('Y-m-d'))
            ->where(function ($query) {
                $query->whereNull('beginning')
                ->orWhere('beginning', '>', '09:01:00')
                ->orWhereNull('lunch')
                ->orWhereNull('return')
                ->orWhereNull('end')
                ->orWhere('end', '<', '17:00:00');
            })
            ->whereNull('absence_id')
            ->get();

            return response()->json([
                'absences' => $absences,
            ]);
        }

        if ($request->is('api/absences/all')) {
            $absences = Absence::with("user")
            ->whereHas('user', function ($query) use ($request) {
                $query
                ->where('section_id', $request->section_id)
                ->where(function ($q) use ($request) {
                    $q->where('first_name', 'like', '%' . $request->search . '%')
                      ->orWhere('last_name', 'like', '%' . $request->search . '%');
                });
            })
            ->get();

            return response()->json([
                'absences' => $absences,
            ]);
        }

        if ($request->is('api/absences/accepted')) {
            $absences = Absence::with("user")
            ->whereHas('user', function ($query) use ($request) {
                $query->where('section_id', $request->section_id)
                ->where(function ($q) use ($request) {
                    $q->where('first_name', 'like', '%' . $request->search . '%')
                      ->orWhere('last_name', 'like', '%' . $request->search . '%');
                });
            })
            ->where('status', 'Accepted')
            ->get();

            return response()->json([
                'absences' => $absences,
            ]);
        }

        if ($request->is('api/absences/pending')) {
            $absences = Absence::with("user")
            ->whereHas('user', function ($query) use ($request) {
                $query->where('section_id', $request->section_id)
                ->where(function ($q) use ($request) {
                    $q->where('first_name', 'like', '%' . $request->search . '%')
                      ->orWhere('last_name', 'like', '%' . $request->search . '%');
                });
            })
            ->where('status', 'Pending')
            ->get();

            return response()->json([
                'absences' => $absences,
            ]);
        }

        if ($request->is('api/absences/refused')) {
            $absences = Absence::with("user")
            ->whereHas('user', function ($query) use ($request) {
                $query->where('section_id', $request->section_id)
                ->where(function ($q) use ($request) {
                    $q->where('first_name', 'like', '%' . $request->search . '%')
                      ->orWhere('last_name', 'like', '%' . $request->search . '%');
                });
            })
            ->where('status', 'Refused')
            ->get();

            return response()->json([
                'absences' => $absences,
            ]);
        }

        return Inertia::render('Absences/Index', [
            'sections' => Section::all(),
        ]);
    }

    public function update(Request $request)
    {
        $absence = Absence::find($request->id);
        $absence->update([
            'status' => $request->status,
        ]);

        $absence->save();

        return response()->json([
            'absence' => $absence,
        ]);
    }
}
