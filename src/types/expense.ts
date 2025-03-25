export type Category = 'Food' | 'Travel' | 'Bills' | 'Shopping' | 'Entertainment' | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
}