<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Section;
use App\Models\User;
class SectionController extends Controller
{
    public function index()
    {
        return Inertia::render('Section/Index', [
            'sections' => Section::all(),
            'users' => User::all(),
        ]);
    }

    public function create(Request $request)
    {
    }
}
