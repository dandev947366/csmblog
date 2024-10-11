<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cookie;
class Jwt
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        try {
            if ($request->hasCookie('access_token')) {
                $token = $request->cookie('access_token');
                $request->headers->set('Authorization', 'Bearer ' . $token);
            }
            if(!$token){
                return response()->json(['message'=>'Token is invalid or expired']);
            }
            // $user = auth()->userOrFail();
            $user = JWTAuth::parseToken()->authenticate();
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

    private function isTokenValid($token)
{
    // Implement your token validation logic here
    return true; // or false based on your validation
}

//     public function handle(Request $request, Closure $next): Response
// {
//     try {
//         if ($request->hasCookie('access_token')) {
//             $token = $request->cookie('access_token');
//             $request->headers->set('Authorization', 'Bearer ' . $token);
//         }

//         if (!$token) {
//             return response()->json(['message' => 'Token is invalid or expired'], 401);
//         }

//         // Try to authenticate the user using the token
//         $user = JWTAuth::parseToken()->authenticate();
//         if (!$user) {
//             return response()->json(['message' => 'User not found'], 404);
//         }
//     } catch (TokenExpiredException $e) {
//         // Attempt to refresh the token
//         try {
//             $newToken = JWTAuth::refresh(JWTAuth::getToken());
//             // Set the new token in the response cookie
//             Cookie::queue('access_token', $newToken, 60); // Valid for 60 minutes
//             // Authenticate the user with the new token
//             $user = JWTAuth::setToken($newToken)->toUser();
//         } catch (JWTException $e) {
//             return response()->json(['message' => 'Token refresh failed'], 401);
//         }
//     } catch (JWTException $e) {
//         return response()->json(['message' => 'Token is invalid'], 401);
//     }

//     return $next($request);
// }

}
