<?php

use App\Http\Controllers\SocialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('lost-items/create', function () {
    return Inertia::render('lost-items/create');
})->name('lost-items.create');

Route::get('events/create', function () {
    return Inertia::render('events/create');
})->name('events.create');

Route::get('studies/create', function () {
    return Inertia::render('studies/create');
})->name('studies.create');

Route::get('socials', [SocialController::class, 'index'])->name('socials.index');
Route::post('socials', [SocialController::class, 'store'])->name('socials.store');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
