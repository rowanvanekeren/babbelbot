<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStateIntentDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('state_intent_data', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('state_intents_id')->unsigned()->nullable();
            $table->tinyInteger('active')->default(1);
            $table->timestamps();
            $table->foreign('state_intents_id')->references('id')->on('state_intents')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('state_intent_data');
    }
}
