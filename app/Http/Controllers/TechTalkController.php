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
        $techTalks = TechTalk::all();

        return Inertia::render('TechTalk/Index', [
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
            TechTalk::all(),
        ]);

    }

    public function update(Request $request)
    {

        $techTalk = TechTalk::find($request->id);

        $techTalk->update([
            'is_over' => $request->is_over,
        ]);

        return response()->json([
            TechTalk::all(),
        ]);
    }

    public function delete(Request $request)
    {
        $techTalk = TechTalk::find($request->id);

        $techTalk->delete();

        return response()->json([
            TechTalk::all(),
        ]);
    }
}
