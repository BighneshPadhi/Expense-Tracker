import React, { useState } from 'react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseChart } from './components/ExpenseChart';
import { Expense } from './types/expense';
import { Wallet } from 'lucide-react';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: crypto.randomUUID(),
    };
    setExpenses([...expenses, expense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Wallet size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-blue-600">₹{totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ExpenseForm
              onSubmit={handleAddExpense}
            />
            <div className="mt-8">
              <ExpenseChart expenses={expenses} />
            </div>
          </div>
          <div>
            <ExpenseList
              expenses={expenses}
              onDelete={handleDeleteExpense}
              onEdit={handleEditExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;