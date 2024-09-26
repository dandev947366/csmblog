<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

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
