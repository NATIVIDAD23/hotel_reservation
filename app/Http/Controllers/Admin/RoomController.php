<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Rooms/Room');
    }

    public function create(){
        return Inertia::render('Admin/Rooms/RoomCreate');
    }
}
