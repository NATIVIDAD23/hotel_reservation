<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Guest;
use Illuminate\Validation\Rules;
use Illuminate\Auth\Events\Registered;

class RegisterGuestController extends Controller
{
    public function showRegister()
    {
        return Inertia::render('GuestAuth/Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.Guest::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $guest = Guest::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);


        event(new Registered($guest));

        Auth::guard('guest')->login($guest);

        return redirect(route('guest.dashboard', absolute: false));
    }

}
