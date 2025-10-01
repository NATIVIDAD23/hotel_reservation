<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\HeroSectionController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\RoomTypeController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');


Route::group(['prefix' => 'admin'], function(){
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('admin.dashboard');

    Route::middleware('auth', 'verified')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        //Hero Section Controller
        Route::get('/herosection', [HeroSectionController::class, 'index'])->name('admin.herosection');
        Route::post('/herosection', [HeroSectionController::class, 'store'])->name('admin.herosection.store');

        //Room Type Controller
        Route::get('/room/type', [RoomTypeController::class, 'index'])->name('admin.room.type');
        Route::post('/room/type/store', [RoomTypeController::class, 'store'])->name('admin.room.type.store');

    });

});

Route::middleware(['guest', 'inertia.guest'])->group(function () {
    Route::get('guest/dashboard', fn() => Inertia::render('Guest/Dashboard/Index'))
        ->name('guest.dashboard');
});

require __DIR__.'/auth.php';
