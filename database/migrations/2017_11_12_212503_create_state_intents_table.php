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
            $table->string('parameter')->nullable();
            $table->string('keyword')->nullable();
            $table->tinyInteger('intent_type');
            $table->tinyInteger('response_type'); // freetext
           // $table->integer('intent_data')->unsigned()->nullable();
            $table->tinyInteger('active')->default(1);
            $table->timestamps();
            $table->foreign('state_id')->references('id')->on('states')->onDelete('cascade');
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
