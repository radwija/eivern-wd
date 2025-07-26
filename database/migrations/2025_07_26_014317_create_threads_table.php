<?php

use App\Enums\ThreadCategory;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('threads', function (Blueprint $table) {
            $table->id();
            $table->enum('category', [
                ThreadCategory::LOST_ITEMS->value,
                ThreadCategory::STUDY->value,
            ]);
            $table->string('title');
            $table->boolean('is_active')->default(true);
            $table->foreignIdFor(User::class)->constrained();
            $table->text('description');
            $table->string('contact_name');
            $table->string('phone_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('threads');
    }
};
