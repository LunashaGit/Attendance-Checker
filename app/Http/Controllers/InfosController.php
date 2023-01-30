<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Section;
class InfosController extends Controller
{
    public function index(Request $request)
    {
        if ($request->is('api/*') && $request->has('search')) {
            $users = User::with('section', 'personalInformation')
            ->where('first_name', 'like', '%' . $request->search . '%')
            ->orWhere('last_name', 'like', '%' . $request->search . '%')
            ->get();
            
            return response()->json([
                'users' => $users,
            ]);
        }

        return Inertia::render('WhoIsWho/Index',[
            'sections' => Section::all(),
        ]);
    }

    public function create(Request $request)
    {
        $user = User::find($request->user_id);
        $response = $user->personalInformation()->create([
            'phone_number' => $request->phone,
            'birth_date' => $request->birthday,
            'email_alias' => $request->email_alias,
            'github' => $request->github,
            'github_link' => $request->github_link,
            'linkedin' => $request->linkedin,
        ]); 

        $user->personal_information_id = $response->id;
        $user->section_id = $request->section;
        $user->save();
        
        return response()->json([
            'user' => $user,
        ]);
    }

    public function update(Request $request)
    {
        $user = User::find($request->user_id);
        $user->personalInformation()->update([
            'phone_number' => $request->phone,
            'birth_date' => $request->birthday,
            'email_alias' => $request->email_alias,
            'github' => $request->github,
            'github_link' => $request->github_link,
            'linkedin' => $request->linkedin,
        ]); 

        $user->section_id = $request->section;
        $user->save();
        
        return response()->json([
            'user' => $user,
        ]);
    }

}
