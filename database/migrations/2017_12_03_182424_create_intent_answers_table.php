<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIntentAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('intent_answers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('answer');
            $table->tinyInteger('active')->default(1);
            $table->dateTime('called_at');
            $table->timestamps();
            $table->integer('intent_id')->unsigned()->nullable();
            $table->foreign('intent_id')->references('id')->on('intents')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('intent_answers');
    }
}
