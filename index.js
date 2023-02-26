const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const db = require("./db.js");

app.get('/', (req, res) => {
    res.json({
        status: true,
        method: "get",
        message: "loans API running successfully"
    });
});

// get all loan applications 
app.get('/loans', (req, res) => {

    db.serialize(() => {
        db.all(`SELECT * from loans `, (error, rows) => {
            if (error) {
                res.json({
                    status: false,
                    error: error
                });
            } else {
                res.json({
                    status: true,
                    loans: rows
                });
            };
        });
    });

})

//post api for new loan application
app.post('/new-loan', (req, res) => {
    const loanData = req.body;

    // const firstName = loanData.firstName ;
    // const lastName = loanData.lastName ;
    // const email = loanData.email;
    // const amount = loanData.amount ;
    // const purpose = loanData.purpose ;

    //we can use the above variables under a destructuring object 

    const { firstName, lastName, email, amount, purpose } = loanData;

    if (!firstName) {
        // return res.status(400).json({
        //     status : false,
        //     error : 'Please provide firstName'
        // });
        return sendErrorResponse(res, 'Please provide firstName');
    };

    if (!lastName) {
        // return res.status(400).json({
        //     status : false,
        //     error : 'Please provide lastName'
        // });
        return sendErrorResponse(res, 'Please provide lastName');
    };

    if (!email) {
        // return res.status(400).json({
        //     status : false,
        //     error : 'Please provide email'
        // });
        return sendErrorResponse(res, 'Please provide email');

    };

    if (!amount) {
        // return res.status(400).json({
        //     status : false,
        //     error : 'Please provide amount'
        // });
        return sendErrorResponse(res, 'Please provide amount');
    };

    if (!purpose) {
        // return res.status(400).json({
        //     status : false,
        //     error : 'Please provide purpose'
        // });
        return sendErrorResponse(res, 'Please provide purpose');
    };

    res.json({
        status: true,
        method: "post",
        data: loanData,
        message: "new loan application created successfully"
    });
});

//in the above code we have repeated the same code 5 times so rather than writing it multiple the same piece of code multiple times we can use a function.

function sendErrorResponse(response, errorMessage) {
    return response.status(400).json({
        status: false,
        error: errorMessage
    });
};

app.listen(3000, () => {
    console.log(`server running on http://localhost:3000`)
});
