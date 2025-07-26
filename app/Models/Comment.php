<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $guarded = [''];

    public function thread(): BelongsTo
    {
        return $this->belongsTo(Thread::class);
    }
}
