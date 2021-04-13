<?php

namespace App\Imports;

use App\Models\Hotel;
use Maatwebsite\Excel\Concerns\ToModel;

class HotelsImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return Hotel
     */
    public function model(array $row)
    {
        return new Hotel([
            'name'     => $row[0],
            'price'    => $row[1],
            'bedrooms'    => $row[2],
            'bathrooms'    => $row[3],
            'storeys'    => $row[4],
            'garages' => $row[5],
        ]);
    }
}