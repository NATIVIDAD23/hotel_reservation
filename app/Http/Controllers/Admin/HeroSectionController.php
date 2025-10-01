<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use DB;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HeroSectionController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {

        $this->authorize('viewAny', HeroSection::class);

        $per_page = request('per_page');

        $query = HeroSection::query();

        $heroSections = $query->paginate($per_page ?? 10);

        $formatted = $heroSections->map(function ($heroSection) {
            return [
                'id'          => $heroSection->id,
                'title'       => $heroSection->title,
                'description' => $heroSection->description,
                'image_path'  => Storage::url($heroSection->image_path),
            ];
        });

        return Inertia::render('Admin/HeroSection/Index', [
            'heroSections' => [
                'data'          => $formatted,
                'total'         => $heroSections->total(),
                'per_page'      => $heroSections->perPage(),
                'current_page'  => $heroSections->currentPage(),
                'from'          => $heroSections->firstItem(),
                'to'            => $heroSections->lastItem(),
                'last_page_url' => $heroSections->lastPage(),
                'next_page_url' => $heroSections->nextPageUrl(),
                'prev_page_url' => $heroSections->previousPageUrl(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        try {

            $this->authorize('create', HeroSection::class);

            $validator = Validator::make($request->all(), [
                'image_path'  => 'required|image|mimes:jpg,png,jpeg|max:2048',
                'title'       => 'required|string|max:255',
                'description' => 'required|string',
            ], [
                'image_path.required'  => 'Please upload an image.',
                'title.required'       => 'Please enter a title.',
                'description.required' => 'Please enter a description.',
            ]);

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            DB::beginTransaction();

            $path = $request->file('image_path')->store('hero', 'public');

            HeroSection::create([
                'title'       => $request->title,
                'description' => $request->description,
                'image_path'  => $path,
            ]);

            DB::commit();

            return redirect()->back()->with('success', 'Hero Section created successfully.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, HeroSection $heroSection)
    {
        $this->authorize('update', $heroSection);

        $request->validate([
            'title'       => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_path'  => 'nullable|image|max:2048',
        ]);

        $heroSection->update($request->all());

        return redirect()->route('hero-sections.index')
            ->with('success', 'Hero Section updated successfully.');
    }

    public function destroy(HeroSection $heroSection)
    {
        $this->authorize('delete', $heroSection);

        $heroSection->delete();

        return redirect()->route('hero-sections.index')
            ->with('success', 'Hero Section deleted successfully.');
    }
}
