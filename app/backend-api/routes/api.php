<?php

use App\Http\Controllers\Api\V1\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Api\V1\Admin\BranchController;
use App\Http\Controllers\Api\V1\Admin\CouponController as AdminCouponController;
use App\Http\Controllers\Api\V1\Admin\DiscountController as AdminDiscountController;
use App\Http\Controllers\Api\V1\Admin\MemberController;
use App\Http\Controllers\Api\V1\Admin\MemberRegistrationController;
use App\Http\Controllers\Api\V1\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\Api\V1\Admin\PaymentNumberController as AdminPaymentNumberController;
use App\Http\Controllers\Api\V1\Admin\PlanController;
use App\Http\Controllers\Api\V1\Admin\StaffController;
use App\Http\Controllers\Api\V1\Admin\SubscriptionController;
use App\Http\Controllers\Api\V1\Public\CouponController as PublicCouponController;
use App\Http\Controllers\Api\V1\Public\PaymentController as PublicPaymentController;
use App\Http\Controllers\Api\V1\Public\PaymentNumberController as PublicPaymentNumberController;
use App\Http\Controllers\Api\V1\Public\PlanController as PublicPlanController;
use App\Http\Controllers\Api\V1\Public\RegistrationController;
use App\Http\Controllers\Api\V1\User\AuthController as UserAuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::post('/register', [RegistrationController::class, 'store']);
    Route::get('/plans', [PublicPlanController::class, 'index']);
    Route::get('/payment-numbers', [PublicPaymentNumberController::class, 'index']);
    Route::get('/coupons/validate', [PublicCouponController::class, 'validateCode']);
    Route::post('/registrations/{memberRegistration}/payments', [PublicPaymentController::class, 'store']);

    Route::prefix('admin')->group(function () {
        Route::post('/login', [AdminAuthController::class, 'login']);

        Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
            Route::post('/logout', [AdminAuthController::class, 'logout']);

            Route::apiResource('branches', BranchController::class);
            Route::apiResource('members', MemberController::class);
            Route::apiResource('staff', StaffController::class);
            Route::apiResource('plans', PlanController::class);
            Route::apiResource('subscriptions', SubscriptionController::class);
            Route::apiResource('payment-numbers', AdminPaymentNumberController::class);
            Route::apiResource('coupons', AdminCouponController::class);
            Route::get('/discounts', [AdminDiscountController::class, 'index']);
        });

        Route::middleware(['auth:sanctum', 'role:admin,staff'])->group(function () {
            Route::get('/registrations', [MemberRegistrationController::class, 'index']);
            Route::get('/registrations/{memberRegistration}', [MemberRegistrationController::class, 'show']);
            Route::post('/registrations/{memberRegistration}/approve', [MemberRegistrationController::class, 'approve']);
            Route::post('/registrations/{memberRegistration}/reject', [MemberRegistrationController::class, 'reject']);
            Route::get('/payments', [AdminPaymentController::class, 'index']);
            Route::get('/payments/{payment}', [AdminPaymentController::class, 'show']);
            Route::post('/payments/{payment}/approve', [AdminPaymentController::class, 'approve']);
            Route::post('/payments/{payment}/reject', [AdminPaymentController::class, 'reject']);
        });
    });

    Route::prefix('user')->group(function () {
        Route::post('/login', [UserAuthController::class, 'login']);

        Route::middleware(['auth:sanctum', 'role:staff,trainer,member'])->group(function () {
            Route::post('/logout', [UserAuthController::class, 'logout']);
        });
    });
});
