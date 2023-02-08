<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\TechTalk;
use App\Models\User;
use App\Models\Attendance;
class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request): Response
    {
        $attendancesBefore = Attendance::whereDate('date', '<', now()->format('Y-m-d'))
        ->where(function ($query) {
            $query->whereNull('beginning')
            ->orWhereNull('lunch')
            ->orWhereNull('return')
            ->orWhereNull('end');
        })
        ->where('user_id', Auth::user()->id)
        ->get();

        $techTalksToday = TechTalk::with('user.section')
        ->whereHas('user.section', function ($query) use ($request) {
            $query->where('id', Auth::user()->section_id);
        })
        ->whereDate('date', date('Y-m-d'))
        ->get();
        
        return Inertia::render('Dashboard/Index', [
            'user' => $request->user()->load('section'),
            'techTalks' => TechTalk::where('user_id', $request->user()->id)->get(),
            'techTalksToday' => $techTalksToday,
            'attendancesBefore' => $attendancesBefore,
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
