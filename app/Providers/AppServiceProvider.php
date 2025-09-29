<?php

namespace App\Providers;


use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\HeroSection;
use App\Policies\HeroSectionPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        HeroSection::class => HeroSectionPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
