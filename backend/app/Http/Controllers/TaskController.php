<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Services\TaskService;
use App\Helpers\ApiResponse;
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
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);
            
            $result = $this->taskService->createTask($validated);
            
            return ApiResponse::created($result['task'], $result['message']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::validationError($e->errors());
        } catch (\Exception $e) {
            return ApiResponse::serverError($e->getMessage());
        }
    }

    /**
     * Get the 5 most recent tasks ordered by ID.
     *
     * @return JsonResponse
     */
    public function recent(): JsonResponse
    {
        try {
            $recentTasks = $this->taskService->getRecentTasks();
            
            return ApiResponse::collection($recentTasks, $recentTasks->count(), 'Recent tasks retrieved');
        } catch (\Exception $e) {
            return ApiResponse::serverError($e->getMessage());
        }
    }

    /**
     * Display a listing of all tasks.
     */
    public function index(): JsonResponse
    {
        try {
            $tasks = $this->taskService->getAllTasks();
            return ApiResponse::collection($tasks, $tasks->count(), 'All tasks retrieved');
        } catch (\Exception $e) {
            return ApiResponse::serverError($e->getMessage());
        }
    }

    /**
     * Display a listing of active tasks.
     */
    public function active(): JsonResponse
    {
        try {
            $tasks = $this->taskService->getActiveTasks();
            return ApiResponse::collection($tasks, $tasks->count(), 'Active tasks retrieved');
        } catch (\Exception $e) {
            return ApiResponse::serverError($e->getMessage());
        }
    }

    /**
     * Display a listing of completed tasks.
     */
    public function completed(): JsonResponse
    {
        try {
            $tasks = $this->taskService->getCompletedTasks();
            return ApiResponse::collection($tasks, $tasks->count(), 'Completed tasks retrieved');
        } catch (\Exception $e) {
            return ApiResponse::serverError($e->getMessage());
        }
    }

    /**
     * Get progress statistics.
     */
    public function progress(): JsonResponse
    {
        try {
            $stats = $this->taskService->getProgress();
            
            return ApiResponse::stats($stats, 'Progress statistics retrieved');
        } catch (\Exception $e) {
            return ApiResponse::serverError($e->getMessage());
        }
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
            
            if (!$result['success']) {
                return ApiResponse::notFound($result['message']);
            }
            
            return ApiResponse::updated($result['task'], $result['message']);
        } catch (\Exception $e) {
            return ApiResponse::serverError($e->getMessage());
        }
    }

    /**
     * Display the specified task.
     */
    public function show($id): JsonResponse
    {
        try {
            $result = $this->taskService->getTaskById($id);
            
            if (!$result['success']) {
                return ApiResponse::notFound($result['message']);
            }

            return ApiResponse::success($result['task'], 'Task retrieved');
        } catch (\Exception $e) {
            return ApiResponse::serverError($e->getMessage());
        }
    }

    /**
     * Update the specified task.
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $request->validate([
                'title' => 'string|max:255',
                'description' => 'nullable|string',
                'completed' => 'boolean'
            ]);

            $result = $this->taskService->updateTask($id, $request->all());
            
            if (!$result['success']) {
                return ApiResponse::notFound($result['message']);
            }

            return ApiResponse::updated($result['task'], $result['message']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::validationError($e->errors());
        } catch (\Exception $e) {
            return ApiResponse::serverError($e->getMessage());
        }
    }

    /**
     * Remove the specified task.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $result = $this->taskService->deleteTask($id);
            
            if (!$result['success']) {
                return ApiResponse::notFound($result['message']);
            }
            
            return ApiResponse::deleted($result['message']);
        } catch (\Exception $e) {
            return ApiResponse::serverError($e->getMessage());
        }
    }
}
