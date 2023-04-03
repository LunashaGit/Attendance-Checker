<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'beginning',
        'lunch',
        'return',
        'end',
        'location',
        'absence_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
