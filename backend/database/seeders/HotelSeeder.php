<?php

namespace Database\Seeders;

use App\Imports\HotelsImport;
use Illuminate\Database\Seeder;
use Excel;

class HotelSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * @return void
     */
    public function run()
    {
        Excel::import(new HotelsImport(), database_path('data/property-data.csv'));
    }
}
