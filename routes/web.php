<?php

use App\Http\Controllers\AbsenceController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TestingController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\TechTalkController;
use App\Http\Controllers\InfosController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function (){ return Inertia::render('Connect/Index');} );


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [ProfileController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/tech-talks', [TechTalkController::class, 'index'])->name('tech-talks.index');
    Route::get('/whoiswho', [InfosController::class, 'index'])->name('whoiswho.index');
});

Route::middleware(['auth', 'is_coach'])->group(function () {
    Route::get('/testing', [TestingController::class, 'index'])->name('admin');
    Route::get('/testing/absences', [AbsenceController::class, 'index'])->name('admin');
    Route::get('/section', [SectionController::class, 'index'])->name('admin');
    Route::get('/clockout', [AttendanceController::class, 'clockout'])->name('admin');
});

require __DIR__.'/auth.php';
