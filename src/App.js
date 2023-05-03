import React, { useState, useEffect } from "react";

export default function App() {
  const [balance, setBalance] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedTransactions = localStorage.getItem("transactions");

    if (storedBalance) {
      setBalance(Number(storedBalance));
    }

    if (storedTransactions) {
      setTransactionHistory(JSON.parse(storedTransactions));
    }
  }, []);

  const handleDeposit = (event) => {
    event.preventDefault();
    const denomination = event.target.denomination.value;
    const noteCount = event.target.noteCount.value;
    const amount = Number(denomination) * Number(noteCount);
    setBalance(balance + amount);
    setTransactionHistory([
      ...transactionHistory,
      { type: "deposit", amount: amount }
    ]);
    localStorage.setItem("balance", balance + amount);
    localStorage.setItem(
      "transactions",
      JSON.stringify([
        ...transactionHistory,
        { type: "deposit", amount: amount }
      ])
    );
    event.target.reset();
  };

  const handleWithdrawal = (event) => {
    event.preventDefault();
    const amount = Number(event.target.amount.value);

    const denominationError =
      "Withdrawal amount must be in denominations of 100, 500, 1000, or 2000.";
    const insufficientError =
      "Insufficient funds. Please enter a valid withdrawal amount.";
    if (amount > balance) {
      alert(insufficientError);
      return;
    }
    if (amount % 100 !== 0 || amount > balance) {
      alert(denominationError);
      return;
    }

    const withdrawalNotes = [];
    let remainingAmount = amount;
    const denominations = [2000, 1000, 500, 100];

    denominations.forEach((denomination) => {
      const noteCount = Math.floor(remainingAmount / denomination);
      if (noteCount > 0) {
        withdrawalNotes.push({
          denomination: denomination,
          noteCount: noteCount
        });
        remainingAmount -= noteCount * denomination;
      }
    });

    setBalance(balance - amount);
    setTransactionHistory([
      ...transactionHistory,
      { type: "withdrawal", amount: amount }
    ]);
    localStorage.setItem("balance", balance - amount);
    localStorage.setItem(
      "transactions",
      JSON.stringify([
        ...transactionHistory,
        { type: "withdrawal", amount: amount }
      ])
    );

    alert(
      `Withdrawn Rs. ${amount} using the following notes:\n${withdrawalNotes
        .map((note) => `${note.denomination} x ${note.noteCount}`)
        .join("\n")}`
    );

    event.target.reset();
  };

  return (
    <div>
      <h2>Banking App</h2>
      <h3>Account Balance: Rs. {balance}</h3>
      <h3>Deposit Money</h3>
      <form onSubmit={handleDeposit}>
        <label>
          Denomination:
          <select name="denomination">
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
            <option value="2000">2000</option>
          </select>
        </label>
        <label>
          Note Count:
          <input type="number" name="noteCount" min="1" step="1" />
        </label>
        <button type="submit">Deposit</button>
      </form>
      <h3>Withdraw Money</h3>
      <form onSubmit={handleWithdrawal}>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            //  min="100" step="100"
          />
        </label>
        <button type="submit">Withdraw</button>
      </form>
      <h3>Transaction History</h3>
      <ul>
        {transactionHistory.map((transaction, index) => (
          <li key={index}>
            {transaction.type === "deposit" ? "Deposited" : "Withdrawn"} Rs.{" "}
            {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
