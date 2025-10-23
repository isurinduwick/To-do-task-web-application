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
}
