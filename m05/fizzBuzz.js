/*
Author: Wolfgang Meyer
Filename: fizzBuzz.js
Date: 2024-10-01

Description:
This program prints the numbers from 1 to 100. For numbers divisible by 3, it prints "Fizz". 
For numbers divisible by 5 and not 3, it prints "Buzz". For numbers divisible by both 3 and 5, it prints "FizzBuzz".
*/

for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}
