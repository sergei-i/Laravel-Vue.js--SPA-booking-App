<?php

use App\Bookable;
use App\Booking;
use Illuminate\Database\Seeder;

class BookingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // generate for each Bookable random Booking collection
        Bookable::all()->each(function (Bookable $bookable) {
            // generate one Booking model
            $booking = factory(Booking::class)->make();
            // generate Booking collection with helper collect
            $bookings = collect([$booking]);

            // make next booking starts when previous ends
            for ($i = 0; $i < random_int(1, 20); $i++) {
                $from = (clone $booking->to)->addDays(random_int(1, 14));
                $to = (clone $from)->addDays(random_int(1, 14));

                $booking = Booking::make([
                    'from' => $from,
                    'to' => $to,
                    'price' => random_int(200, 5000)
                ]);
                // each, push - laravel collection methods
                $bookings->push($booking);
            }

            $bookable->bookings()->saveMany($bookings);
        });
    }
}
