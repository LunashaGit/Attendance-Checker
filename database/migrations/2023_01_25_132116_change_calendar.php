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
        Schema::table('tech_talks', function (Blueprint $table) {
            $table->dropColumn('date_time');
            $table->date('date')->after('id');
            $table->time('time')->after('date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tech_talks', function (Blueprint $table) {
            $table->dropColumn('date');
            $table->dropColumn('time');
            $table->dateTime('date_time');
        });
    }
};
