<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStateIntentAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('state_intent_answers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('answer');
            $table->tinyInteger('active')->default(1);
            $table->dateTime('called_at');
            $table->tinyInteger('answer_type')->default(1); /* 1 intent, 2 quickreply */
            $table->timestamps();
            $table->integer('state_intents_id')->unsigned()->nullable();
            $table->foreign('state_intents_id')->references('id')->on('state_intents');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('state_intent_answers');
    }
}
