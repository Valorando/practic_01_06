import React, { useState } from 'react';
import './item-add-form.css';

export default function ItemAddForm({ onItemAdded }) {
  const [label, setLabel] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLabel('');
    const cb = onItemAdded || (() => {});
    cb(label);
  };

  return (
    <form className="bottom-panel d-flex" onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control new-todo-label"
        value={label}
        onChange={onLabelChange}
        placeholder="What needs to be done?"
      />
      <button type="submit" className="btn btn-outline-secondary">
        Add
      </button>
    </form>
  );
}
