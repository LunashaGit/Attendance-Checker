<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\InfosController;
use App\Http\Controllers\TechTalkController;
use App\Http\Controllers\AbsenceController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/attendance', [AttendanceController::class, 'getByUser']);
Route::put('/attendance', [AttendanceController::class, 'update']);
Route::get('/attendance/check', [AttendanceController::class, 'getByDate']);
Route::put('/attendance/check', [AttendanceController::class, 'updateByDate']);
Route::get('/attendance/before', [AttendanceController::class, 'beforeTodayAndWithNullInside']);

Route::get('/time', function () {
    $time = date('H:i:s', strtotime('+1 hours', strtotime(date('H:i:s'))));
    return response()->json($time);
});

Route::post('/techtalks', [TechTalkController::class, 'create']);
Route::put('/techtalks', [TechTalkController::class, 'update']);
Route::delete('/techtalks', [TechTalkController::class, 'delete']);
Route::get('/techtalks', [TechTalkController::class, 'getByMonthAndCampus']);
Route::get('/techtalks/today', [TechTalkController::class, 'getTodayAndSection']);

Route::get('/users', [InfosController::class, 'index']);
Route::post('/infos', [InfosController::class, 'create']);
Route::post('/infos', [InfosController::class, 'update']);
Route::get('/summary', [InfosController::class, 'summary']);

Route::post('/absences', [AbsenceController::class, 'create']);
Route::get('/absences/previous', [AbsenceController::class, 'index']);
Route::get('/absences/unjustified', [AbsenceController::class, 'absencesAdmin']);
Route::get('/absences/all', [AbsenceController::class, 'absencesAdmin']);
Route::get('/absences/accepted', [AbsenceController::class, 'absencesAdmin']);
Route::get('/absences/pending', [AbsenceController::class, 'absencesAdmin']);
Route::get('/absences/refused', [AbsenceController::class, 'absencesAdmin']);
Route::put('/absences', [AbsenceController::class, 'update']);
// Route::get('/attendance', [AttendanceController::class, 'schedule']);
