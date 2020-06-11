<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Booking;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Booking::class, function (Faker $faker) {
    // use faker date, then put it on Carbon
    $from = Carbon::instance($faker->dateTimeBetween('-1 months', '+1 months'));
    // cloning Carbon instance and add some random days
    $to = (clone $from)->addDays(random_int(0, 14));
    return [
        'from' => $from,
        'to' => $to,
        'price' => random_int(200, 5000)
    ];
});
