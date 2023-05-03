# ReactJS Banking Application
This is a simple banking application built using ReactJS. The application allows users to view their account balance, deposit money, and withdraw money in denominations of Rs. 100, Rs. 500, Rs. 1000, and Rs. 2000.

## Features
The application includes the following features:

Account Balance: The application displays the current account balance to the user.

Deposit Money: Users can deposit money by selecting the denomination and entering the number of notes they wish to deposit. The account balance is updated accordingly.

Withdraw Money: Users can withdraw money by entering the amount they wish to withdraw. The application validates that the requested amount is available in the account balance, and displays an error message if it is not. If the amount is available, the application dispenses the money in the minimum number of notes and updates the account balance accordingly.

## Technical Requirements
The application is built using ReactJS and uses local storage to persist the account balance and transaction history across page refreshes. The application is designed to be responsive and mobile-friendly.

## Installation
To run the application locally, you will need Node.js and npm (Node Package Manager) installed on your computer. You can download the latest version of Node.js from the official website: https://nodejs.org/en/download/

Clone or download the source code for the banking application.

Open a terminal or command prompt and navigate to the directory where you have stored the code.

Run the following command to install the necessary dependencies:
```
npm install
```
Once the installation is complete, run the following command to start the application:
```
npm start
```
The application should open in a web browser at the address http://localhost:3000/. If it does not automatically open, you can manually enter the address in your browser.

## Usage
Once the application is running, you can use it to view your account balance, deposit money, and withdraw money in denominations of Rs. 100, Rs. 500, Rs. 1000, and Rs. 2000.

The account balance and transaction history will be saved in local storage and will persist across page refreshes.


# Design choices:

ReactJS was chosen as the main framework for building the application due to its popularity and ease of use.
Local storage was used to persist the account balance and transaction history across page refreshes, as this was a requirement specified in the prompt.
To ensure that only valid denominations were accepted for deposits and withdrawals, drop-down menus were used for selecting the denomination and input fields were used for entering the number of notes.
An error message was displayed if the user tried to withdraw an amount that was not available in the account balance or if the input amount was not a valid denomination.

# Challenges faced:

One of the main challenges was figuring out how to calculate the minimum number of notes required to meet the withdrawal amount. This involved writing a function that would take the withdrawal amount as input and return the minimum number of notes of each denomination required to dispense the amount.
Another challenge was handling edge cases such as when the user entered an invalid input or when the account balance was not sufficient to cover a withdrawal request.
There was also the challenge of persisting the account balance and transaction history across page refreshes using local storage. This required some experimentation with the React lifecycle methods and the use of the useEffect hook to ensure that the data was correctly stored and retrieved from local storage.
Overall, the development process involved a lot of experimentation and testing to ensure that the application worked as intended and met the requirements specified in the prompt. The use of ReactJS and local storage proved to be effective for building a responsive and persistent banking application.
