// Basic UI Libraries
require('console-table-printer');
const inquirer = require('inquirer');
const chalk = require('chalk');
const boxConsole = require('box-console');
const mysql = require('mysql');
const util = require('util');
const config = require('./config/config');

const connection = mysql.createConnection(config);
const query = util.promisify(connection.query).bind(connection);

// Major Tables
const movieTable = require('./scripts/movie');
const timingTable = require('./scripts/timings');
const seatTable = require('./scripts/seats');
const luxeryTable = require('./scripts/luxery/luxery');
const cinemaTable = require('./scripts/cinema');

// Luxery Specific Tables
const popcorn = require('./scripts/luxery/popcorn/popcorn');
const nachos = require('./scripts/luxery/nachos/nachos');
const chocolate = require('./scripts/luxery/chocolate/chocolate');
const drink = require('./scripts/luxery/drink/drink');

// Flavor Specific Tables 
const popSalted = require('./scripts/luxery/popcorn/salted');
const popCheese = require('./scripts/luxery/popcorn/cheese');
const popCaramel = require('./scripts/luxery/popcorn/caramel');
const cocoCola = require('./scripts/luxery/drink/coco-cola');
const coke = require('./scripts/luxery/drink/coke');
const sprite = require('./scripts/luxery/drink/sprite');
const mountainDew = require('./scripts/luxery/drink/moutain-dew');

// Payment Details 
const paymentLuxery = require('./scripts/payment/luxery');
const paymentCinema = require('./scripts/payment/cinema');

console.log('Welcome to On Spot Ticket Booking System');

let stateOfCustomer = {
    nameOfCustomer: '',
    phoneNumber: 0,
    luxeryId: '',
    cinemaType: 1,
    genre: '',
    movie: '',
    room: 0,
    day: '',
    time: '',
    paymentLuxery: 0,
    totalPayment: 0,
};

let individualData = [];
// Mappings
let movieMap = {1: 'H4', 2: 'LO', 3: 'JW', 4: 'F2'};
let movieFullMap = {1: 'Housefull 4', 2: 'Lights Out', 3: 'John Wick', 4: 'Frozen 2'};
let genreMap = {1: 'Co', 2: 'Ho', 3: 'Ac', 4: 'Ki'};
let genreFullMap = {1: 'Comedy', 2: 'Horror', 3: 'Action', 4: 'Kids'};
let fullDayMap = {'Mo': 'Monday', 'Tu': 'Tuesday', 'We': 'Wednesday', 'Th': 'Thursday', 'Fr': 'Friday', 
                  'Sa': 'Saturday', 'Su': 'Sunday'};
let timeStampMap = {'M': '10:00:00', 'A': '14:30:00', 'E': '18:00:00', 'N': '00:00:00'};
let luxeryCount = {popcorn: 0, nachos: 0, chocolate: 0, drink: 0};


// CLI QUESTIONS 
let initialQuestion = [{
  type: 'input',
  name: 'initial',
  message: 'Have you already booked your ticket? Answer 1 for yes and 0 for no '
}];

let customer = [{
  type: 'input',
  name: 'name',
  message: 'Enter your name: ',
}, {
  type: 'input', 
  name: 'phone',
  message: 'Enter your phone number: ',
}];

let movieDetails = [{
  type: 'input', 
  name: 'movie',
  message: 'Enter the movie by id: '
}, {
  type: 'input',
  name: 'period',
  message: 'Enter the time period you want to watch by index: '
}, {
  type: 'input',
  name: 'day', 
  message: 'Enter the day to watch movie using first 2 alpha: '
}, {
  type: 'input',
  name: 'time', 
  message: 'Enter the date to watch in the form YYYY-MM-DD: '
}, {
  type: 'input',
  name: 'type',
  message: 'Enter the type of cinema(1 for Max, 2 for Gold, 3 for 3D): '
}];

let totalSeats = [{
  type: 'input',
  name: 'number',
  message: 'Enter number of seats you want to book: '
}];

let seatDetails = [{
  type: 'input',
  name: 'place',
  message: 'Enter your seat number: '
}];

let luxery = [{
  type: 'input',
  name: 'ques',
  message: 'Want to order additional food or drinks? (1 for yes, 0 for no) '
}];

let chooseLuxery = [{
  type: 'input',
  name: 'ques',
  message: 'Enter the luxery by id: '
}]

let qty = [{ 
  type: 'input',
  name: 'ques',
  message: 'Enter the quantity: '
}];

let flavor = [{
  type: 'input',
  name: 'choose',
  message: 'Enter flavor by id: '
}]

let size =[{
  type: 'input',
  name: 'ques',
  message: 'Enter the size: '
}]
// CLI QUESTIONS END 

const calcIndividualData = (ticketNo, movieId, seatId) => {
  let individualObj = {ticketNo: ticketNo, movieId: movieId, seatId: seatId};
  if (seatId.indexOf('A') > -1 || seatId.indexOf('B') > -1 || seatId.indexOf('C') > -1) {
    individualObj.seatType = 'VIP';
  } else {
    individualObj.seatType = 'Normal';
  }
  individualData.push(individualObj);
};

const calcTicketNo = (genre, id, roomNumber, seatNumber) => {
  let genreUpdate = genre[0].toUpperCase() + genre[1].toLowerCase();
  let ticketNo = genreUpdate + movieMap[+id] + roomNumber + seatNumber;
  return ticketNo;
}

const calcMovieId = (id, seatNumber, roomNumber, period, day) => {
  let movieId = seatNumber + roomNumber + movieMap[+id] + day + period;
  return movieId;
}

const calcSeatId = (seatNumber, roomNumber) => {
  let seatId = roomNumber + seatNumber;
  return seatId;
}

const calcLuxeryId = () => {
  let uniqueUpdate = stateOfCustomer.phoneNumber.toString();
  stateOfCustomer.luxeryId = (luxeryCount.popcorn > 0 ? luxeryCount.popcorn + 'P' : '') + 
  (luxeryCount.nachos > 0 ? luxeryCount.nachos + 'N' : '') + 
  (luxeryCount.chocolate > 0 ? luxeryCount.chocolate + 'C' : '') + 
  (luxeryCount.drink > 0 ? luxeryCount.drink + 'D' : '') + uniqueUpdate.slice(uniqueUpdate.length - 4);
}

const popcornChoice = async() => {
  console.log('\nPOPCORN\n');
  let sizePop;
  let flavChoice = await inquirer.prompt(flavor);
  let popcornDetails;
	if (+flavChoice["choose"] == 1) {
		popSalted.printTable();
		sizePop = await inquirer.prompt(size);
		if (sizePop["ques"] == "S") {
      stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popSaltedS;
      popcornDetails = {size: 'S', type_of_popcorn: 'Salted', qty: luxeryCount.popcorn, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizePop["ques"] == "M") {
      stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popSaltedM;
      popcornDetails = {size: 'M', type_of_popcorn: 'Salted', qty: luxeryCount.popcorn, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizePop["ques"] == "L") {
      stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popSaltedL;
      popcornDetails = {size: 'L', type_of_popcorn: 'Salted', qty: luxeryCount.popcorn, phone_no: stateOfCustomer.phoneNumber};
    }
	} else if (+flavChoice["choose"] == 2) {
		popCheese.printTable();
		sizePop = await inquirer.prompt(size);
		if (sizePop["ques"] == "S") {
      stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popCheeseS;
      popcornDetails = {size: 'S', type_of_popcorn: 'Cheese', qty: luxeryCount.popcorn, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizePop["ques"] == "M") {
      stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popCheeseM;
      popcornDetails = {size: 'M', type_of_popcorn: 'Cheese', qty: luxeryCount.popcorn, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizePop["ques"] == "L") {
      stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popCheeseL;
      popcornDetails = {size: 'L', type_of_popcorn: 'Cheese', qty: luxeryCount.popcorn, phone_no: stateOfCustomer.phoneNumber};
    }
	} else if (+flavChoice["choose"] == 3) {
		popCaramel.printTable();
		sizePop = await inquirer.prompt(size);
		if (sizePop["ques"] == "S") {
      stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popCaramelS;
      popcornDetails = {size: 'S', type_of_popcorn: 'Caramel', qty: luxeryCount.popcorn, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizePop["ques"] == "M") {
      stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popCaramelM;
      popcornDetails = {size: 'S', type_of_popcorn: 'Caramel', qty: luxeryCount.popcorn, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizePop["ques"] == "L") {
      stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popCaramelL;
      popcornDetails = {size: 'S', type_of_popcorn: 'Caramel', qty: luxeryCount.popcorn, phone_no: stateOfCustomer.phoneNumber};
    }
  }
  let popcornAdd = 'INSERT INTO popcorn SET ?';
  try {
    await query(popcornAdd, popcornDetails);
  } finally {
    console.log('Added popcorn details');
  }
  return true;
}

const drinkChoice = async() => {
  console.log('\nDRINKS\n');
  let sizeDrink;
  let flavChoice = await inquirer.prompt(flavor);
  let drinkDetails;
	if (+flavChoice["choose"] == 1) {
		cocoCola.printTable();
		sizeDrink = await inquirer.prompt(size);
		if (sizeDrink["ques"] == "S") {
      stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkCCS;
      drinkDetails = {size: 'S', type_of_drink: 'Coco Cola', qty: luxeryCount.drink, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizeDrink["ques"] == "M") {
      stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkCCM;
      drinkDetails = {size: 'M', type_of_drink: 'Coco Cola', qty: luxeryCount.drink, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizeDrink["ques"] == "L") {
      stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkCCL;
      drinkDetails = {size: 'L', type_of_drink: 'Coco Cola', qty: luxeryCount.drink, phone_no: stateOfCustomer.phoneNumber};
    }
	} else if (+flavChoice["choose"] == 2) {
		coke.printTable();
		sizeDrink = await inquirer.prompt(size);
		if (sizeDrink["ques"] == "S") {
      stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkCokeS;
      drinkDetails = {size: 'S', type_of_drink: 'Coke', qty: luxeryCount.drink, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizeDrink["ques"] == "M") {
      stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkCokeM;
      drinkDetails = {size: 'M', type_of_drink: 'Coke', qty: luxeryCount.drink, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizeDrink["ques"] == "L") {
      stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkCokeL;
      drinkDetails = {size: 'L', type_of_drink: 'Coke', qty: luxeryCount.drink, phone_no: stateOfCustomer.phoneNumber};
    }
	} else if (+flavChoice["choose"] == 3) {
		mountainDew.printTable();
		sizeDrink = await inquirer.prompt(size);
		if (sizeDrink["ques"] == "S") {
      stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkMDS;
      drinkDetails = {size: 'S', type_of_drink: 'Mountain Dew', qty: luxeryCount.drink, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizeDrink["ques"] == "M") {
      stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkMDM;
      drinkDetails = {size: 'M', type_of_drink: 'Mountain Dew', qty: luxeryCount.drink, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizeDrink["ques"] == "L") {
      stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkMDL;
      drinkDetails = {size: 'L', type_of_drink: 'Mountain Dew', qty: luxeryCount.drink, phone_no: stateOfCustomer.phoneNumber};
    }
	} else if (+flavChoice["choose"] == 4) {
		sprite.printTable();
		sizeDrink = await inquirer.prompt(size);
		if (sizeDrink["ques"] == "S") {
      stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkSpriteS;
      drinkDetails = {size: 'S', type_of_drink: 'Sprite', qty: luxeryCount.drink, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizeDrink["ques"] == "M") {
      stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkSpriteM;
      drinkDetails = {size: 'M', type_of_drink: 'Sprite', qty: luxeryCount.drink, phone_no: stateOfCustomer.phoneNumber};
    }
		if (sizeDrink["ques"] == "L") {
      stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkSpriteL;
      drinkDetails = {size: 'L', type_of_drink: 'Sprite', qty: luxeryCount.drink, phone_no: stateOfCustomer.phoneNumber};
    }
  }
  let drinkAdd = 'INSERT INTO drink SET ?';
  try {
    await query(drinkAdd, drinkDetails);
  } finally {
    console.log('Added Drink Details');
  }
  return true;    
}

const nachosChoice = async() => {
  console.log("\nNACHOS\n");

  let flavChoice = await inquirer.prompt(flavor);
  let nachosDetails;
	if (+flavChoice["choose"] == 1) {
    stateOfCustomer.paymentLuxery += paymentLuxery.nachosPayment.nachosSalted;
    nachosDetails = {type_of_nachos: 'Salted', qty: luxeryCount.nachos, phone_no: stateOfCustomer.phoneNumber};
  }
	if (+flavChoice["choose"] == 2) {
    stateOfCustomer.paymentLuxery += paymentLuxery.nachosPayment.nachosCheese;
    nachosDetails = {type_of_nachos: 'Cheese', qty: luxeryCount.nachos, phone_no: stateOfCustomer.phoneNumber};
  }
  let nachosAdd = 'INSERT INTO nachos SET ?';
  try {
    await query(nachosAdd, nachosDetails);
  } finally {
    console.log('Nachos Details Added');
  }
  return true;
}

const chocolateChoice = async() => {
  console.log("\nCHOCOLATES\n");
  let flavChoice = await inquirer.prompt(flavor);
  let chocDetails;
	if (+flavChoice["choose"] == 1) {
    stateOfCustomer.paymentLuxery += paymentLuxery.chocPayment.chocBounty;
    chocDetails = {type_of_chocolate: 'Bounty', qty: luxeryCount.chocolate, phone_no: stateOfCustomer.phoneNumber};
  }
	if (+flavChoice["choose"] == 2) {
    stateOfCustomer.paymentLuxery += paymentLuxery.chocPayment.chocMars;
    chocDetails = {type_of_chocolate: 'Mars', qty: luxeryCount.chocolate, phone_no: stateOfCustomer.phoneNumber};
  }
	if (+flavChoice["choose"] == 3) {
    stateOfCustomer.paymentLuxery += paymentLuxery.chocPayment.chocGalaxy;
    chocDetails = {type_of_chocolate: 'Galaxy', qty: luxeryCount.chocolate, phone_no: stateOfCustomer.phoneNumber};
  }
  let chocAdd = 'INSERT INTO chocolate SET ?';
  try {
    await query(chocAdd, chocDetails);
  } finally {
    console.log('Added Chocolate Details');
  }
  return true;
}


const customerQuery = async() => {
    let initialAnswer = await inquirer.prompt(initialQuestion);
    if (initialAnswer['initial'] === '0') {
      let answers = await inquirer.prompt(customer);

      stateOfCustomer.nameOfCustomer = answers['name'];
      stateOfCustomer.phoneNumber = +answers['phone'];

      console.log('List of movies in the theatre');
      movieTable.printTable();

      console.log('\nPayment details depending on cinema type');
      cinemaTable.printTable();

      console.log('\nTime Periods for movies on any day');
      timingTable.printTable();
      console.log('\nChoose your movie by index and specific the period');
      let movieAnswer = await inquirer.prompt(movieDetails);
      stateOfCustomer.cinemaType = +movieAnswer['type'];
      if (+movieAnswer['type'] == 1) stateOfCustomer.totalPayment += paymentCinema.cinemaType.max;
      if (+movieAnswer['type'] == 2) stateOfCustomer.totalPayment += paymentCinema.cinemaType.gold;
      if (+movieAnswer['type'] == 3) stateOfCustomer.totalPayment += paymentCinema.cinemaType.threeD;
      console.log('\n Seats from A-C are VIP and cost extra.');
      seatTable.printTable();
      let message = chalk('              MOVIE SCREEN TO DISPLAY YOUR MOVIE                ');
      boxConsole([message]);
      console.log('\n');
      let seatAnswer = await inquirer.prompt(totalSeats);
      for(let _ = 0; _ < +seatAnswer['number']; ++_) {
        let seatNumber = await inquirer.prompt(seatDetails);
        if (seatNumber['place'].indexOf('A') > -1 || seatNumber['place'].indexOf('B') > -1 || seatNumber['place'].indexOf('C') > -1) {
          stateOfCustomer.totalPayment += paymentCinema.seatType.vip;
        } else {
          stateOfCustomer.totalPayment += paymentCinema.seatType.normal;
        }
        stateOfCustomer.genre = genreFullMap[+movieAnswer['movie']];
        stateOfCustomer.movie = movieFullMap[+movieAnswer['movie']];
        let day = movieAnswer['day'];
        let key = day[0].toUpperCase() + day[1].toLowerCase();
        stateOfCustomer.day = fullDayMap[key];
        stateOfCustomer.room = +movieAnswer['movie'];
        stateOfCustomer.time = movieAnswer['time'] + ' ' + timeStampMap[movieAnswer['period']];
        let seat = calcSeatId(seatNumber['place'], movieAnswer['movie']);
        let movie = calcMovieId(movieAnswer['movie'], seatNumber['place'], movieAnswer['movie'], movieAnswer['period'], key);
        let ticket = calcTicketNo(genreMap[+movieAnswer['movie']], movieAnswer['movie'], movieAnswer['movie'], seatNumber['place']);
        calcIndividualData(ticket, movie, seat);
      }
      let luxeryAnswer = await inquirer.prompt(luxery);
      if (+luxeryAnswer['ques'] == 1) {
        luxeryTable.printTable();
        let numberOfLuxery = await inquirer.prompt(qty);
        for (let _ = 0; _ < +numberOfLuxery['ques']; ++_) {
          let ans = await inquirer.prompt(chooseLuxery);
          let choiceLuxery = +ans['ques'];
          if (choiceLuxery == 1) { 
            luxeryCount.popcorn += 1;
            popcorn.printTable();
            await popcornChoice();
          } else if (choiceLuxery == 2) {
            luxeryCount.nachos += 1;
            nachos.printTable();
            await nachosChoice();
          } else if (choiceLuxery == 3) {
            luxeryCount.chocolate += 1;
            chocolate.printTable();
            await chocolateChoice();
          } else if (choiceLuxery == 4) {
            luxeryCount.drink += 1;
            drink.printTable();
            await drinkChoice();
          } else {
            console.log('Your choice was invalid.');
          }  
        }
        stateOfCustomer.totalPayment += stateOfCustomer.paymentLuxery;
        calcLuxeryId();
        let luxeryDetails = {
					id_luxery: stateOfCustomer.luxeryId,
					payment_luxery: stateOfCustomer.paymentLuxery,
					phone_no: stateOfCustomer.phoneNumber,
        };
        let luxeryAdd = 'INSERT INTO luxeries SET ?';
        try { 
          await query(luxeryAdd, luxeryDetails);
        } finally {
          console.log('Luxery Details Added');
        }
      }
    } else {
      console.log("Already Booked!");
    }
    return true;
}


const main = async() => {
    let reply = await customerQuery();
    if (reply) {
      individualData.forEach(async(data) => {
          let customerDetails = {
						customer_name: stateOfCustomer.nameOfCustomer,
						phone_no: stateOfCustomer.phoneNumber,
						ticket_no: data.ticketNo,
						total_payment: stateOfCustomer.totalPayment,
					};
					const customerAdd = "INSERT INTO customer SET ?";

					let movieDetails = {
						movie_id: data.movieId,
						genre: stateOfCustomer.genre,
						movie_name: stateOfCustomer.movie,
						room_no: stateOfCustomer.room,
						type_of_cinema: stateOfCustomer.cinemaType,
						day_of_show: stateOfCustomer.day,
						ts: stateOfCustomer.time,
					};
					const movieAdd = "INSERT INTO movie SET ?";

					let seatDetails = {
						seat_no: data.seatId,
						type_of_seat: data.seatType,
						phone_no: stateOfCustomer.phoneNumber,
						movie_id: data.movieId,
					};
					const seatAdd = "INSERT INTO seat SET ?";
    
          try {
            console.log('Adding Customer Details');
            await query(customerAdd, customerDetails);
            console.log('Adding Movie Details');
            await query(movieAdd, movieDetails);
            console.log('Adding Seat Details');
            await query(seatAdd, seatDetails);
          } finally {
            connection.end();
          }
      });
    }
}

main();