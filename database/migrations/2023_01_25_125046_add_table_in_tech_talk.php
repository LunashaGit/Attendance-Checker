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
            $table->string('commentary')->nullable()->change();
            $table->dateTime('date_time');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tech_talk', function (Blueprint $table) {
            $table->dropColumn('commentary');
            $table->dropColumn('date_time');
        });
    }
};
