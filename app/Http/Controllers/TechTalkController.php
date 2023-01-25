<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TechTalk;
use App\Models\User;

class TechTalkController extends Controller
{
    public function create(Request $request)
    {

        TechTalk::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'description' => $request->description,
            'date' => $request->date,
            'time' => $request->time,
        ]);

        return response()->json([
            'message' => 'success',
        ]);

    }

    public function update(Request $request)
    {

        $techTalk = TechTalk::find($request->id);

        $techTalk->update([
            'title' => $request->title,
            'description' => $request->description,
            'commentary' => $request->commentary,
            'is_over' => $request->is_over,
        ]);

        return response()->json([
            'message' => 'success',
        ]);
    }
}
