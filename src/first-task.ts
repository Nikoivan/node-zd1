#!/usr/bin/env node
import yargs from "yargs";
import {hideBin} from "yargs/helpers";

type DateOptions = {
    year?: number;
    month?: number;
    date?: number;
};

const printISO = (date: Date): void => console.log(date.toISOString());

const getCurrent = (option?: "year" | "month" | "date"): void => {
    const date = new Date();
    switch (option) {
        case "year":
            console.log(date.getFullYear());
            break;
        case "month":
            console.log(date.getMonth() + 1);
            break;
        case "date":
            console.log(date.getDate());
            break;
        default:
            printISO(date);
    }
};

const modifyDate = (type: "add" | "sub", obj: DateOptions): void => {
    const date = new Date();
    const k = type === "add" ? 1 : -1;

    if (obj.year) date.setFullYear(date.getFullYear() + k * obj.year);
    if (obj.month) date.setMonth(date.getMonth() + k * obj.month);
    if (obj.date) date.setDate(date.getDate() + k * obj.date);

    printISO(date);
};

yargs(hideBin(process.argv))
    .command(
        "current",
        "Получить текущие дату/время",
        (yargs) =>
            yargs
                .option("year", { alias: "y", type: "boolean" })
                .option("month", { alias: "m", type: "boolean" })
                .option("date", { alias: "d", type: "boolean" }),
        (argv) => {
            if (argv.year) return getCurrent("year");
            if (argv.month) return getCurrent("month");
            if (argv.date) return getCurrent("date");
            return getCurrent();
        }
    )
    .command(
        "add",
        "Получить дату в будущем",
        (yargs) =>
            yargs
                .option("year", { alias: "y", type: "number" })
                .option("month", { alias: "m", type: "number" })
                .option("date", { alias: "d", type: "number" }),
        (argv) => {
            modifyDate("add", {
                year: argv.year,
                month: argv.month,
                date: argv.date,
            });
        }
    )
    .command(
        "sub",
        "Получить дату в прошлом",
        (yargs) =>
            yargs
                .option("year", { alias: "y", type: "number" })
                .option("month", { alias: "m", type: "number" })
                .option("date", { alias: "d", type: "number" }),
        (argv) => {
            modifyDate("sub", {
                year: argv.year,
                month: argv.month,
                date: argv.date,
            });
        }
    )
    .demandCommand(1)
    .strict()
    .parse();
