<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('states', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('dialogue_id')->unsigned();
            $table->string('next_states')->nullable();
            $table->tinyInteger('start_state')->default(0);

            $table->tinyInteger('active')->default(1);
            $table->timestamps();
            $table->foreign('dialogue_id')->references('id')->on('dialogues');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('states');
    }
}
