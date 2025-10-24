<?php

namespace Tests\Unit\Models;

use App\Models\Task;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_task()
    {
        $task = Task::create([
            'title' => 'Test Task',
            'description' => 'This is a test task',
            'priority' => 'high',
            'status' => 'pending',
            'due_date' => '2023-12-31',
        ]);

        $this->assertInstanceOf(Task::class, $task);
        $this->assertEquals('Test Task', $task->title);
        $this->assertEquals('This is a test task', $task->description);
        $this->assertEquals('high', $task->priority);
        $this->assertEquals('pending', $task->status);
        $this->assertEquals('2023-12-31', $task->due_date);
    }

    /** @test */
    public function it_has_correct_fillable_attributes()
    {
        $fillable = ['title', 'description', 'priority', 'status', 'due_date'];
        
        $task = new Task();
        
        $this->assertEquals($fillable, $task->getFillable());
    }

    /** @test */
    public function can_create_task_with_fillable_attributes()
    {
        $task = Task::create([
            'title' => 'Test Task',
            'description' => 'Test Description',
            'priority' => 'high',
            'status' => 'pending'
        ]);

        $this->assertIsInt($task->id);
        $this->assertEquals('Test Task', $task->title);
        $this->assertEquals('Test Description', $task->description);
        $this->assertEquals('high', $task->priority);
        $this->assertEquals('pending', $task->status);
    }

    /** @test */
    public function task_table_name_is_correct()
    {
        $task = new Task();
        $this->assertEquals('tasks', $task->getTable());
    }

    /** @test */
    public function can_mass_assign_task_attributes()
    {
        $attributes = [
            'title' => 'Mass Assigned Task',
            'description' => 'Mass assigned description',
            'priority' => 'medium',
            'status' => 'completed'
        ];

        $task = Task::create($attributes);

        foreach ($attributes as $key => $value) {
            $this->assertEquals($value, $task->$key);
        }
    }

    /** @test */
    public function can_retrieve_task_by_id()
    {
        $task = Task::factory()->create();

        $retrieved = Task::find($task->id);

        $this->assertNotNull($retrieved);
        $this->assertEquals($task->id, $retrieved->id);
        $this->assertEquals($task->title, $retrieved->title);
    }

    /** @test */
    public function can_update_task_attributes()
    {
        $task = Task::factory()->create(['title' => 'Original']);

        $task->update(['title' => 'Updated']);

        $this->assertEquals('Updated', $task->title);
        $this->assertDatabaseHas('tasks', ['id' => $task->id, 'title' => 'Updated']);
    }

    /** @test */
    public function can_delete_task()
    {
        $task = Task::factory()->create();
        $taskId = $task->id;

        $task->delete();

        $this->assertDatabaseMissing('tasks', ['id' => $taskId]);
        $this->assertNull(Task::find($taskId));
    }

    /** @test */
    public function timestamps_are_disabled()
    {
        $task = new Task();
        $this->assertFalse($task->timestamps);
    }

    /** @test */
    public function can_query_tasks_by_priority()
    {
        Task::factory()->create(['priority' => 'high']);
        Task::factory()->create(['priority' => 'low']);
        Task::factory()->create(['priority' => 'high']);

        $highPriorityTasks = Task::where('priority', 'high')->get();

        $this->assertCount(2, $highPriorityTasks);
    }

    /** @test */
    public function can_query_tasks_by_status()
    {
        Task::factory()->create(['status' => 'pending']);
        Task::factory()->create(['status' => 'completed']);
        Task::factory()->create(['status' => 'pending']);

        $pendingTasks = Task::where('status', 'pending')->get();

        $this->assertCount(2, $pendingTasks);
    }
}
