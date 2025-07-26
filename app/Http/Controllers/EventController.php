<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $events = Event::with('organizer:id,name')
            // FIX: Hapus atau beri komentar pada baris ini untuk menampilkan semua event
            // ->where('start_date', '>=', now()->toDateString()) 
            ->orderBy('start_date', 'asc')
            ->get()
            ->map(function ($event) {
                $event->image_url = $event->image ? Storage::url($event->image) : null;
                return $event;
            });

        return Inertia::render('events/index', [
            'events' => $events,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('events/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'image'       => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'start_date'  => 'required|date|after_or_equal:today',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
        ]);

        $imagePath = $request->file('image')->store('public/events');

        $validatedData['image'] = $imagePath;
        $validatedData['organizer_id'] = Auth::id();

        $event = Event::create($validatedData);

        return response()->json([
            'message' => 'Event Created.',
            'data' => $event,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event): Response
    {
        // FIX: Muat relasi organizer dan buat URL gambar yang bisa diakses publik.
        $event->load('organizer:id,name');
        $event->image_url = $event->image ? Storage::url($event->image) : null;

        // FIX: Render komponen Inertia 'events/show' dan kirim data event tunggal.
        return Inertia::render('events/show', [
            'event' => $event,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return response()->json($event->load('organizer:id,name'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        if ($event->organizer_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'start_date'  => 'sometimes|required|date',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
        ]);

        if ($request->hasFile('image')) {
            Storage::delete($event->image);
            $validatedData['image'] = $request->file('image')->store('public/events');
        }

        $event->update($validatedData);

        return response()->json([
            'message' => 'Event updated.',
            'data' => $event
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        if($event->organizer_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        Storage::delete($event->image);
        $event->delete();

        return response()->json(['message' => 'Event deleted.']);
    }
}
