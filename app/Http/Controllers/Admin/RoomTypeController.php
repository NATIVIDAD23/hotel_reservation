<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RoomType;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use DB;

class RoomTypeController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request){

        $this->authorize('viewAny', RoomType::class);

        $query = RoomType::query();

        $roomtype = $query->paginate($request->per_page ?? 10); 
        $formattedRoomtypes = $roomtype->through(function ($room) {
            return [
                'id'        => encrypt($room->id),
                'slug'      => $room->slug,
                'name'      => $room->name,
                'amenities' => $room->amenities,
                'rules'     => $room->rules,
            ];
        });
        
        return Inertia::render('Admin/Rooms/RoomType', [
            'roomTypes' => $formattedRoomtypes
        ]);
    }

    public function store(Request $request)
    {

       // dd($request->all());
        try {
            $this->authorize('create', RoomType::class);

            $validator = Validator::make($request->all(), [
                'slug'        => 'required|unique:room_types,slug',
                'name'        => 'required|string|max:255',
                'image'       => 'required|image|mimes:jpg,png,jpeg|max:2048',
                'description' => 'required|string',
                'amenities'   => 'required|string',
                'rules'       => 'required|string',
            ], [
                'slug.required'        => 'Please enter a slug.',
                'slug.unique'          => 'The slug has already been taken.',
                'name.required'        => 'Please enter a name.',
                'image.required'       => 'Please upload an image.',
                'description.required' => 'Please enter a description.',
                'amenities.required'   => 'Please enter amenities.',
                'rules.required'       => 'Please enter rules.',
            ]);

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            DB::beginTransaction();

            $path = $request->file('image')->store('RoomType', 'public');

            RoomType::create([
                'name'             => $request->name,
                'description'      => $request->description,
                'amenities'        => array_map('trim', explode(',', $request->amenities)),
                'rules'            => array_map('trim', explode(',', $request->rules)),
                'image_path'       => $path,
                'slug'             => $request->slug
            ]);

            DB::commit();

            return redirect()->back()->with('success', 'Room Type created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

}
