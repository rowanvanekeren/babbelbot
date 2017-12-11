<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apps', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title')->unique();
            $table->string('unique_id');
            $table->string('fb_access_token')->nullable();
            $table->string('fb_verify_token')->nullable();
            $table->string('webhook')->nullable();
            $table->string('unique_id');
            $table->string('access_token');
            $table->string('server_token');
            $table->integer('user_id')->unsigned();
            $table->tinyInteger('active')->default(1);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apps');
    }
}
