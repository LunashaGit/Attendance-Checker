<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'circumstance',
        'dateBegin',
        'dateEnd',
        'timeBegin',
        'timeEnd',
        'file',
        'description',
        'attendances',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attendances()
    {
        return $this->belongsTo(Attendance::class);
    }

}
