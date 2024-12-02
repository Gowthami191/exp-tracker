import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactDOM from "react-dom";
import HomePage from './Home';  
import AboutPage from './About';
import TransactionComponent from './TransactionComponent'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  align-items: center; 
  margin: 30px 0 10px;
  font-family: Montserrat;
  width: 360px;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
  margin-left:22em ;
`;
const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
    align-items: center;
    justify-content:center;
  gap: 12px;
  align: center;
  margin: 20px;
`;
const ExpenseBox = styled.div`
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  font-size: 14px;
    align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align:center;
  width: 135px;
  & span {
    color: ${(props) => (props.isIncome ? "green" : "red")};
    font-weight: bold;
    font-size: 20px;
  }
`;
const BalanceBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
    // Center horizontally
  align-items: center;  
  width: 100%;
  font-weight: bold;
  margin: 0;  
  & span {
    color: #0d1d2c;
    opacity: 80%;
    font-weight: bold;
    font-size: 20px;
  }
`;
const AddTransaction = styled.div`
  font-size: 15px;
  background: #0d1d2c;
  display: flex;
  color: white;
  align: center;
  padding: 5px 10px;
  cursor: pointer;
  flex-direction: row;
  border-radius: 4px;
  font-weight: bold;
  margin-left:auto;
`;
const AddTransactionContainer = styled.div`
  font-size: 15px;
  display: ${(props) => (props.isAddTxnVisible ? "flex" : "none")};
  color: #0d1d2c;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  width: 100%;
  align-items: right;
  padding: 15px 20px;
  margin: 10px 20px;
  gap: 10px;
  & input {
    width: 90%;
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;
const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  width: 100%;
  border-radius: 2px;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border: 1px solid #e6e8e9;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;
const RemoveButton = styled.button`
  background-color: ${(props) => (props.isExpense ? "#ff4d4f" : "#4caf50")};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.isExpense ? "#e63946" : "#388e3c")};
  }
`;
const SearchInput = styled.input`
  padding: 10px 12px;
  border-radius: 12px;
  background: #e6e8e9;
  outline: none;
  border: 1px solid #d1d5db; /* Subtle border for a clean look */
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px; /* Add spacing below the input */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Optional for depth */
  &:focus {
    border-color: #0d1d2c; /* Darker border on focus */
    background: #ffffff; /* White background for clarity */
  }
`;
const App = () => { // Import your components
  return (
    <Router>  {/* Wrap everything in Router to enable routing */}
      <Routes>
        {/* Define the routes for Home and About */}
        <Route path="/" element={<HomePage />} />  {/* Home page will be rendered at / */}
        <Route path="/about" element={<AboutPage />} />  {/* About page will be rendered at /about */}
      </Routes>
    </Router>
  );
};
const AddTransactionView = (props) => {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("EXPENSE");

  return (
    <AddTransactionContainer isAddTxnVisible={props.isAddTxnVisible}>
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="income">Income</label>
      </RadioBox>
      <AddTransaction
        onClick={() => {
          props.addTransaction({
            amount: Number(amount),
            desc,
            type,
          });
          setAmount(""); // Reset the form after adding
          setDesc("");
        }}
      >
        <button
        onClick={() =>
          props.addTransaction({
            desc: "New Transaction",
            amount: 1000,
            type: "INCOME",
          })
        }
      ></button>
        Add Transaction
      </AddTransaction>
    </AddTransactionContainer>
  );
};
const OverViewComponent = (props) => {
  const [isAddTxnVisible, toggleAddTXn] = useState(false);
  return (
    <Container>
      <h2>{props.name}</h2>
      <BalanceBox>
        Balance: ₹{props.income - props.expense}
        <AddTransaction onClick={() => toggleAddTXn((isVisible) => !isVisible)}>
          {isAddTxnVisible ? "CANCEL" : "ADD"}
        </AddTransaction>
      </BalanceBox>
      {isAddTxnVisible && (
        <AddTransactionView
          isAddTxnVisible={isAddTxnVisible}
          addTransaction={(payload) => {
            props.addTransaction(payload);
            toggleAddTXn((isVisible) => !isVisible); // Hide the form after adding
          }}
        />
      )}
      <ExpenseContainer>
        <ExpenseBox>
          Expense<span>₹{props.expense}</span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>
          Income<span>₹{props.income}</span>
        </ExpenseBox>
      </ExpenseContainer>
    </Container>
  );
};
const GetData = () => {
  const [transactions, setTransactions] = useState([]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [name, setName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [editTransactionId, setEditTransactionId] = useState(null); // Tracks the transaction being edited
  const [editFormData, setEditFormData] = useState({ amount: "", desc: "" }); // Form data for editing
  useEffect(() => {
    axios
      .get("http://localhost:5001/transactions")
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  // Add a new transaction
  const addTransaction = (newTransaction) => {
    const lastId = transactions.length > 0 ? transactions[transactions.length - 1].id : 0;
  const transactionWithId = {
    ...newTransaction,
    id: lastId + 1, // Incremental ID
  };
    axios
      .post("http://localhost:5001/transactions", newTransaction)
      .then((response) => {
        setTransactions((prevTransactions) => [...prevTransactions, response.data]);
  })
      .catch((error) => console.error("Error adding transaction:", error));
  };

  // Remove a transaction
  const removeTransaction = (id) => {
    console.log("Deleting transaction with id:", id);
  
    axios
      .delete(`http://localhost:5001/transactions/${id}`)  // Send DELETE request to the backend
      .then((response) => {
        // If the delete request is successful, update the state to remove the transaction
        console.log("Transaction successfully deleted:", response.data);
        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
        alert("Failed to delete the transaction. Please try again.");
      });
  };
  
    
  const filteredTransactions = transactions?.filter((transaction) =>
    transaction.desc.toLowerCase().includes(searchText.toLowerCase())
  );
  const calculateBalance = useCallback(() => {
    let totalExpense = 0;
    let totalIncome = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "EXPENSE") {
        totalExpense += transaction.amount;
      } else {
        totalIncome += transaction.amount;
      }
    });
    setExpense(totalExpense);
    setIncome(totalIncome);
  }, [transactions]);
  useEffect(() => {
    calculateBalance();
  }, [transactions, calculateBalance]);
  
  const startEditingTransaction = (transaction) => {
    setEditTransactionId(transaction.id);
    setEditFormData({ amount: transaction.amount, desc: transaction.desc });
  };
  const saveEditedTransaction = () => {
    const updatedTransaction = {
      ...transactions.find((transaction) => transaction.id === editTransactionId),
      amount: Number(editFormData.amount),
      desc: editFormData.desc,
    };
  
    // Send a PUT request to update the transaction on the server
    axios
      .put(`http://localhost:5001/transactions/${editTransactionId}`, updatedTransaction)
      .then((response) => {
        console.log("Transaction successfully updated:", response.data);
  
        // Update the transaction in the local state
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.id === editTransactionId ? updatedTransaction : transaction
          )
        );
  
        alert("Transaction updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating transaction:", error);
        alert("Failed to update the transaction. Please try again.");
      });
  
  
    setEditTransactionId(null); // Exit edit mode
    setEditFormData({ amount: "", desc: "" }); // Clear form data
  };
  const cancelEdit = () => {
    setEditTransactionId(null);
    setEditFormData({ amount: "", desc: "" });
  };
  
  return (
    <div>
      <OverViewComponent
        name={name}
        income={income}
        expense={expense}
        addTransaction={addTransaction}
      />
      <h3>Transactions:</h3>
      <SearchInput
        type="text"
        placeholder="Search transactions"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {filteredTransactions.length > 0 ? (
        filteredTransactions.map((transaction) => (
          <Cell key={transaction.id} isExpense={transaction.type === "EXPENSE"}>
            {editTransactionId === transaction.id ? (
              <>
                {/* Edit Form */}
                <input
                  type="number"
                  value={editFormData.amount}
                  onDelete={() => removeTransaction(transaction.id)}
                  onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
                  placeholder="Amount"
                />
                <input
                  type="text"
                  value={editFormData.desc}
                  onChange={(e) => setEditFormData({ ...editFormData, desc: e.target.value })}
                  placeholder="Description"
                />
                <button onClick={saveEditedTransaction}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <div>
                  <span>{transaction.desc}</span>
                </div>
                <div>
                  <span>₹{transaction.amount}</span>
                </div>
                <div>{transaction.type}</div>
                <RemoveButton
                  isExpense={transaction.type === "EXPENSE"}
                  onClick={() => removeTransaction(transaction.id)}
                >
                  Remove
                </RemoveButton>
                <button onClick={() => startEditingTransaction(transaction)}>Edit</button>
              </>
            )}
          </Cell>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default GetData;
