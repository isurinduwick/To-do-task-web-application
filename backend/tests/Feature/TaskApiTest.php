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

    /** @test */
    public function can_get_all_tasks()
    {
        Task::factory()->count(5)->create();

        $response = $this->getJson('/api/tasks/all');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'tasks' => [
                        '*' => [
                            'id',
                            'title',
                            'description',
                            'status'
                        ]
                    ],
                    'count'
                ])
                ->assertJsonCount(5, 'tasks');
    }

    /** @test */
    public function can_get_active_tasks()
    {
        Task::factory()->create(['completed' => false]);
        Task::factory()->create(['completed' => false]);
        Task::factory()->create(['completed' => true]);

        $response = $this->getJson('/api/tasks/active');

        $response->assertStatus(200)
                ->assertJsonCount(2, 'tasks')
                ->assertJson(['count' => 2]);
    }

    /** @test */
    public function can_get_completed_tasks()
    {
        Task::factory()->create(['completed' => false]);
        Task::factory()->count(2)->create(['completed' => true]);

        $response = $this->getJson('/api/tasks/completed');

        $response->assertStatus(200)
                ->assertJsonCount(2, 'tasks')
                ->assertJson(['count' => 2]);
    }

    /** @test */
    public function can_get_task_progress()
    {
        Task::factory()->count(4)->create(['completed' => false]);
        Task::factory()->count(1)->create(['completed' => true]);

        $response = $this->getJson('/api/tasks/progress');

        $response->assertStatus(200)
                ->assertJson([
                    'total' => 5,
                    'completed' => 1,
                    'pending' => 4,
                    'percentage' => 20
                ]);
    }

    /** @test */
    public function can_mark_task_as_done()
    {
        $task = Task::factory()->create(['completed' => false, 'status' => 'pending']);

        $response = $this->putJson("/api/tasks/{$task->id}/mark-as-done");

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'task' => [
                        'id' => $task->id,
                        'completed' => true,
                        'status' => 'completed'
                    ]
                ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'completed' => true,
            'status' => 'completed'
        ]);
    }

    /** @test */
    public function mark_as_done_returns_404_for_nonexistent_task()
    {
        $response = $this->putJson("/api/tasks/999/mark-as-done");

        $response->assertStatus(404);
    }

    /** @test */
    public function can_delete_task()
    {
        $task = Task::factory()->create();

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Task deleted successfully'
                ]);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    /** @test */
    public function delete_returns_404_for_nonexistent_task()
    {
        $response = $this->deleteJson("/api/tasks/999");

        $response->assertStatus(404);
    }

    /** @test */
    public function can_show_single_task()
    {
        $task = Task::factory()->create();

        $response = $this->getJson("/api/tasks/{$task->id}");

        $response->assertStatus(200)
                ->assertJson([
                    'id' => $task->id,
                    'title' => $task->title,
                    'description' => $task->description
                ]);
    }

    /** @test */
    public function show_returns_404_for_nonexistent_task()
    {
        $response = $this->getJson("/api/tasks/999");

        $response->assertStatus(404);
    }

    /** @test */
    public function can_update_task()
    {
        $task = Task::factory()->create([
            'title' => 'Original Title',
            'description' => 'Original Description'
        ]);

        $response = $this->putJson("/api/tasks/{$task->id}", [
            'title' => 'Updated Title',
            'description' => 'Updated Description'
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'id' => $task->id,
                    'title' => 'Updated Title',
                    'description' => 'Updated Description'
                ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated Title'
        ]);
    }

    /** @test */
    public function update_validates_title_max_length()
    {
        $task = Task::factory()->create();

        $response = $this->putJson("/api/tasks/{$task->id}", [
            'title' => str_repeat('a', 256)
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['title']);
    }

    /** @test */
    public function recent_tasks_limit_5()
    {
        Task::factory()->count(10)->create();

        $response = $this->getJson('/api/tasks/recent');
        $responseData = $response->json();

        $this->assertCount(5, $responseData);
    }

    /** @test */
    public function empty_list_returns_empty_array()
    {
        $response = $this->getJson('/api/tasks/recent');

        $response->assertStatus(200)
                ->assertJson([]);
    }

    /** @test */
    public function create_task_with_all_fields()
    {
        $response = $this->postJson('/api/tasks', [
            'title' => 'Complete Task',
            'description' => 'This is a complete task',
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
                        'status'
                    ]
                ]);

        $this->assertDatabaseHas('tasks', [
            'title' => 'Complete Task',
            'description' => 'This is a complete task',
            'priority' => 'medium',
            'status' => 'pending'
        ]);
    }
}
