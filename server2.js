//Assignment 3 Question 1

// Import necessary modules
const express = require('express');

// Create Express app
const app = express();
const port = 5233;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function A: findSummation
function findSummation(N) {
    if (typeof N !== 'number' || N <= 0) {
        return false;
    }
    let summation = 0;
    for (let i = 1; i <= N; i++) {
        summation += i;
    }
    return summation;
}

// Function B: uppercaseFirstandLast
function uppercaseFirstandLast(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1, -1) + word.charAt(word.length - 1).toUpperCase();
    }).join(' ');
}

// Function C: findAverageAndMedian
function findAverageAndMedian(arr) {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    const average = sum / arr.length;
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const median = arr.length % 2 === 0 ? (sortedArr[arr.length / 2 - 1] + sortedArr[arr.length / 2]) / 2 : sortedArr[Math.floor(arr.length / 2)];
    return { average, median };
}

// Function D: find4Digits
function find4Digits(str) {
    const numbers = str.split(' ').map(Number);
    for (const num of numbers) {
        if (num >= 1000 && num <= 9999) {
            return num;
        }
    }
    return false;
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route for Function A
app.get('/findSummation/:N', (req, res) => {
    const { N } = req.params;
    const summation = findSummation(parseInt(N));
    res.send(summation !== false ? `Summation: ${summation}` : 'Invalid input');
});

// Route for Function B
app.post('/uppercaseFirstandLast', (req, res) => {
    const { str } = req.body;
    const modifiedStr = uppercaseFirstandLast(str);
    res.send(modifiedStr);
});

// Route for Function C
app.post('/findAverageAndMedian', (req, res) => {
    const { numbers } = req.body;
    const arr = numbers.split(',').map(Number);
    const result = findAverageAndMedian(arr);
    res.json(result);
});

// Route for Function D
app.post('/find4Digits', (req, res) => {
    const { numbers } = req.body;
    const result = find4Digits(numbers);
    res.send(result !== false ? `First four-digit number: ${result}` : 'No four-digit number found');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://soen.encs.concordia.ca:${port}`);
});




//********************************************************************************************* 
//Assignment 3 Question 2

const http = require('http');
const cookieParser = require('cookie-parser');

// Create HTTP server
const server = http.createServer((req, res) => {
    // Parse cookies
    const cookies = {};
    req.headers.cookie && req.headers.cookie.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        cookies[parts[0].trim()] = decodeURIComponent(parts[1]);
    });

    // Get the value of 'visits' cookie or set it to 0 if it doesn't exist
    const visits = cookies['visits'] ? parseInt(cookies['visits']) : 0;

    // Increment the 'visits' cookie
    res.setHeader('Set-Cookie', `visits=${visits + 1}; Path=/`);

    // Get current date and time
    const currentDate = new Date();
    const lastVisitDate = cookies['lastVisit'] ? new Date(cookies['lastVisit']) : null;

    // Set lastVisit cookie to current date and time
    res.setHeader('Set-Cookie', `lastVisit=${currentDate.toUTCString()}; Path=/`);

    // Set content type
    res.setHeader('Content-Type', 'text/html');

    // Build response
    let response = '';
    if (visits === 0) {
        // First visit
        response = 'Welcome to my webpage! It is your first time that you are here.';
    } else {
        // Subsequent visits
        response = `Hello, this is the ${visits} time that you are visiting my webpage.<br>`;
        if (lastVisitDate) {
            response += `Last time you visited my webpage on: ${lastVisitDate}<br>`;
        }
    }

    // Send response
    res.end(response);
});

// Listen on port 5233
const PORT = 5233;
server.listen(PORT, () => {
    console.log(`Server running at http://soen.encs.concordia.ca:${PORT}/`);
});


//********************************************************************************************* 
//Assignment 3 Question 3

const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Create HTTP server
const server2 = http.createServer((req, res) => {
    // Parse the URL and query parameters
    const parsedUrl = url.parse(req.url);
    const parsedQuery = querystring.parse(parsedUrl.query);

    // Check if the request is for the '/checkTelephoneNumber' endpoint
    if (parsedUrl.pathname === '/checkTelephoneNumber') {
        // Get the telephone number from the form data
        const telephoneNumber = parsedQuery.telephone;

        // Validate the telephone number format
        const isValidTelephoneNumber = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(telephoneNumber);

        // Send response based on validation result
        if (isValidTelephoneNumber) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Telephone number is correct.');
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Telephone number format is incorrect. Please use the format: ddd-ddd-dddd.');
        }
    } else {
        // For other endpoints, return 404 Not Found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Listen on port 5233
server2.listen(PORT, () => {
    console.log(`Server running at http://soen.encs.concordia.ca:${PORT}/`);
});
