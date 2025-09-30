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
        Schema::create('room_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained('rooms')->onDelete('cascade');
            $table->string('offer_name');
            $table->text('description');
            $table->boolean('is_refundable')->default(false);
            $table->text('refund_policy')->nullable();
            $table->text('meal_plan')->nullable();
            $table->date('valid_from');
            $table->date('valid_to');
            $table->json('extras')->nullable();
            $table->decimal('price', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_offers');
    }
};
