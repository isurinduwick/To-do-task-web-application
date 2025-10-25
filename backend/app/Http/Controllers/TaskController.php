<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Services\TaskService;
use App\Http\Responses\ResponseFormatter;
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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        
        $result = $this->taskService->createTask($validated);
        
        return ResponseFormatter::fromServiceResponse($result, 201, 400);
    }

    /**
     * Get the 5 most recent tasks ordered by ID.
     *
     * @return JsonResponse
     */
    public function recent(): JsonResponse
    {
        $recentTasks = $this->taskService->getRecentTasks();
        
        return ResponseFormatter::success($recentTasks);
    }

    /**
     * Display a listing of all tasks.
     */
    public function index()
    {
        $tasks = $this->taskService->getAllTasks();
        return ResponseFormatter::success([
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
        return ResponseFormatter::success([
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
        return ResponseFormatter::success([
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
        
        return ResponseFormatter::success($stats);
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
            
            return ResponseFormatter::fromServiceResponse($result, 200, 404);
        } catch (\Exception $e) {
            return ResponseFormatter::error('Error marking task as done', 500, $e->getMessage());
        }
    }

    /**
     * Display the specified task.
     */
    public function show($id)
    {
        $result = $this->taskService->getTaskById($id);
        
        if (!$result['success']) {
            return ResponseFormatter::error($result['message'], 404);
        }

        return ResponseFormatter::success($result['task']);
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
            return ResponseFormatter::error($result['message'], 404);
        }

        return ResponseFormatter::success($result['task']);
    }

    /**
     * Remove the specified task.
     */
    public function destroy($id)
    {
        try {
            $result = $this->taskService->deleteTask($id);
            
            $statusCode = $result['success'] ? 200 : 404;
            
            return ResponseFormatter::success($result, $statusCode);
        } catch (\Exception $e) {
            return ResponseFormatter::error('Error deleting task', 500, $e->getMessage());
        }
    }
}
