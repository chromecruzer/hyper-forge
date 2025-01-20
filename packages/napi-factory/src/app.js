const express = require('express');
const app = express();
const port = 3000;

// Load the compiled addon
const addon = require('../build/Release/addon'); // CPP plugin
const { fibonacci, sum } = require('../bunvader/rustacean') // RS plugin   

// js Funtions
const jsAdd = (a, b) => a + b

// js fn()
console.time("Fibonacci Function JS");
console.log(jsAdd(200, 200))
console.timeEnd("Fibonacci Function JS");

// cpp fn()
console.time("Fibonacci Function CPP");
console.log(addon.add(200, 200))
console.timeEnd("Fibonacci Function CPP");

// rs fn()
console.time("Fibonacci Function RS");
console.log(sum(200, 200))
console.timeEnd("Fibonacci Function RS");

// Example route using the addon
app.get('/cpp', (req, res) => {
    try {
        // Assume the addon exports a function called `computeSomething`                    
        const result = addon.add(200, 200); // call your C++ function
        res.send(`<h1>CPP = ${result}</h1>`)
    } catch (error) {
        res.status(500).send({ error: 'Error in native addon function' });
    }
});

app.get('/rs', (req, res) => {
    try {
        // Assume the addon exports a function called `computeSomething`
        const result = sum(200, 200); // call your C++ function
        res.send(`<h1>RS = ${result}</h1>`)
    } catch (error) {
        res.status(500).send({ error: 'Error in native addon function' });
    }
});

app.get('/js', (req, res) => {
    try {
        // Assume the addon exports a function called `computeSomething`
        const result = jsAdd(200, 200); // call your C++ function
        res.send(`<h1>JS = ${result}</h1>`)
    } catch (error) {
        res.status(500).send({ error: 'Error in native addon function' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});