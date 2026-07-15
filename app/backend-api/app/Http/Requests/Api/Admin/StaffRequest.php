<?php

namespace App\Http\Requests\Api\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StaffRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $staff = $this->route('staff');
        $userId = $staff?->user_id;

        if ($this->isMethod('post')) {
            return [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'unique:users,email'],
                'password' => ['required', 'string', 'min:6'],
                'branch_id' => ['nullable', 'exists:branches,id'],
                'designation' => ['nullable', 'string', 'max:255'],
                'status' => ['sometimes', 'in:active,inactive,on_leave'],
            ];
        }

        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', Rule::unique('users', 'email')->ignore($userId)],
            'password' => ['sometimes', 'string', 'min:6'],
            'branch_id' => ['nullable', 'exists:branches,id'],
            'designation' => ['nullable', 'string', 'max:255'],
            'status' => ['sometimes', 'in:active,inactive,on_leave'],
        ];
    }
}
