export const calculateAverage = (expenses) => {
    if (expenses.length === 0) return 0;
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    return (total / expenses.length).toFixed(2);
  };
  