<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AttendanceController;
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

Route::get('/attendance/{id}', [AttendanceController::class, 'getByUser']);
Route::put('/attendance', [AttendanceController::class, 'update']);

Route::get('/time', function () {
    $time = date('H:i:s', strtotime('-8 hours', strtotime(date('H:i:s'))));
    return response()->json($time);
});

// Route::get('/attendance', [AttendanceController::class, 'schedule']);
