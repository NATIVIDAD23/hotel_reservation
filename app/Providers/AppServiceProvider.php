<?php

namespace App\Providers;


use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        \App\Models\HeroSection::class => \App\Policies\HeroSectionPolicy::class,
        \App\Models\RoomType::class => \App\Policies\RoomTypePolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
