<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStateIntentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('state_intents', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('state_id')->unsigned();
            $table->string('intent')->nullable();
            $table->string('action')->nullable();
            $table->string('entity')->nullable();
            $table->string('keyword')->nullable();
            $table->tinyInteger('type'); // freetext
           // $table->integer('intent_data')->unsigned()->nullable();
            $table->tinyInteger('active')->default(1);
            $table->timestamps();
            $table->foreign('state_id')->references('id')->on('states');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('state_intents');
    }
}
