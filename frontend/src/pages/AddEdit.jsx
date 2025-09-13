import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

function AddEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    amount: 0,
    date: new Date().toISOString().slice(0, 10),
    category: "",
  });

  useEffect(() => {
    if (id) {
      API.get(`/transactions/${id}`)
        .then((r) => {
          const d = r.data;
          setForm({
            title: d.title,
            amount: d.amount,
            date: new Date(d.date).toISOString().slice(0, 10),
            category: d.category,
          });
        })
        .catch(() => {});
    }
  }, [id]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id)
        await API.put(`/transactions/${id}`, {
          ...form,
          amount: Number(form.amount),
        });
      else
        await API.post("/transactions", {
          ...form,
          amount: Number(form.amount),
        });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  return (
    <div className="container">
      <h2>{id ? "Edit" : "Add"} Transaction</h2>
      <form onSubmit={submit} className="form">
        <label>
          Title
          <input name="title" value={form.title} onChange={handle} required />
        </label>
        <label>
          Amount
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handle}
            required
          />
        </label>
        <label>
          Date
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handle}
            required
          />
        </label>
        <label>
          Category
          <input
            name="category"
            value={form.category}
            onChange={handle}
            required
          />
        </label>
        <div className="buttons">
          <button type="submit" className="btn">
            Save
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEdit;
