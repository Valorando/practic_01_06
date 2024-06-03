import React, { useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import ItemAddForm from './components/item-add-form/item-add-form';
import ItemStatusFilter from './components/item-status-filter/item-status-filter';
import SearchPanel from './components/search-panel/search-panel';
import TodoList from './components/todo-list/todo-list';
import TodoListItem from './components/todo-list-item/todo-list-item';

function App() {
  const [items, setItems] = useState([
    { id: 1, label: 'Drink Coffee', important: false, done: false },
    { id: 2, label: 'Learn React', important: true, done: false },
    { id: 3, label: 'Make Awesome App', important: false, done: false }
  ]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const maxId = 100;

  const createItem = (label) => {
    return {
      id: maxId + 1,
      label,
      important: false,
      done: false
    };
  };

  const toggleProperty = (arr, id, propName) => {
    return arr.map(item =>
      item.id === id ? { ...item, [propName]: !item[propName] } : item
    );
  };

  const onItemAdded = (label) => {
    setItems([...items, createItem(label)]);
  };

  const onToggleDone = (id) => {
    setItems(toggleProperty(items, id, 'done'));
  };

  const onToggleImportant = (id) => {
    setItems(toggleProperty(items, id, 'important'));
  };

  const onDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const onSearchChange = (search) => {
    setSearch(search);
  };

  const filterItems = (items, filter) => {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => (!item.done));
    } else if (filter === 'done') {
      return items.filter((item) => item.done);
    }
  };

  const searchItems = (items, search) => {
    if (search.length === 0) {
      return items;
    }
    return items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));
  };

  const doneCount = items.filter((item) => item.done).length;
  const toDoCount = items.length - doneCount;
  const visibleItems = searchItems(filterItems(items, filter), search);

  return (
    <div className="todo-app">
      <AppHeader toDo={toDoCount} done={doneCount} />
      <div className="search-panel d-flex">
        <SearchPanel onSearchChange={onSearchChange} />
        <ItemStatusFilter filter={filter} onFilterChange={onFilterChange} />
      </div>
      <TodoList
        items={visibleItems}
        onToggleImportant={onToggleImportant}
        onToggleDone={onToggleDone}
        onDelete={onDelete}
      />
      <ItemAddForm onItemAdded={onItemAdded} />
    </div>
  );
}

export default App;
