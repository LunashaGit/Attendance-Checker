<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('attendances', function (Blueprint $table) {
            $table->time('beginning')->nullable()->change();
            $table->time('lunch')->nullable()->change();
            $table->time('return')->nullable()->change();
            $table->time('end')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('attendances', function (Blueprint $table) {
            $table->time('beginning')->nullable(false)->change();
            $table->time('lunch')->nullable(false)->change();
            $table->time('return')->nullable(false)->change();
            $table->time('end')->nullable(false)->change();
        });
    }
};
