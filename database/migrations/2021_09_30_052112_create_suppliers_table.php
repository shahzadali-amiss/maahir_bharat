<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuppliersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->integer('role_id');
            $table->string('gst_no')->nullable();
            $table->string('business_name')->nullable();
            $table->string('pan_no')->nullable();
            $table->string('business_type')->nullable();
            $table->string('supplier_name')->nullable();
            $table->string('supplier_mobile')->nullable();
            $table->integer('state')->nullable();
            $table->integer('city')->nullable();
            $table->string('image')->default('default.jpg');
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('suppliers');
    }
}
