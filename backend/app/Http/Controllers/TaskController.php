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

    /**
     * Get the 5 most recent tasks ordered by ID.
     *
     * @return JsonResponse
     */
    public function recent(): JsonResponse
    {
        $recentTasks = Task::orderBy('id', 'desc')
                          ->limit(5)
                          ->get();
        
        return response()->json([
            'success' => true,
            'tasks' => $recentTasks
        ]);
    }

    /**
     * Display a listing of all tasks.
     */
    public function index()
    {
        $tasks = Task::all();
        return response()->json([
            'tasks' => $tasks,
            'count' => $tasks->count()
        ]);
    }

    /**
     * Display a listing of active tasks.
     */
    public function active()
    {
        $tasks = Task::where('completed', false)->get();
        return response()->json([
            'tasks' => $tasks,
            'count' => $tasks->count()
        ]);
    }

    /**
     * Display a listing of completed tasks.
     */
    public function completed()
    {
        $tasks = Task::where('completed', true)->get();
        return response()->json([
            'tasks' => $tasks,
            'count' => $tasks->count()
        ]);
    }

    /**
     * Get progress statistics.
     */
    public function progress()
    {
        $total = Task::count();
        $completed = Task::where('completed', true)->count();
        
        $percentage = $total > 0 ? round(($completed / $total) * 100) : 0;
        
        return response()->json([
            'total' => $total,
            'completed' => $completed,
            'percentage' => $percentage
        ]);
    }

    /**
     * Display the specified task.
     */
    public function show($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    /**
     * Update the specified task.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean'
        ]);

        $task = Task::findOrFail($id);
        $task->update($request->all());
        
        return response()->json($task);
    }

    /**
     * Remove the specified task.
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        
        return response()->json(null, 204);
    }
}
