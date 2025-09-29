<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\HeroSectionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,

    ]);
});
Route::group(['prefix' => 'admin'], function(){
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('admin.dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        //Herro Section Controller
        Route::get('herosection', [HeroSectionController::class, 'index'])->name('admin.herosection');
        Route::get('herosection/view', [HeroSectionController::class, 'view'])->name('admin.herosection.view');
        Route::post('herosection', [HeroSectionController::class, 'store'])->name('admin.herosection.store');
    });

});

Route::middleware(['guest', 'inertia.guest'])->group(function () {
    Route::get('guest/dashboard', fn() => Inertia::render('Guest/Dashboard/Index'))
        ->name('guest.dashboard');
});

require __DIR__.'/auth.php';
