import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Category, Expense } from '../types/expense';

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
}

const categories: Category[] = ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Other'];

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Other');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(amount),
      category,
      description,
      date,
    });
    setAmount('');
    setDescription('');
    setCategory('Other');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Expense</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter expense description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} />
            Add Expense
          </button>
        </div>
      </div>
    </form>
  );
}