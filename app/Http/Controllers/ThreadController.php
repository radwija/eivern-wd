<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use Illuminate\Http\Request;
use App\Enums\ThreadCategory;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ThreadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $category = $request->query('category') ?? ThreadCategory::STUDY;
        $thread = Thread::where('category', $category)
        ->with(['images'])
        ->latest()
        ->get();

        return response()->json($thread);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $category = $request->query('category');

        abort_if(!in_array(
            $category,
            array_column(ThreadCategory::cases(), 'value')
        ), 404);

        if ($category == ThreadCategory::STUDY->value) {
            return Inertia::render('studies/create');
        }

        if ($category == ThreadCategory::LOST_ITEMS->value) {
            return Inertia::render('lost-items/create');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => ['required', new Enum(ThreadCategory::class)],
            'contact_name' => 'required|string|max:100',
            'phone_number' => 'required|string|max:20',
        ];

        if ($request->input('category') === ThreadCategory::LOST_ITEMS->value) {
            $rules['images'] = 'required|array';
            $rules['images.*'] = 'required|image|mimes:jpeg,png,jpg,gif|max:2048';
        } else {
            $rules['images'] = 'nullable|array';
            $rules['images.*'] = 'image|mimes:jpeg,png,jpg,gif|max:2048';
        }

        $validatedData = $request->validate($rules);
        $validatedData['user_id'] = Auth::id();

        $thread = Thread::create($validatedData);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('public/threads');
                $thread->images()->create(['url' => $path]);
            }
        }

        $category = $validatedData['category'];

        // conditional redirect
            if ($category === 'study') {
            // return redirect()
            //     ->route('studies.index', ThreadCategory::STUDY->value)
            //     ->with('success', 'Thread created.');
            
            // development
            return response()->json([
                'message' => 'Thread created.',
                'redirect_to' => '/studies'
            ]);

        } elseif ($category === 'lost_item') {
            // return redirect()
            //     ->route('lost-items.index', ThreadCategory::LOST_ITEMS->value)
            //     ->with('success', 'Thread created.');

            // development
            return response()->json([
                'message' => 'Thread created.',
                'redirect_to' => '/lost-items'
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Thread $thread)
    {
        return response()->json($thread->load('images'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Thread $thread)
    {
        if ($thread->user_id !== Auth::id()) {
            return response()->json(['message' => 'Anda tidak memiliki izin untuk melakukan aksi ini.'], 403);
        }

        $validatedData = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'is_active'   => 'sometimes|required|boolean',
            'contact_name'  => 'sometimes|required|string|max:100',
            'phone_number'  => 'sometimes|required|string|max:20',
            'images'      => 'nullable|array', // Gambar baru bersifat opsional saat update
            'images.*'    => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $thread->update($validatedData);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('public/threads');
                $thread->images()->create(['url' => $path]);
            }
        }

        return response()->json([
            'message' => 'Thread updated.',
            'data' => $thread->load('user', 'images'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Thread $thread)
    {
        if($thread->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        foreach ($thread->images as $image) {
            Storage::delete($image->url);
        }

        $thread->delete();

        return response()->json(['message' => 'Thread deleted.']);
    }
}
