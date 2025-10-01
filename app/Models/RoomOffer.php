<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RoomOffer extends Model
{
    use HasFactory;

    protected $table = 'room_offers';

    protected $fillable = [
        'room_id',
        'offer_name',
        'description',
        'is_refundable',
        'refund_policy',
        'meal_plan',
        'valid_from',
        'valid_to',
        'extras',
        'price',
    ];

    protected $casts = [
        'is_refundable' => 'boolean',
        'valid_from'    => 'date',
        'valid_to'      => 'date',
        'extras'        => 'array',
        'price'         => 'decimal:2',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
