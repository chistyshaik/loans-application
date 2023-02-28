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
        const selectQuery = `SELECT * from loans `
        db.all(selectQuery, (error, rows) => {
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

    const insertSQL = `INSERT INTO loans(
        firstName,
        lastName,
        email,
        loan_amount,
        purpose
    ) VALUES(
        "${firstName}",
        "${lastName}",
        "${email}",
        "${amount}",
        "${purpose}"
    )`

    db.serialize(() => {
        db.exec(insertSQL, (error) => {
            if (error) {
                res.status(400).json({
                    status: false,
                    error: error
                });
            }
        })
    });

    res.json({
        status: true,
        method: "post",
        data: loanData,
        message: "new loan application created successfully",
        sql: insertSQL
    });
});

app.get('/new-loan/:id', (req, res) => {
    const loan_id = req.params.id;

    const sql = `SELECT * FROM loans WHERE loan_id=${loan_id} ;`;
    db.serialize(() => {
        //get (sql:string , callback? (this: statement, err:Error | null, row: any) => void): this;
        db.get(sql, (err, row) => {
            if (err || !row) {
                res.status(400).json({ status: false, error: `unable to load application with ${loan_id}` })
            } else {
                res.json({ status: true, loan: row })
            };
        });
    });
});

//in the above code we have repeated the same code 5 times so rather than writing it multiple the same piece of code multiple times we can use a function.

app.post('/new-loan/:id', (req, res) => {
    const loan_id = req.params.id;
    const requestBody = req.body;
    const status = requestBody.status;


    const sql = `
    UPDATE loans
    SET status = "${status}"
    WHERE loan_id= ${loan_id}
    `;

    db.serialize(() => {
        db.exec(sql, (error) => {
            console.log(error)
            if (error) {
                res.status(400).json({
                    status: false,
                    sql,
                    error: `Error while updating the loan for id ${loan_id}`
                })
            }else {
                res.json({
                    status: true,
                    message: "loan details updated successfully"
                })
            }
        })
    })

});


app.delete("/loans/:loanId", (req, res) => {
    const loan_id = req.params.loanId;
    const sql = `DELETE from loans WHERE loan_id=${loan_id}`;
  
    db.serialize(() => {
      db.exec(sql, (error) => {
        if(error) {
          return sendErrorResponse(res, "Can't delete the loan")
        } else {
          res.json({
            status: true,
            message: "Loan deleted..."
          })
        }
      })
    })
  
  })


function sendErrorResponse(response, errorMessage) {
    return response.status(400).json({
        status: false,
        error: errorMessage
    });
};

app.listen(4000, () => {
    console.log(`server running on http://localhost:3000`)
});
