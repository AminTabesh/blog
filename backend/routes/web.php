<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;

Route::get('/', function () {
    return view('welcome');
});
// Route::post('/users', [UsersController::class, 'store']);



