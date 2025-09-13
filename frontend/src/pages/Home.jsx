import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Home() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      const res = await API.get("/transactions");
      setTxns(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const balance = txns.reduce((s, t) => s + Number(t.amount), 0);

  return (
    <div className="container">
      <header>
        <h1>Personal Finance Tracker</h1>
        <div className="balance">Balance: {balance}</div>
        <nav>
          <Link to="/add" className="btn">
            Add Transaction
          </Link>
          <Link to="/chart" className="btn">
            View Chart
          </Link>{" "}
          {/* Bonus */}
        </nav>
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="tx-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {txns.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td className={t.amount >= 0 ? "income" : "expense"}>
                  {t.amount}
                </td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{t.category}</td>
                <td>
                  <Link to={`/${t._id}/edit`} className="link">
                    Edit
                  </Link>{" "}
                  |
                  <Link to={`/${t._id}/delete`} className="link">
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
