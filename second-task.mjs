#!/usr/bin/env node

import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const min = 0;
const max = 100;

const random = Math.floor(Math.random() * (max - min + 1)) + min;

let attempts = 0;

console.log(`Загадано число в диапазоне от ${min} до ${max}`);
console.log("Введите число:");

process.on("SIGINT", () => {
    console.log("\nЗавершение работы. Пока!");
    rl.close();
    process.exit(0);
});


function ask() {
    rl.question("> ", (answer) => {
        attempts++;

        const num = Number(answer.trim());

        if (Number.isNaN(num)) {
            console.log("Введите корректное число!");
            return ask();
        }

        if (num < min || num > max) {
            console.log(`Число должно быть в диапазоне от ${min} до ${max}.`);
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

        console.log(`\n🎉 Отгадано число ${random}!`);
        console.log(`🔢 Количество попыток: ${attempts}`);
        rl.close();
    });
}

ask();
