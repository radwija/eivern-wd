<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ThreadController;
use App\Models\Event;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('events', EventController::class);
    Route::resource('comments', CommentController::class)->only([
        'store', 'destroy',
    ]);
    Route::resource('threads', ThreadController::class)->except([
        'show'
    ]);

    Route::get('lost-items', function () {
        return Inertia::render('lost-items/index');
    })->name('lost-items.index');

    Route::get('lost-items/create', function () {
        return Inertia::render('lost-items/create');
    })->name('lost-items.create');

    Route::get('events/create', function () {
        return Inertia::render('events/create');
    })->name('events.create');

    Route::get('studies', function () {
        return Inertia::render('studies/index');
    })->name('studies.index');
    
    Route::get('studies/create', function () {
        return Inertia::render('studies/create');
    })->name('studies.create');

    Route::get('socials', function () {
        return Inertia::render('socials/index');
    })->name('socials.index');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
