const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 9876;

let storedNumbers = [];
const WINDOW_SIZE = 10;

app.use(express.json());

// Function to generate prime numbers
function generatePrimes() {
    return [2, 3, 5, 7, 11]; // Sample prime numbers
}

// Function to generate Fibonacci numbers
function generateFibonacci() {
    return [55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]; // Sample Fibonacci numbers
}

// Function to calculate average of numbers
function calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Route to handle requests for different types of numbers
app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;
    let newData = [];

    switch (numberid) {
        case 'p':
            newData = generatePrimes();
            break;
        case 'f':
            newData = generateFibonacci();
            break;
        default:
            res.status(400).json({ error: "Invalid number ID" });
            return;
    }

    storedNumbers = [...storedNumbers, ...newData].slice(-WINDOW_SIZE);
    const prevNumbers = storedNumbers.slice(0, storedNumbers.length - newData.length);
    const currNumbers = storedNumbers.slice(storedNumbers.length - newData.length);
    const avg = calculateAverage(storedNumbers);

    res.json({
        windowPrevState: prevNumbers,
        windowCurrState: currNumbers,
        avg: avg.toFixed(2)
    });
});

app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});

function generatePrimes() {
    return [2, 3, 5, 7, 11]; // Sample prime numbers
}

function generateFibonacci() {
    return [55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]; // Sample Fibonacci numbers
}