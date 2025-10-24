<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateApiKey
{
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = $request->header('X-API-Key');
        $expectedKey = env('API_KEY', '');
        
        if (empty($apiKey) || empty($expectedKey) || $apiKey !== $expectedKey) {
            return response()->json([
                'error' => 'Unauthorized - Invalid or missing API Key'
            ], 401);
        }

        return $next($request);
    }
}
