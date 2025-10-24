<?php

namespace App\Services;

use App\Repositories\TaskRepository;
use Illuminate\Database\Eloquent\Collection;

class TaskService
{
    private TaskRepository $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    /**
     * Get all tasks
     *
     * @return Collection
     */
    public function getAllTasks(): Collection
    {
        return $this->taskRepository->all();
    }

    /**
     * Get recent tasks
     *
     * @return Collection
     */
    public function getRecentTasks(): Collection
    {
        return $this->taskRepository->recent();
    }

    /**
     * Get active tasks
     *
     * @return Collection
     */
    public function getActiveTasks(): Collection
    {
        return $this->taskRepository->getActive();
    }

    /**
     * Get completed tasks
     *
     * @return Collection
     */
    public function getCompletedTasks(): Collection
    {
        return $this->taskRepository->getCompleted();
    }

    /**
     * Create new task with validation
     *
     * @param array $data
     * @return array
     */
    public function createTask(array $data): array
    {
        $validated = [
            'title' => $data['title'] ?? '',
            'description' => $data['description'] ?? null,
            'priority' => $data['priority'] ?? 'medium',
            'status' => $data['status'] ?? 'pending'
        ];

        $task = $this->taskRepository->create($validated);

        return [
            'success' => true,
            'task' => $task,
            'message' => 'Task created successfully'
        ];
    }

    /**
     * Update task
     *
     * @param int $id
     * @param array $data
     * @return array
     */
    public function updateTask(int $id, array $data): array
    {
        $task = $this->taskRepository->findById($id);

        if (!$task) {
            return [
                'success' => false,
                'message' => 'Task not found'
            ];
        }

        $this->taskRepository->update($id, $data);

        return [
            'success' => true,
            'task' => $this->taskRepository->findById($id),
            'message' => 'Task updated successfully'
        ];
    }

    /**
     * Complete a task
     *
     * @param int $id
     * @return array
     */
    public function completeTask(int $id): array
    {
        $task = $this->taskRepository->findById($id);

        if (!$task) {
            return [
                'success' => false,
                'message' => 'Task not found'
            ];
        }

        $this->taskRepository->markAsDone($id);

        return [
            'success' => true,
            'task' => $this->taskRepository->findById($id),
            'message' => 'Task marked as completed'
        ];
    }

    /**
     * Delete task
     *
     * @param int $id
     * @return array
     */
    public function deleteTask(int $id): array
    {
        $task = $this->taskRepository->findById($id);

        if (!$task) {
            return [
                'success' => false,
                'message' => 'Task not found'
            ];
        }

        $this->taskRepository->delete($id);

        return [
            'success' => true,
            'message' => 'Task deleted successfully'
        ];
    }

    /**
     * Get task progress statistics
     *
     * @return array
     */
    public function getProgress(): array
    {
        $stats = $this->taskRepository->getProgressStats();

        return array_merge($stats, ['count' => $stats['total']]);
    }

    /**
     * Get task with error handling
     *
     * @param int $id
     * @return array
     */
    public function getTaskById(int $id): array
    {
        $task = $this->taskRepository->findById($id);

        if (!$task) {
            return [
                'success' => false,
                'message' => 'Task not found'
            ];
        }

        return [
            'success' => true,
            'task' => $task
        ];
    }
}
