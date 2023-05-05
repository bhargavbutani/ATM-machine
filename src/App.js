import React, { useState, useEffect } from "react"

export default function App() {
  const [balance, setBalance] = useState(0)
  const [transactionHistory, setTransactionHistory] = useState([])

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance")
    const storedTransactions = localStorage.getItem("transactions")

    if (storedBalance) {
      setBalance(Number(storedBalance))
    }

    if (storedTransactions) {
      setTransactionHistory(JSON.parse(storedTransactions))
    }
  }, [])

  const handleDeposit = (event) => {
    event.preventDefault()
    const denomination = event.target.denomination.value
    const noteCount = event.target.noteCount.value
    const amount = Number(denomination) * Number(noteCount)
    setBalance(balance + amount)
    setTransactionHistory([
      ...transactionHistory,
      { type: "deposit", amount: amount },
    ])
    localStorage.setItem("balance", balance + amount)
    localStorage.setItem(
      "transactions",
      JSON.stringify([
        ...transactionHistory,
        { type: "deposit", amount: amount },
      ])
    )
    event.target.reset()
  }

  const handleWithdrawal = (event) => {
    event.preventDefault()
    const amount = Number(event.target.amount.value)

    const denominationError =
      "Withdrawal amount must be in denominations of 100, 500, 1000, or 2000."
    const insufficientError =
      "Insufficient funds. Please enter a valid withdrawal amount."
    if (amount > balance) {
      alert(insufficientError)
      return
    }
    if (amount % 100 !== 0 || amount > balance) {
      alert(denominationError)
      return
    }

    const withdrawalNotes = []
    let remainingAmount = amount
    const denominations = [2000, 1000, 500, 100]

    denominations.forEach((denomination) => {
      const noteCount = Math.floor(remainingAmount / denomination)
      if (noteCount > 0) {
        withdrawalNotes.push({
          denomination: denomination,
          noteCount: noteCount,
        })
        remainingAmount -= noteCount * denomination
      }
    })

    setBalance(balance - amount)
    setTransactionHistory([
      ...transactionHistory,
      { type: "withdrawal", amount: amount },
    ])
    localStorage.setItem("balance", balance - amount)
    localStorage.setItem(
      "transactions",
      JSON.stringify([
        ...transactionHistory,
        { type: "withdrawal", amount: amount },
      ])
    )

    alert(
      `Withdrawn Rs. ${amount} using the following notes:\n${withdrawalNotes
        .map((note) => `${note.denomination} x ${note.noteCount}`)
        .join("\n")}`
    )

    event.target.reset()
  }

  return (
    <div data-theme="forest" className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-4xl flex flex-col gap-4">
          <h2 className="text-5xl font-bold m-4">Banking App</h2>
          <h3 className="text-xl">
            Account Balance:{" "}
            <span className="font-bold text-primary-focus">Rs. {balance}</span>
          </h3>

          <div className="divider"></div>

          <div>
            <h3 className="text-xl font-bold text-primary-focus">
              Deposit Money
            </h3>
            <form onSubmit={handleDeposit} className="flex flex-col gap-3">
              <div className="form-control w-full">
                <label className="label" htmlFor="denomination">
                  <span className="label-text">Denomination:</span>
                </label>

                <select
                  name="denomination"
                  className="select select-primary w-full"
                  id="denomination"
                >
                  <option value="100">100</option>
                  <option value="500">500</option>
                  <option value="1000">1000</option>
                  <option value="2000">2000</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label" htmlFor="noteCount">
                  <span className="label-text">Note Count:</span>
                </label>

                <input
                  type="number"
                  name="noteCount"
                  id="noteCount"
                  min="1"
                  step="1"
                  required
                  className="input input-bordered input-primary w-full"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Deposit
              </button>
            </form>
          </div>

          <div className="divider">OR</div>

          <div>
            <h3 className="text-xl font-bold text-primary-focus">
              Withdraw Money
            </h3>
            <form onSubmit={handleWithdrawal} className="flex flex-col gap-3">
              <div className="form-control w-full">
                <label className="label" htmlFor="amount">
                  <span className="label-text">Amount:</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  min="100"
                  step="100"
                  required
                  className="input input-bordered input-primary w-full"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Withdraw
              </button>
            </form>
          </div>

          <div className="divider"></div>

          <div className="mb-12">
            <h3 className="text-xl font-bold text-primary-focus mb-8">
              Transaction History
            </h3>
            <div className="max-h-80 overflow-auto flex flex-col gap-4 items-center">
              {transactionHistory.map((transaction, index) => (
                <div
                  key={index}
                  className={`card w-60 shadow-xl ${
                    transaction.type === "deposit" ? "bg-primary" : "bg-accent"
                  }`}
                >
                  <div className="card-body font-bold">
                    {transaction.type === "deposit" ? "Deposited" : "Withdrawn"}{" "}
                    Rs. {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
