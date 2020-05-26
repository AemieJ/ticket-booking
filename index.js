require('console-table-printer');
const inquirer = require('inquirer');
const chalk = require('chalk');
const boxConsole = require('box-console');

const movieTable = require('./scripts/movie');
const timingTable = require('./scripts/timings');
const seatTable = require('./scripts/seats');

console.log('Welcome to On Spot Ticket Booking System');

let stateOfCustomer = {
    nameOfCustomer: '',
    phoneNumber: 0,
    ticketNo: '',
    movieId: '',
    seatId: '',
    luxeryId: '',
    paymentLuxery: 0,
    totalPayment: 0,
};

let seatsChosen = [];
let movieMap = {1: 'H4', 2: 'LO', 3: 'JW', 4: 'F2'};
let cinemaMap = {1: 'Max', 2: 'Gold', 3: '3D'};

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

function calcMovieId(id, seatNumber, roomNumber, period, day) {
  let dayUpdate = day[0].toUpperCase() + day[1].toLowerCase();
  let movieId = seatNumber + roomNumber + movieMap[+id] + dayUpdate + period;
  stateOfCustomer.movieId = movieId;
}

function calcSeatId(seatNumber, roomNumber) {
  let seatId = roomNumber + seatNumber;
  stateOfCustomer.seatId = seatId;
}

async function customerQuery() {
    let initialAnswer = await inquirer.prompt(initialQuestion);
    if (initialAnswer['initial'] === '0') {
      let answers = await inquirer.prompt(customer);

      stateOfCustomer.nameOfCustomer = answers['name'];
      stateOfCustomer.phoneNumber = answers['phone'];

      console.log('List of movies in the theatre');
      movieTable.printTable();

      console.log('\nTime Periods for movies on any day');
      timingTable.printTable();
      console.log('\nChoose your movie by index and specific the period');
      let movieAnswer = await inquirer.prompt(movieDetails);
      
      console.log('\n Seats from A-C are VIP and cost extra.');
      seatTable.printTable();
      let message = chalk('              MOVIE SCREEN TO DISPLAY YOUR MOVIE                ');
      boxConsole([message]);
      console.log('\n');
      let seatAnswer = await inquirer.prompt(totalSeats);
      for(let _ = 0; _ < +seatAnswer['number']; ++_) {
        let seatNumber = await inquirer.prompt(seatDetails);
        calcSeatId(seatNumber['place'], movieAnswer['movie']);
        calcMovieId(movieAnswer['movie'], seatNumber['place'], movieAnswer['movie'], movieAnswer['period'], movieAnswer['day']);
        seatsChosen.push(seatNumber['place']);
      }
    } else {
      console.log("Already Booked!");
    }    
}

customerQuery();