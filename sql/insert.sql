 INSERT INTO loans  (
	firstName,
	lastName,
	email,
	loan_amount,
	purpose
) VALUES(
	'chisty',
	'shaik',
	'shaikchisty@gmail.com',
	13000,
	'personal'
), (
    'shoyab',
    'syed',
    'shoyab@kmail.me',
    45000,
    'education'
), (
    'imtiyaz',
    'shaik',
    'imtu@imail.be',
    8000000,
    'home-construction'
);

/*
output -
Chisty.Shaik@LAPTOP-989B070L MINGW64 ~/OneDrive/Desktop/loans-application (main)
$ node db.js 
DATABASE CONNECTED........
:: ERROR :: null
:: DB ROW :: {
  loan_id: 1,
  firstName: 'chisty',
  lastName: 'shaik',
  email: 'shaikchisty@gmail.com',
  loan_amount: 13000,
  purpose: 'personal',
  status: 'PENDING'
}
:: ERROR :: null
:: DB ROW :: {
  loan_id: 2,
  firstName: 'shoyab',
  lastName: 'syed',
  email: 'shoyab@kmail.me',
  loan_amount: 45000,
  purpose: 'education',
  status: 'PENDING'
}
:: ERROR :: null
:: DB ROW :: {
  loan_id: 3,
  firstName: 'imtiyaz',
  lastName: 'shaik',
  email: 'imtu@imail.be',
  loan_amount: 8000000,
  purpose: 'home-construction',
  status: 'PENDING'
}
:: ERROR :: null
:: DB ROW :: {
  loan_id: 4,
  firstName: 'rehan',
  lastName: 'shaik',
  email: 'shaikrehan@gmail.com',
  loan_amount: 15000,
  purpose: 'personal',
  status: 'PENDING'
}
*/