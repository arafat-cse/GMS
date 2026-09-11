<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\Staff;

class TrainerController extends Controller
{
    public function index()
    {
        return Staff::query()
            ->where('status', 'active')
            ->whereHas('user', fn ($query) => $query->whereIn('role', ['staff', 'trainer']))
            ->with('user:id,first_name,last_name')
            ->orderBy('id')
            ->get(['id', 'user_id', 'designation'])
            ->map(fn ($staff) => [
                'id' => $staff->id,
                'name' => trim(($staff->user->first_name ?? '').' '.($staff->user->last_name ?? '')),
                'designation' => $staff->designation,
            ])
            ->values();
    }
}
