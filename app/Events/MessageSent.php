<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Message $message) {}

    public function broadcastOn(): Channel
    {
        return new PrivateChannel('chat.' . $this->message->chat_group_id);
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'user' => [
                'id' => $this->message->user->id,
                'name' => $this->message->user->name,
            ],
            'user_id' => $this->message->user_id,
            'content' => $this->message->content,
            'created_at' => $this->message->created_at->toDateTimeString(),
        ];
    }
}
