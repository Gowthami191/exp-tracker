import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Styled components (same as your original)
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

const TransactionCell = ({ payload, removeTransaction }) => {
  return (
    <Cell isExpense={payload?.type === "EXPENSE"}>
      <span>{payload.desc}</span>
      <span>₹{payload.amount}</span>
      <RemoveButton
        isExpense={payload?.type === "EXPENSE"}
        onClick={() => removeTransaction(payload.id)}
      >
        Remove
      </RemoveButton>
    </Cell>
  );
};

const TransactionComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Fetch transactions from the server
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
      .then((response) => setTransactions([...transactions, response.data]))
      .catch((error) => console.error("Error adding transaction:", error));
  };

  // Remove a transaction
  const removeTransaction = (id) => {
    axios
      .delete("http://localhost:5001/transactions/${id}")
      .then(() =>{
        setTransactions(transactions.filter((transaction) => transaction.id !== id))
  })
      .catch((error) => console.error("Error deleting transaction:", error));
  };

  const filteredTransactions = transactions?.filter((transaction) =>
    transaction.desc.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Container>
      <div>Transaction</div>
      <input
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {filteredTransactions?.length > 0 ? (
        filteredTransactions.map((transaction) => (
          <TransactionCell
            key={transaction.id}
            payload={transaction}
            removeTransaction={removeTransaction}
          />
        ))
      ) : (
        <span>No transactions found.</span>
      )}

      <button
        onClick={() =>
          addTransaction({
            desc: "New Transaction",
            amount: 1000,
            type: "INCOME",
          })
        }
      >
        Add Transaction
      </button>
    </Container>
  );
};

export default TransactionComponent;