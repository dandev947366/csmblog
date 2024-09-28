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
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;

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
        $refreshTokenData = $this->refreshTokenData($user);

        // Encode refresh token
        $refresh_token = JWTAuth::getJWTProvider()->encode($refreshTokenData);

        $cookie = $this->setTokenAndRefreshTokenCookie($token, $refreshToken);
        $tokenCookie = $cookie['tokenCookie'];
        $refreshCookie = $cookie['refreshTokenCookie'];
        return $this->respondWithToken($token, $refreshCookie, $user)->withCookie($tokenCookie)->withCookie($refreshCookie);

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

    public function refresh(Request $request)
    {
        try {
            if ($request->hasCookie('access_token')) {
                $token = $request->cookie('access_token');
                $request->headers->set('Authorization', 'Bearer ' . $token);
            }
            $user = JWTAuth::parseToken()->authenticate();
            $token = auth()->refresh();

            $refreshTokenData = $this->refreshTokenData($user);
            $refreshToken = JWTAuth::getJWTProvider()->encode($refreshTokenData);
            $cookie = $this->setTokenAndRefreshTokenCookie($token, $refreshToken);
            $tokenCookie = $cookie['tokenCookie'];
            $refreshCookie = $cookie['refreshTokenCookie'];
            return $this->respondWithToken($token, $refreshCookie, $user)->withCookie($tokenCookie)->withCookie($refreshCookie);
        } catch (TokenExpiredException $e) {

            if ($request->hasCookie('refresh_token')) {
                $refreshTokenCookie = $request->cookie('refresh_token');
                $refreshTokenDecode = JWTAuth::getJWTProvider()->decode($refreshTokenCookie);
                $user = User::find($refreshTokenDecode['user_id']);
                $token = auth()->login($user);
                // Create refresh token data
                $refreshTokenData = $this->refreshTokenData($user);
                // Encode refresh token
                $refreshToken = JWTAuth::getJWTProvider()->encode($refreshTokenData);

                $cookie = $this->setTokenAndRefreshTokenCookie($token, $refreshToken);
                $tokenCookie = $cookie['tokenCookie'];
                $refreshCookie = $cookie['refreshTokenCookie'];
                return $this->respondWithToken($token, $refreshCookie, $user)->withCookie($tokenCookie)->withCookie($refreshCookie);
            }
            return response()->json(['message' => 'Token has expired'], 401);
        } catch (JWTException $e) {
            return response()->json(['messagge' => 'Token is invalid', 401]);
        } catch (\Exception $e) {
            return response()->json(['messagge' => 'Token not found', 401]);
        }
    }

    private function setTokenAndRefreshTokenCookie($token, $refreshToken){
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
            $refreshToken,
            config('jwt.refresh_ttl'), // Refresh token TTL in minutes
            '/',
            null,
            true, // Secure flag, set to false for development without HTTPS
            true, // HttpOnly
            false, // raw
            'None' // SameSite attribute
        );
        return [
            'tokenCookie' => $cookie,
            'refreshTokenCookie' => $refreshCookie
        ];

    }

    private function refreshTokenData($user) {
        return [
            'user_id' => $user->id,
            'expires_in'=>time()+config('jwt.refresh_ttl'),
            'random' =>time().md5(rand())
        ];
    }

    private function refreshToken(){


    }
}
