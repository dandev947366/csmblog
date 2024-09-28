<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\UserResource;
use Tymon\JWTAuth\Facades\JWTAuth;

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

        // Create refresh token data
        $refreshTokenData = [
            'user_id' => $user->id,
            'expires_in' => time() + config('jwt.refresh_ttl') * 60, // Converting TTL to seconds
        ];

        // Encode refresh token
        $refresh_token = JWTAuth::getJWTProvider()->encode($refreshTokenData);

        // Create access token cookie
        $cookie = Cookie::make(
            'access_token',
            $token,
            auth()->factory()->getTTL() * 60 * 24, // Expiry time in minutes (converted to days)
            '/',
            null,
            true, // Secure flag, set to false for development without HTTPS
            true, // HttpOnly
            false, // raw
            'None' // SameSite attribute
        );

        // Create refresh token cookie
        $refreshCookie = Cookie::make(
            'refresh_token',
            $refresh_token,
            config('jwt.refresh_ttl'), // Refresh token TTL in minutes
            '/',
            null,
            true, // Secure flag, set to false for development without HTTPS
            true, // HttpOnly
            false, // raw
            'None' // SameSite attribute
        );

        // Return response with both cookies
        return $this->respondWithToken($token, $refresh_token, $user)->withCookie($cookie)->withCookie($refreshCookie);
    }

    protected function respondWithToken($token, $refresh_token, $user)
    {
        return response()->json([
            'user' => new UserResource($user),
            'access_token' => $token,
            'refresh_token' => $refresh_token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60 * 24 // mins * hrs
        ]);
    }

    public function me()
    {
        return response()->json(new UserResource(auth()->user()));
    }

    public function refresh()
    {
        try {
            if ($request->hasCookie('access_token')) {
                $token = $request->cookie('access_token');
                echo $token;die();
                $request->headers->set('Authorization', 'Bearer ' . $token);
            }
            if(!$token){
                return response()->json(['message'=>'Token is invalid or expired']);
            }
            $user = auth()->userOrFail();
            if(!$user){
                return response()->json(['message'=>'User not found']);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['message' => 'Token has expired'], 401);
        } catch (JWTException $e) {
            return response()->json(['messagge' => 'Token is invalid', 401]);
        } catch (\Exception $e) {
            return response()->json(['messagge' => 'Token not found', 401]);
        }
        return $next($request);
    }
}
