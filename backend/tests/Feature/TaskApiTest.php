<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_create_task_through_api()
    {
        $response = $this->postJson('/api/tasks', [
            'title' => 'API Test Task',
            'description' => 'This task was created through the API',
        ]);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'success',
                    'message',
                    'task' => [
                        'id',
                        'title',
                        'description',
                        'priority',
                        'status',
                    ],
                ])
                ->assertJson([
                    'success' => true,
                    'message' => 'Task created successfully',
                ]);

        $this->assertDatabaseHas('tasks', [
            'title' => 'API Test Task',
            'description' => 'This task was created through the API',
        ]);
    }

    /** @test */
    public function create_task_validation_error_missing_title()
    {
        $response = $this->postJson('/api/tasks', [
            'description' => 'This task has no title',
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['title']);
    }

    /** @test */
    public function create_task_with_minimal_data()
    {
        $response = $this->postJson('/api/tasks', [
            'title' => 'Minimal Task',
        ]);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'task' => [
                        'title' => 'Minimal Task',
                        'priority' => 'medium',
                        'status' => 'pending',
                    ],
                ]);
    }
}
