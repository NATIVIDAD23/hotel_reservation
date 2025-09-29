<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HandleInertiaDynamic
{
    public function handle(Request $request, Closure $next)
    {
        // i-share muna bago tumuloy
        Inertia::share([
            'auth' => [
                'admin' => auth('web')->check() ? $request->user('web') : null,
            ],
            'guest' => [
                'user' => auth('guest')->check() ? $request->user('guest') : null,
            ],
            'errors' => function () use ($request) {
                return $request->session()->get('errors')
                    ? $request->session()->get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
        ]);

        return $next($request);
    }
}
