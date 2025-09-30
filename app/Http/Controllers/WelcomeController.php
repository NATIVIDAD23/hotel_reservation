<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\HeroSection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class WelcomeController extends Controller
{
    public function index()
    {
        $hero = HeroSection::limit(10)
            ->orderBy('sort', 'asc')
            ->select('title', 'description', 'image_path', 'sort')
            ->get();
        $formatedHero = $hero->map(function ($item) {
            return [
                'title' => $item->title,
                'description' => $item->description,
                'image_path' => Storage::url($item->image_path),
                'sort' => $item->sort,
            ];
        });

        return Inertia::render('Welcome', [
            'heroSections' => $formatedHero
        ]);
    }
}
