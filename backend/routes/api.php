<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
// Route::prefix('v1')->group(function(){
//     Route::post('/login', [AuthController::class, 'login']);
// });

Route::group([

    'middleware' => 'jwt',
    'prefix' => 'v1/auth'

], function ($router) {

    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

    // User
    Route::get('users', [UserController::class, 'index']);

});
Route::post('v1/auth/login', [AuthController::class, 'login']);
Route::post('v1/auth/refresh', [AuthController::class, 'refresh']);
