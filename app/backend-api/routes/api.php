<?php

use App\Http\Controllers\Api\V1\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Api\V1\User\AuthController as UserAuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::prefix('admin')->group(function () {
        Route::post('/login', [AdminAuthController::class, 'login']);

        Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
            Route::post('/logout', [AdminAuthController::class, 'logout']);
        });
    });

    Route::prefix('user')->group(function () {
        Route::post('/login', [UserAuthController::class, 'login']);

        Route::middleware(['auth:sanctum', 'role:staff,trainer,member'])->group(function () {
            Route::post('/logout', [UserAuthController::class, 'logout']);
        });
    });
});
