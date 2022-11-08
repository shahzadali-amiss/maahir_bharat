<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// ALTER TABLE orders add COLUMN visitor_id varchar(25) not null
// ALTER TABLE `orders` CHANGE `final_price` `final_price` VARCHAR(11) NOT NULL;
// ALTER TABLE `orders` CHANGE `attributes` `attributes` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL;

// ALTER TABLE `orders` CHANGE `user_id` `user_id` INT NULL DEFAULT NULL;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->nullable();
            $table->string('pmt_id')->nullable();
            $table->integer('product_id');
            $table->integer('user_id')->nullable();
            $table->string('visitor_id')->nullable();
            $table->integer('quantity');
            $table->string('attributes')->nullable();
            $table->string('final_price');
            $table->string('delivery_address')->nullable();
            $table->boolean('is_in_cart')->default(true);
            $table->enum('status',['pending','hold','delivered'])->nullable();
            $table->string('order_time')->nullable();
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
        Schema::dropIfExists('orders');
    }
}
