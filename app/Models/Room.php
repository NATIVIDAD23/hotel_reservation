<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    use HasFactory;

    protected $table = 'rooms';

    protected $fillable = [
        'room_number',
        'name',
        'description',
        'bed_type',
        'status',
        'room_type_id',
    ];

    protected $casts = [
        'status' => 'string',
    ];

    public function roomDisplays()
    {
        return $this->hasMany(RoomDisplay::class);
    }

    public function roomOffers()
    {
        return $this->hasMany(RoomOffer::class);
    }

    // public function reservations()
    // {
    //     return $this->hasMany(Reservation::class);
    // }
}
