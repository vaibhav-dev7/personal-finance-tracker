import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../api";

function DeletePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [txn, setTxn] = useState(null);

  useEffect(() => {
    API.get(`/transactions/${id}`)
      .then((r) => setTxn(r.data))
      .catch(() => {});
  }, [id]);

  const del = async () => {
    try {
      await API.delete(`/transactions/${id}`);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  if (!txn)
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="container">
      <h2>Delete Transaction</h2>
      <p>
        Are you sure you want to delete <strong>{txn.title}</strong> (
        {txn.amount})?
      </p>
      <div className="buttons">
        <button className="btn danger" onClick={del}>
          Yes, delete
        </button>
        <Link to="/" className="btn ghost">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default DeletePage;
