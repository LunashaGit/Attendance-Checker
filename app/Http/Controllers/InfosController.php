<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Section;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
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
            'NISS' => $request->niss,
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
        $user = User::with('section')->find($request->user_id);
        if($user->personalInformation != null){
            $user->personalInformation()->update([
                'NISS' => $request->niss,
                'phone_number' => $request->phone,
                'birth_date' => $request->birthday,
                'email_alias' => $request->email_alias,
                'github' => $request->github,
                'github_link' => $request->github_link,
                'linkedin' => $request->linkedin,
            ]);
        } else {
            $response_user = $user->personalInformation()->create([
            'NISS' => $request->niss,
            'phone_number' => $request->phone,
            'birth_date' => $request->birthday,
            'email_alias' => $request->email_alias,
            'github' => $request->github,
            'github_link' => $request->github_link,
            'linkedin' => $request->linkedin,
        ]); 
        
        $user->personal_information_id = $response_user->id;
        }
        
        if ($request->section) {
            $user->section_id = $request->section;
            if($user->is_coach == 1 || $user->is_admin == 1) {
                $user->save();
        
                return response()->json([
                    'user' => $user,
                ]);
            }
            db::table('attendances')->where('user_id', $user->id)->delete();
            
            $section = Section::find($request->section);

            $startDate = Carbon::parse($section->date_start_courses);
            $endDate = Carbon::parse($section->date_end_courses);

            $records = [];

            while ($startDate <= $endDate) {
                if (!$startDate->isWeekend() &&
                    !($startDate >= Carbon::parse($section->date_start_holiday1) && $startDate <= Carbon::parse($section->date_end_holiday1)) &&
                    !($startDate >= Carbon::parse($section->date_start_holiday2) && $startDate <= Carbon::parse($section->date_end_holiday2))) {
                    $records[] = [
                        'user_id' => $user->id,
                        'date' => $startDate->toDateString(),
                    ];
                }
                $startDate->addDay();
            }

            DB::table('attendances')->insert($records);
        }

        
        $user->save();
        
        return response()->json([
            'user' => $user,
        ]);
    }

    public function summary(Request $request)
    {
        // get every user in the section
        $users = User::with('section', 'personalInformation')
        ->where('section_id', $request->section_id)
        ->get();

        return response()->json([
            'users' => $users,
        ]);
    }

}
