<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

class ResponseFormatter
{
    /**
     * Format a success response - returns data as-is (backward compatible)
     *
     * @param mixed $data
     * @param int $statusCode
     * @return JsonResponse
     */
    public static function success($data = null, int $statusCode = 200): JsonResponse
    {
        return response()->json($data, $statusCode);
    }

    /**
     * Format an error response
     *
     * @param string $message
     * @param int $statusCode
     * @param mixed $error
     * @return JsonResponse
     */
    public static function error(string $message = 'Error', int $statusCode = 400, $error = null): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $message
        ];

        if ($error) {
            $response['error'] = $error;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Format a service response array to JSON (passes through as-is)
     *
     * @param array $serviceResponse
     * @param int $successCode
     * @param int $errorCode
     * @return JsonResponse
     */
    public static function fromServiceResponse(array $serviceResponse, int $successCode = 200, int $errorCode = 400): JsonResponse
    {
        $statusCode = $serviceResponse['success'] ? $successCode : $errorCode;
        
        return static::success($serviceResponse, $statusCode);
    }
}
