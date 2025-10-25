<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';
    
    protected $fillable = [
        'title',
        'description',
        'status',
        'due_date'
    ];
    
    // Custom timestamps handling since we have non-standard timestamp fields
    public $timestamps = false;
}
