<?php

namespace App\Http\Controllers;

use App\Filters\FilterRange;
use App\Http\Resources\Hotel\HotelCollection;
use App\Models\Hotel;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return HotelCollection
     */
    public function index()
    {
        $hotels = QueryBuilder::for(Hotel::query())
            ->allowedFilters(
                'name',
                'bedrooms',
                'bathrooms',
                'storeys',
                'garages',
                AllowedFilter::custom('price', new FilterRange)
            )
            ->orderByDesc('created_at')
            ->paginate(10);

        $collection = new HotelCollection($hotels);

        $collection->additional([
            'price' => [
                'min' => Hotel::min('price'),
                'max' => Hotel::max('price')
            ]
        ]);

        return $collection;
    }
}
