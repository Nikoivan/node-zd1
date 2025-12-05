#!/usr/bin/env node


import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const min = 0;
const max = 100;

const random = Math.floor(Math.random() * (max - min + 1)) + min;

console.log(`Загадано число в диапазоне от ${min} до ${max}`);

function ask() {
    rl.question("", (answer) => {
        const num = Number(answer);

        if (Number.isNaN(num)) {
            console.log("Введите число!");
            return ask();
        }

        if (num > random) {
            console.log("Меньше");
            return ask();
        }

        if (num < random) {
            console.log("Больше");
            return ask();
        }

        console.log(`Отгадано число ${random}`);
        rl.close();
    });
}

ask();
