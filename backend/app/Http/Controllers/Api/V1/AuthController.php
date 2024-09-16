<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
class AuthController extends Controller
{
    public function __construct(){
        //$this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(Request $request){
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),


        ];
        return $credentials;
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
}
