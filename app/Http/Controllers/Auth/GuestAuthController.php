<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Guest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class GuestAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth('guest')->attempt($credentials, $request->remember)) {
            $guest = auth('guest')->user();

            return redirect('/');
        }

        return back()->withErrors(['email' => 'Invalid credentials']);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('guest')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

}
