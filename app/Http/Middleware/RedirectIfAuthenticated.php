<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {

            if (auth()->guard($guard)->check()) {
                // If logged in as guest
                if ($guard === 'guest') {
                    return redirect()->route('guest.dashboard');
                }

                // If logged in as default (web: admin/staff)
                return redirect()->route('admin.dashboard');
            }
        }

        return $next($request);
    }
}
