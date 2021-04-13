<?php

namespace App\Filters;

use Spatie\QueryBuilder\Filters\Filter;

class FilterRange implements Filter
{
    public function __invoke($query, $value, string $property)
    {
        if(is_array($value)) {
            $query->whereBetween($property, $value);
        }

        return $query;
    }
}