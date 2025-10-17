<?php

use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');



Route::middleware(['guest', 'inertia.guest'])->group(function () {
    Route::get('guest/dashboard', fn() => Inertia::render('Guest/Dashboard/Index'))
        ->name('guest.dashboard');
});

require __DIR__.'/admin.php';
require __DIR__.'/auth.php';

