

const fs = require('fs');
const readline = require('readline');

let arr = [];

function createParkingSlot(n) {
    for (let i = 1; i <= n; i++) {
        arr.push({ slot: i, registrationNo: null, color: null, status: false });
    }
    console.log(`Created a parking lot with ${n} slots`);
}

function park(registrationNo, color) {
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i].status) {
            arr[i].registrationNo = registrationNo;
            arr[i].color = color;
            arr[i].status = true;
            console.log(`Allocated slot number: ${arr[i].slot}`);
            return;
        }
    }
    console.log("Sorry, parking lot is full");
}

function leave(slot) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].slot == slot) {
            arr[i].status = false;
            arr[i].registrationNo = null;
            arr[i].color = null;
            console.log(`Slot number ${slot} is free`);
            return;
        }
    }
    console.log(`Slot number ${slot} not found`);
}

function status() {
    console.log("Slot No.  Registration No  Colour");
    arr.forEach(({ status, slot, registrationNo, color }) => {
        if (status) {
            console.log(`${slot}        ${registrationNo}      ${color}`);
        }
    });
}

function registrationNumbersForCarsWithColour(color) {
    let result = [];
    arr.forEach((elem) => {
        if (elem.color == color) {
            result.push(elem.registrationNo);
        }
    });
    console.log(result.length == 0 ? "Not found" : result.join(", "));
}

function slotNumbersForCarsWithColour(color) {
    let result = [];
    arr.forEach((elem) => {
        if (elem.color == color) {
            result.push(elem.slot);
        }
    });
    console.log(result.length == 0 ? "Not found" : result.join(", "));
}

function slotNumberForRegistrationNumber(number) {
    for (let elem of arr) {
        if (elem.registrationNo == number) {
            console.log(elem.slot);
            return;
        }
    }
    console.log("Not found");
}

function executeCommand(command) {
    const [action, ...params] = command.split(' ');

    switch (action) {
        case 'create_parking_lot':
            createParkingSlot(parseInt(params[0]));
            break;
        case 'park':
            park(params[0], params[1]);
            break;
        case 'leave':
            leave(parseInt(params[0]));
            break;
        case 'status':
            status();
            break;
        case 'registration_numbers_for_cars_with_colour':
            registrationNumbersForCarsWithColour(params[0]);
            break;
        case 'slot_numbers_for_cars_with_colour':
            slotNumbersForCarsWithColour(params[0]);
            break;
        case 'slot_number_for_registration_number':
            slotNumberForRegistrationNumber(params[0]);
            break;
        default:
            console.log(`Unknown command: ${command}`);
            break;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
});

if (process.argv.length > 2) {
    const filename = process.argv[2];
    const input = fs.createReadStream(filename);
    const fileInterface = readline.createInterface({
        input: input,
        output: process.stdout,
        terminal: false
    });

    fileInterface.on('line', (line) => {
        const command = line.trim();
        if (command) {
            executeCommand(command);
        }
    });

    fileInterface.on('close', () => {
        console.log('Finished processing file');
        process.exit(0);
    });
} else {
    rl.prompt();

    rl.on('line', (line) => {
        const command = line.trim();
        if (command === 'exit') {
            rl.close();
            return;
        }
        executeCommand(command);
        rl.prompt();
    }).on('close', () => {
        console.log('Have a great day!');
        process.exit(0);
    });
}
