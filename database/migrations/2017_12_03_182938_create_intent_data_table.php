<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIntentDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('intent_data', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('intent_id')->unsigned()->nullable();
            $table->tinyInteger('active')->default(1);
            $table->timestamps();
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
        Schema::dropIfExists('intent_data');
    }
}
