<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalInformation extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone_number',
        'birth_date',
        'email_alias',
        'github',
        'github_link',
        'linkedin',
    ];

}
