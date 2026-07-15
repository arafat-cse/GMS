<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\MemberRequest;
use App\Models\Member;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class MemberController extends Controller
{
    public function index()
    {
        return Member::with(['user', 'branch'])->paginate(20);
    }

    public function store(MemberRequest $request)
    {
        $data = $request->validated();

        $member = DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => 'member',
            ]);

            return Member::create([
                'user_id' => $user->id,
                'branch_id' => $data['branch_id'] ?? null,
                'phone' => $data['phone'] ?? null,
                'address' => $data['address'] ?? null,
            ]);
        });

        return response()->json($member->load(['user', 'branch']), 201);
    }

    public function show(Member $member)
    {
        return $member->load(['user', 'branch']);
    }

    public function update(MemberRequest $request, Member $member)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $member) {
            $userUpdate = array_filter([
                'name' => $data['name'] ?? null,
                'email' => $data['email'] ?? null,
                'password' => isset($data['password']) ? Hash::make($data['password']) : null,
            ]);

            if ($userUpdate) {
                $member->user->update($userUpdate);
            }

            $member->update([
                'branch_id' => $data['branch_id'] ?? $member->branch_id,
                'phone' => $data['phone'] ?? $member->phone,
                'address' => $data['address'] ?? $member->address,
            ]);
        });

        return $member->fresh(['user', 'branch']);
    }

    public function destroy(Member $member)
    {
        $member->user->delete();

        return response()->json(null, 204);
    }
}
