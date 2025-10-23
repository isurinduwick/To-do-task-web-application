<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Task;

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

    /**
     * Test the recent tasks endpoint.
     *
     * @return void
     */
    public function test_recent_tasks_endpoint()
    {
        // Create some older test tasks
        $olderTasks = Task::factory()->count(3)->create([
            'created_at' => now()->subDays(2)
        ]);
        
        // Create some newer tasks that should appear first in recent tasks
        $newerTasks = Task::factory()->count(2)->create([
            'created_at' => now()->subHours(1)
        ]);

        // Make request to the recent tasks endpoint
        $response = $this->getJson('/api/tasks/recent');

        // Assert the response is successful
        $response->assertStatus(200);
        
        // Assert the response contains the expected data structure
        $response->assertJsonStructure([
            '*' => [
                'id',
                'title',
                'description',
                'status',
                'created_at',
                'updated_at'
            ]
        ]);
        
        // Assert we have the correct number of tasks
        $responseData = $response->json();
        $this->assertCount(5, $responseData);
        
        // Assert tasks are sorted by recency (newest first)
        $this->assertEquals($newerTasks[1]->id, $responseData[0]['id']);
        $this->assertEquals($newerTasks[0]->id, $responseData[1]['id']);
    }
}
