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
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);
        // Attempt to create the token
        if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
        $user = auth()->user();
        $refreshTokenData = $this->refreshTokenData($user);
        $refreshToken = JWTAuth::getJWTProvider()->encode($refreshTokenData);
        return response()->json([
            'user' => new UserResource($user),
            'access_token' => $token,
            'refresh_token' => $refreshToken,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60 *240
        ]);
    }
    public function refresh(Request $request)
    {
        try {
            $user = auth()->user();
            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
            }
            $accessToken = auth()->refresh();
            $refreshTokenData = [
                'sub' => $user->id,
                'exp' => now()->addDays(30)->timestamp,
            ];
            $refreshToken = JWTAuth::getJWTProvider()->encode($refreshTokenData);
            $cookies = $this->setTokenAndRefreshTokenCookie($accessToken, $refreshToken);
            $tokenCookie = $cookies['tokenCookie'];
            $refreshCookie = $cookies['refreshTokenCookie'];
            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'address' => $user->address,
                    'image' => $user->image,
                ],
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
            ])->withCookie($tokenCookie)->withCookie($refreshCookie);
        } catch (TokenExpiredException $e) {
            return response()->json(['message' => 'Token has expired'], Response::HTTP_UNAUTHORIZED);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token is invalid'], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    private function setTokenAndRefreshTokenCookie($token, $refreshToken)
    {
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
    private function refreshTokenData($user)
    {
        return [
            'user_id' => $user->id,
            'expires_in' => time() + config('jwt.refresh_ttl'),
            'random' => time() . md5(rand())
        ];
    }
}
