<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\UserResource;
class AuthController extends Controller
{
    public function __construct()
    {
        // Uncomment if you need to protect routes with auth middleware
        // $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(AuthRequest $request)
    {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Email or password not correct'], Response::HTTP_UNAUTHORIZED);
        }
        $user = auth()->user();
        $accessTokenCookie = cookie(
            'access_token',
            $token,
            auth()->factory()->getTTL() * 1, // Token expiry time in minutes
            '/',
            null,
            config('app.env') === 'production', // Secure cookie in production
            true // HttpOnly cookie
        );

        return $this->respondWithToken($token, $user)->withCookie($accessTokenCookie);
    }

    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'user' => new UserResource($user),
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 5
        ]);
    }

    public function me(){
        return 1;
        // return response()->json(
        //     new UserResource(auth()->user())

        // );

    }
}
