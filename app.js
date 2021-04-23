const hourInput = document.querySelector('#hour');
const minInput = document.querySelector('#minutes');
const secInput = document.querySelector('#seconds'); 
const form = document.querySelector('#setup-form');
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset'); 
const display = document.querySelector('#display');

let interval; 

const hours = {
    input: document.querySelector("#hours"),
    value: "",
  };
