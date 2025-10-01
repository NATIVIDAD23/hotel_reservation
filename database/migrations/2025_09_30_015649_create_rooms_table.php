<?php

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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_type_id')->constrained('room_types')->onDelete('cascade');
            $table->string('room_number');
            $table->string('room_name');
            $table->text('description');
            $table->integer('adult')->default(0);
            $table->integer('child')->default(0);
            $table->integer('extra_pax')->default(0);
            $table->enum('status', ['available', 'unavailable', 'maintenance'])->default('available');
            $table->decimal('base_price', 8, 2);
            $table->decimal('pax_rate', 8, 2);
            $table->decimal('weekend_rate', 8, 2);
            $table->json('facilities')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
