<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ValidateCharacterLimitMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $maxTitleLength = 100;
        $maxDescriptionLength = 500;

        if ($request->has('title') && strlen($request->input('title')) > $maxTitleLength) {
            return response()->json([
                'message' => 'Title must not exceed ' . $maxTitleLength . ' characters.',
                'current_length' => strlen($request->input('title'))
            ], 422);
        }

        if ($request->has('description') && strlen($request->input('description')) > $maxDescriptionLength) {
            return response()->json([
                'message' => 'Description must not exceed ' . $maxDescriptionLength . ' characters.',
                'current_length' => strlen($request->input('description'))
            ], 422);
        }

        return $next($request);
    }
}
