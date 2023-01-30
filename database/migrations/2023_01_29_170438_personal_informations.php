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

        Schema::create('personal_informations', function (Blueprint $table) {
            $table->id();
            $table->string('phone_number');
            $table->date('birth_date');
            $table->string('email_alias');
            $table->string('github');
            $table->string('github_link');
            $table->string('linkedin');
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('personal_information_id')->nullable()->after('id');
            $table->foreign('personal_information_id')->references('id')->on('personal_informations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['personal_information_id']);
            $table->dropColumn('personal_information_id');
        });

        Schema::dropIfExists('personal_informations');
    }
};
