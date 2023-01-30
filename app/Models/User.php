<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'is_coach',
        'campuse_id',
        'job_id',
        'section_id',
        'github_id',
        'email_verified_at',
        'auth_type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function campuse()
    {
        return $this->belongsTo(Campuse::class);
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function personalInformation()
    {
        return $this->belongsTo(PersonalInformation::class);
    }

    public function techTalks()
    {
        return $this->hasMany(TechTalk::class);
    }

    public function github()
    {
        return $this->hasOne(Github::class);
    }

    public function isAdmin()
    {
        return $this->is_admin;
    }



}
