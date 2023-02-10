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
        Schema::table('sections', function (Blueprint $table) {
            $table->date('date_start_courses')->nullable();
            $table->date('date_end_courses')->nullable();
            $table->date('date_start_holiday1')->nullable();
            $table->date('date_end_holiday1')->nullable();
            $table->date('date_start_holiday2')->nullable();
            $table->date('date_end_holiday2')->nullable();
            $table->date('date_start_intership')->nullable();
            $table->date('date_end_intership')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sections', function (Blueprint $table) {
            $table->dropColumn('date_start_courses');
            $table->dropColumn('date_end_courses');
            $table->dropColumn('date_start_holiday1');
            $table->dropColumn('date_end_holiday1');
            $table->dropColumn('date_start_holiday2');
            $table->dropColumn('date_end_holiday2');
            $table->dropColumn('date_start_intership');
            $table->dropColumn('date_end_intership');
        });
    }
};
