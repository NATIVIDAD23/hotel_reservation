<?php
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\HeroSectionController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\RoomTypeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin')->name('admin.')->group(function () {

    Route::get('dashboard', fn() => Inertia::render('Dashboard'))
        ->middleware(['auth', 'verified'])
        ->name('dashboard');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // Hero Section
        Route::get('/herosection', [HeroSectionController::class, 'index'])->name('herosection');
        Route::post('/herosection', [HeroSectionController::class, 'store'])->name('herosection.store');

        // Room Type
        Route::get('/room/type', [RoomTypeController::class, 'index'])->name('room.type');
        Route::post('/room/type/store', [RoomTypeController::class, 'store'])->name('room.type.store');

        // Room
        Route::get('/rooms', [RoomController::class, 'index'])->name('room');
        Route::get('/room/create', [RoomController::class, 'create'])->name('room.create');
    });
});

