<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TechTalk;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Campuse;
class TechTalkController extends Controller
{
    public function index(Request $request)
    {
        if ($request->is('api/*')) {
            
            $techTalks = TechTalk::with('user.section')
            ->whereHas('user.section', function ($query) use ($request) {
                $query->where('campus_id', $request->campus_id);
            })
            ->whereMonth('date', $request->month)
            ->get();

            return response()->json([
                'techTalks' => $techTalks,
            ]);
            
        }

        $techTalks = TechTalk::with('user.section')
        ->whereHas('user.section', function ($query) use ($request) {
            $query->where('campus_id', Auth::user()->section->campus_id);
        })
        ->whereMonth('date', date('m'))
        ->get();

        return Inertia::render('TechTalk/Index', [
            'user' => $request->user()->load('section'),
            'techTalks' => $techTalks,
            'campuses' => Campuse::all(),
        ]);
    }

    public function getByMonthAndCampus(Request $request)
    {
        // $techTalks = DB::table('tech_talks')
        // ->join('users', 'tech_talks.user_id', '=', 'users.id')
        // ->join('sections', 'users.section_id', '=', 'sections.id')
        // ->select('tech_talks.*', 'users.*', 'sections.*')
        // ->where('sections.campus_id', $request->campus_id)
        // ->whereMonth('tech_talks.date', $request->month)
        // ->get();

        // $techTalks = DB::select('
        // SELECT tech_talks.*, users.*, sections.*
        // FROM tech_talks
        // JOIN users ON tech_talks.user_id = users.id
        // JOIN sections ON users.section_id = sections.id
        // WHERE MONTH(tech_talks.date) = ?
        // AND sections.campus_id = ?;
        // ', [$request->month, $request->campus_id]);

        return response()->json([
            TechTalk::with('user.section')
            ->whereHas('user.section', function ($query) use ($request) {
                $query->where('campus_id', $request->campus_id);
            })
            ->whereMonth('date', $request->month)
            ->get()
        ]);
    }

    public function create(Request $request)
    {

        TechTalk::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'date' => $request->date,
            'time' => $request->time,
            !empty($request->commentary) ? 'commentary' : null => $request->commentary,
        ]);
        return response()->json([
            TechTalk::with('user.section')
            ->whereHas('user.section', function ($query) use ($request) {
                $query->where('campus_id', $request->campus_id);
            })
            ->whereMonth('date', $request->month)
            ->get()
        ]);

    }

    public function update(Request $request)
    {

        $techTalk = TechTalk::find($request->id);

        $techTalk->update([
            'is_over' => $request->is_over,
        ]);

        return response()->json([
            TechTalk::with('user.section')
            ->whereHas('user.section', function ($query) use ($request) {
                $query->where('campus_id', $request->campus_id);
            })
            ->whereMonth('date', $request->month)
            ->get()
        ]);
    }

    public function delete(Request $request)
    {
        $techTalk = TechTalk::find($request->id);

        $techTalk->delete();

        return response()->json([
            TechTalk::with('user.section')
            ->whereHas('user.section', function ($query) use ($request) {
                $query->where('campus_id', $request->campus_id);
            })
            ->whereMonth('date', $request->month)
            ->get()
        ]);
    }
}
