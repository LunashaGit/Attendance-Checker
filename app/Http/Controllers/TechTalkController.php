<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TechTalk;
use App\Models\User;
use Inertia\Inertia;

class TechTalkController extends Controller
{
    public function index(Request $request)
    {
        $techTalks = TechTalk::with('user.section')->get();

        return Inertia::render('TechTalk/Index', [
            'user' => $request->user()->load('section'),
            'techTalks' => $techTalks
        ]);
    }

    public function getByMonthAndCampus(Request $request)
    {
        $techTalks = TechTalk::where('date', 'like', $request->month . '%')
            ->where('campus_id', $request->campus_id)
            ->get();

        return response()->json([
            'techTalks' => $techTalks,
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
            TechTalk::with('user.section')->get(),
        ]);

    }

    public function update(Request $request)
    {

        $techTalk = TechTalk::find($request->id);

        $techTalk->update([
            'is_over' => $request->is_over,
        ]);

        return response()->json([
            TechTalk::with('user.section')->get(),
        ]);
    }

    public function delete(Request $request)
    {
        $techTalk = TechTalk::find($request->id);

        $techTalk->delete();

        return response()->json([
            TechTalk::with('user.section')->get(),
        ]);
    }
}
