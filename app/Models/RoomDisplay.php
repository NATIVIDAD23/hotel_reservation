<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RoomDisplay extends Model
{
    use HasFactory;

    protected $table = 'room_displays';

    protected $fillable = [
        'room_id',
        'path',
        'name',
        'description',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
