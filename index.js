require('console-table-printer');
const inquirer = require('inquirer');
const chalk = require('chalk');
const boxConsole = require('box-console');

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
    paymentLuxery: 0,
    totalPayment: 0,
};

let individualData = [];
let movieMap = {1: 'H4', 2: 'LO', 3: 'JW', 4: 'F2'};
let genreMap = {1: 'Co', 2: 'Ho', 3: 'Ac', 4: 'Ki'};
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
  individualData.push(individualObj);
};

const calcTicketNo = (genre, id, roomNumber, seatNumber) => {
  let genreUpdate = genre[0].toUpperCase() + genre[1].toLowerCase();
  let ticketNo = genreUpdate + movieMap[+id] + roomNumber + seatNumber;
  return ticketNo;
}

const calcMovieId = (id, seatNumber, roomNumber, period, day) => {
  let dayUpdate = day[0].toUpperCase() + day[1].toLowerCase();
  let movieId = seatNumber + roomNumber + movieMap[+id] + dayUpdate + period;
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
	if (+flavChoice["choose"] == 1) {
		popSalted.printTable();
		sizePop = await inquirer.prompt(size);
		if (sizePop["ques"] == "S")
			stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popSaltedS;
		if (sizePop["ques"] == "M")
			stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popSaltedM;
		if (sizePop["ques"] == "L")
			stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popSaltedL;
	} else if (+flavChoice["choose"] == 2) {
		popCheese.printTable();
		sizePop = await inquirer.prompt(size);
		if (sizePop["ques"] == "S")
			stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popCheeseS;
		if (sizePop["ques"] == "M")
			stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popCheeseM;
		if (sizePop["ques"] == "L")
			stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popCheeseL;
	} else if (+flavChoice["choose"] == 3) {
		popCaramel.printTable();
		sizePop = await inquirer.prompt(size);
		if (sizePop["ques"] == "S")
			stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popCaramelS;
		if (sizePop["ques"] == "M")
			stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popCaramelM;
		if (sizePop["ques"] == "L")
			stateOfCustomer.paymentLuxery += paymentLuxery.popPayment.popCaramelL;
	}
  return true;
}

const drinkChoice = async() => {
  console.log('\nDRINKS\n');
  let sizeDrink;
	let flavChoice = await inquirer.prompt(flavor);
	if (+flavChoice["choose"] == 1) {
		cocoCola.printTable();
		sizeDrink = await inquirer.prompt(size);
		if (sizeDrink["ques"] == "S")
			stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkCCS;
		if (sizeDrink["ques"] == "M")
			stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkCCM;
		if (sizeDrink["ques"] == "L")
			stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkCCL;
	} else if (+flavChoice["choose"] == 2) {
		coke.printTable();
		sizeDrink = await inquirer.prompt(size);
		if (sizeDrink["ques"] == "S")
			stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkCokeS;
		if (sizeDrink["ques"] == "M")
			stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkCokeM;
		if (sizeDrink["ques"] == "L")
			stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkCokeL;
	} else if (+flavChoice["choose"] == 3) {
		mountainDew.printTable();
		sizeDrink = await inquirer.prompt(size);
		if (sizeDrink["ques"] == "S")
			stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkMDS;
		if (sizeDrink["ques"] == "M")
			stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkMDM;
		if (sizeDrink["ques"] == "L")
			stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkMDL;
	} else if (+flavChoice["choose"] == 4) {
		sprite.printTable();
		sizeDrink = await inquirer.prompt(size);
		if (sizeDrink["ques"] == "S")
			stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkSpriteS;
		if (sizeDrink["ques"] == "M")
			stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkSpriteM;
		if (sizeDrink["ques"] == "L")
			stateOfCustomer.paymentLuxery += paymentLuxery.drinkPayment.drinkSpriteL;
	}
  return true;    
}

const nachosChoice = async() => {
  console.log("\nNACHOS\n");

	let flavChoice = await inquirer.prompt(flavor);
	if (+flavChoice["choose"] == 1)
		stateOfCustomer.paymentLuxery += paymentLuxery.nachosPayment.nachosSalted;
	if (+flavChoice["choose"] == 2)
		stateOfCustomer.paymentLuxery += paymentLuxery.nachosPayment.nachosCheese;
  return true;
}

const chocolateChoice = async() => {
  console.log("\nCHOCOLATES\n");
	let flavChoice = await inquirer.prompt(flavor);
	if (+flavChoice["choose"] == 1)
		stateOfCustomer.paymentLuxery += paymentLuxery.chocPayment.chocBounty;
	if (+flavChoice["choose"] == 2)
		stateOfCustomer.paymentLuxery += paymentLuxery.chocPayment.chocMars;
	if (+flavChoice["choose"] == 3)
		stateOfCustomer.paymentLuxery += paymentLuxery.chocPayment.chocGalaxy;
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
        let seat = calcSeatId(seatNumber['place'], movieAnswer['movie']);
        let movie = calcMovieId(movieAnswer['movie'], seatNumber['place'], movieAnswer['movie'], movieAnswer['period'], movieAnswer['day']);
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
      }
    } else {
      console.log("Already Booked!");
    }
    return true;
}

const main = async() => {
    let reply = await customerQuery();
    if (reply) {
      console.log(stateOfCustomer);
      console.log(individualData);
    }
}

main();