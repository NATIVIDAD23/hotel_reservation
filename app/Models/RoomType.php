<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RoomType extends Model
{
    use HasFactory;

    protected $table = 'room_types';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image_path',
        'amenities',
        'rules',
    ];

    protected $casts = [
        'amenities' => 'array',
        'rules' => 'array',
        'base_price' => 'decimal:2',
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

}
