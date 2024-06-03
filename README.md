# Parking Lot System

This is an automated ticketing system for a multi-storey parking lot, allowing customers to use the parking lot without human intervention.

## Features

- Create a parking lot with a specified number of slots.
- Park cars into the nearest available slot.
- Free up a slot when a car leaves.
- Get the current status of the parking lot.
- Find registration numbers of all cars of a particular color.
- Find slot numbers of all cars of a particular color.
- Find the slot number for a car with a given registration number.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

## Setup

1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

## Usage

You can use the parking lot system in two modes: Interactive mode and File input mode.

### Interactive Mode

To run the program and launch the shell interactively:

```sh
$ node index.js


> create_parking_lot 6
> park KA-01-HH-1234 White
> park KA-01-HH-9999 White
> park KA-01-BB-0001 Black
> leave 4
> status
> registration_numbers_for_cars_with_colour White
> slot_numbers_for_cars_with_colour White
> slot_number_for_registration_number KA-01-HH-3141
> exit



To run the application and accept input from a file:
node index.js index.txt  / node scrip.js file.txt
