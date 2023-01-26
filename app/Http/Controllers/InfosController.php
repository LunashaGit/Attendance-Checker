<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
class InfosController extends Controller
{
    public function index(Request $request)
    {
        if ($request->is('api/*') && $request->has('search')) {
            $users = User::with('section')->where('name', 'like', '%' . $request->search . '%')->get();
            
            return response()->json([
                'users' => $users,
            ]);
        }

        return Inertia::render('WhoIsWho/Index');
    }

}
