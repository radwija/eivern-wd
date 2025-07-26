<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\ChatGroup;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SocialController extends Controller
{
    public function index()
    {
        $chatGroup = ChatGroup::first();

        return inertia('socials/index', [
            'messages' => Message::with('user')->where('chat_group_id', $chatGroup->id)->get(),
            'chat_group_id' => $chatGroup->id
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string'
        ]);

        $message = Auth::user()->messages()->create([
            'content' => $request['content'],
            'chat_group_id' => $request['chat_group_id']
        ]);

        $message->load('user');

        broadcast(new MessageSent($message));

        return response()->json($message);
    }
}
