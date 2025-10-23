<?php

namespace Tests\Unit\Http\Controllers;

use App\Http\Controllers\TaskController;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;
use Illuminate\Validation\ValidationException;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function store_creates_a_new_task()
    {
        $controller = new TaskController();
        
        $request = new Request([
            'title' => 'Test Task',
            'description' => 'This is a test description',
        ]);
        
        $response = $controller->store($request);
        $data = json_decode($response->getContent());
        
        $this->assertTrue($data->success);
        $this->assertEquals('Task created successfully', $data->message);
        $this->assertEquals('Test Task', $data->task->title);
        $this->assertEquals('This is a test description', $data->task->description);
        
        $this->assertDatabaseHas('tasks', [
            'title' => 'Test Task',
            'description' => 'This is a test description',
        ]);
    }

    /** @test */
    public function store_sets_default_values()
    {
        $controller = new TaskController();
        
        $request = new Request([
            'title' => 'Test Task',
            // No description provided
        ]);
        
        $response = $controller->store($request);
        $data = json_decode($response->getContent());
        
        $this->assertEquals('medium', $data->task->priority);
        $this->assertEquals('pending', $data->task->status);
        $this->assertNull($data->task->description);
    }
}
