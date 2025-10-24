<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;

class TaskRepository
{
    /**
     * Get all tasks
     *
     * @return Collection
     */
    public function all(): Collection
    {
        return Task::all();
    }

    /**
     * Get recent tasks limited to N items
     *
     * @param int $limit
     * @return Collection
     */
    public function recent(int $limit = 5): Collection
    {
        return Task::orderBy('id', 'desc')
                   ->limit($limit)
                   ->get();
    }

    /**
     * Get active (pending) tasks
     *
     * @return Collection
     */
    public function getActive(): Collection
    {
        return Task::where('completed', false)->get();
    }

    /**
     * Get completed tasks
     *
     * @return Collection
     */
    public function getCompleted(): Collection
    {
        return Task::where('completed', true)->get();
    }

    /**
     * Create a new task
     *
     * @param array $data
     * @return Task
     */
    public function create(array $data): Task
    {
        return Task::create($data);
    }

    /**
     * Find task by ID
     *
     * @param int $id
     * @return Task|null
     */
    public function findById(int $id): ?Task
    {
        return Task::find($id);
    }

    /**
     * Update a task
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $task = $this->findById($id);
        
        if (!$task) {
            return false;
        }

        return $task->update($data);
    }

    /**
     * Delete a task
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $task = $this->findById($id);
        
        if (!$task) {
            return false;
        }

        return $task->delete();
    }

    /**
     * Mark task as done
     *
     * @param int $id
     * @return bool
     */
    public function markAsDone(int $id): bool
    {
        return $this->update($id, [
            'completed' => true,
            'status' => 'completed'
        ]);
    }

    /**
     * Get task counts for progress tracking
     *
     * @return array
     */
    public function getProgressStats(): array
    {
        $total = $this->countAll();
        $completed = $this->countCompleted();
        $pending = $this->countPending();

        return [
            'total' => $total,
            'completed' => $completed,
            'pending' => $pending,
            'percentage' => $total > 0 ? round(($completed / $total) * 100) : 0
        ];
    }

    /**
     * Count all tasks
     *
     * @return int
     */
    public function countAll(): int
    {
        return Task::count();
    }

    /**
     * Count completed tasks
     *
     * @return int
     */
    public function countCompleted(): int
    {
        return Task::where('completed', true)->count();
    }

    /**
     * Count pending tasks
     *
     * @return int
     */
    public function countPending(): int
    {
        return Task::where('completed', false)->count();
    }
}
