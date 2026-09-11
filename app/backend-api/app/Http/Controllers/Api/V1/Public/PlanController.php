<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\MembershipPlan;

class PlanController extends Controller
{
    public function index()
    {
        return MembershipPlan::query()
            ->where('status', 'active')
            ->orderBy('price')
            ->get(['id', 'name', 'description', 'price', 'duration_in_days', 'features']);
    }
}
