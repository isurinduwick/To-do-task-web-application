<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
//midleware
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Task routes - Protected by API key middleware
Route::middleware('api.key')->group(function () {
    // Specific routes first
    Route::get('/tasks/recent', [TaskController::class, 'recent']);
    Route::get('/tasks/all', [TaskController::class, 'index']);
    Route::get('/tasks/active', [TaskController::class, 'active']);
    Route::get('/tasks/completed', [TaskController::class, 'completed']);
    Route::get('/tasks/progress', [TaskController::class, 'progress']);

    // RESTful routes - Generic routes last
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::put('/tasks/{id}/mark-as-done', [TaskController::class, 'markAsDone']);
    Route::get('/tasks/{id}', [TaskController::class, 'show']);
    Route::put('/tasks/{id}', [TaskController::class, 'update']);
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
});

