<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\Paginator;

class ApiResponse
{
    /**
     * Return a success response
     *
     * @param mixed $data
     * @param string $message
     * @param int $status
     * @return JsonResponse
     */
    public static function success($data = null, $message = 'Success', $status = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    /**
     * Return an error response
     *
     * @param string $message
     * @param array $errors
     * @param int $status
     * @return JsonResponse
     */
    public static function error($message = 'Error', $errors = [], $status = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $status);
    }

    /**
     * Return a not found response
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function notFound($message = 'Resource not found'): JsonResponse
    {
        return self::error($message, [], 404);
    }

    /**
     * Return a validation error response
     *
     * @param array $errors
     * @param string $message
     * @return JsonResponse
     */
    public static function validationError($errors = [], $message = 'Validation failed'): JsonResponse
    {
        return self::error($message, $errors, 422);
    }

    /**
     * Return a server error response
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function serverError($message = 'Internal server error'): JsonResponse
    {
        return self::error($message, [], 500);
    }

    /**
     * Return a paginated response
     *
     * @param mixed $data Paginated collection
     * @param string $message
     * @param int $status
     * @return JsonResponse
     */
    public static function paginated($data, $message = 'Data retrieved successfully', $status = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data->items(),
            'pagination' => [
                'total' => $data->total(),
                'per_page' => $data->perPage(),
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'from' => $data->firstItem(),
                'to' => $data->lastItem(),
                'has_more' => $data->hasMorePages()
            ]
        ], $status);
    }

    /**
     * Return a collection response with metadata
     *
     * @param array|\Illuminate\Database\Eloquent\Collection $items
     * @param int $count
     * @param string $message
     * @param array $meta Additional metadata
     * @param int $status
     * @return JsonResponse
     */
    public static function collection($items, $count = null, $message = 'Collection retrieved', $meta = [], $status = 200): JsonResponse
    {
        $count = $count ?? (is_array($items) ? count($items) : $items->count());

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $items,
            'meta' => array_merge([
                'count' => $count,
                'timestamp' => now()->toIso8601String()
            ], $meta)
        ], $status);
    }

    /**
     * Return a statistics/summary response
     *
     * @param array $stats
     * @param string $message
     * @param int $status
     * @return JsonResponse
     */
    public static function stats($stats, $message = 'Statistics retrieved', $status = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'statistics' => $stats,
            'timestamp' => now()->toIso8601String()
        ], $status);
    }

    /**
     * Return created response (201)
     *
     * @param mixed $data
     * @param string $message
     * @return JsonResponse
     */
    public static function created($data = null, $message = 'Resource created successfully'): JsonResponse
    {
        return self::success($data, $message, 201);
    }

    /**
     * Return updated response (200)
     *
     * @param mixed $data
     * @param string $message
     * @return JsonResponse
     */
    public static function updated($data = null, $message = 'Resource updated successfully'): JsonResponse
    {
        return self::success($data, $message, 200);
    }

    /**
     * Return deleted response (200)
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function deleted($message = 'Resource deleted successfully'): JsonResponse
    {
        return self::success(null, $message, 200);
    }

    /**
     * Return a filtered collection response
     *
     * @param array|\Illuminate\Database\Eloquent\Collection $items
     * @param array $filters Applied filters
     * @param string $message
     * @param int $status
     * @return JsonResponse
     */
    public static function filtered($items, $filters = [], $message = 'Filtered data retrieved', $status = 200): JsonResponse
    {
        $count = is_array($items) ? count($items) : $items->count();

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $items,
            'filters' => $filters,
            'meta' => [
                'count' => $count,
                'timestamp' => now()->toIso8601String()
            ]
        ], $status);
    }
}
