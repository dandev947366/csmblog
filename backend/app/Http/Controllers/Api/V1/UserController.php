<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    public function index()
    {
         try {
            return response()->json(['users' => User::all()], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Unable to retrieve users.'], 500);
        }
    }
}
