<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class TestingController extends Controller
{
    public function index()
    {
        // get the current time without carbon
        return Inertia::render('Testing/Index');
    }
}
