<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    /**
     * Store a newly created task in the database.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        
        // Create a new task
        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'priority' => 'medium',  // Default value
            'status' => 'pending',   // Default value
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Task created successfully',
            'task' => $task
        ], 201);
    }
}
