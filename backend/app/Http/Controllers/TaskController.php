<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    private TaskService $taskService;

    /**
     * Constructor with dependency injection
     */
    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

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
        
        $result = $this->taskService->createTask($validated);
        
        return response()->json($result, 201);
    }

    /**
     * Get the 5 most recent tasks ordered by ID.
     *
     * @return JsonResponse
     */
    public function recent(): JsonResponse
    {
        $recentTasks = $this->taskService->getRecentTasks();
        
        return response()->json($recentTasks);
    }

    /**
     * Display a listing of all tasks.
     */
    public function index()
    {
        $tasks = $this->taskService->getAllTasks();
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
        $tasks = $this->taskService->getActiveTasks();
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
        $tasks = $this->taskService->getCompletedTasks();
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
        $stats = $this->taskService->getProgress();
        
        return response()->json($stats);
    }

    /**
     * Mark a task as done.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function markAsDone(int $id): JsonResponse
    {
        try {
            $result = $this->taskService->completeTask($id);
            
            $statusCode = $result['success'] ? 200 : 404;
            
            return response()->json($result, $statusCode);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error marking task as done',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified task.
     */
    public function show($id)
    {
        $result = $this->taskService->getTaskById($id);
        
        if (!$result['success']) {
            return response()->json($result, 404);
        }

        return response()->json($result['task']);
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

        $result = $this->taskService->updateTask($id, $request->all());
        
        if (!$result['success']) {
            return response()->json($result, 404);
        }

        return response()->json($result['task']);
    }

    /**
     * Remove the specified task.
     */
    public function destroy($id)
    {
        try {
            $result = $this->taskService->deleteTask($id);
            
            $statusCode = $result['success'] ? 200 : 404;
            
            return response()->json($result, $statusCode);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting task',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
