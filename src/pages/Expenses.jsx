import React from 'react'
import AddExpenseForm from '../components/AddExpenseForm'
import ExpensesList from '../components/ExpensesList'




const Expenses = (expenses) => {

 
  return (
    <div className="w-full px-4 md:px-8 py-6">
  <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 justify-center max-w-7xl mx-auto">
    
   
    <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
      <div className="bg-card border border-border/40 rounded-2xl shadow-lg p-6 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Add New Expense</h2>
        <AddExpenseForm />
      </div>
    </div>

    <div className="w-full lg:w-1/2">
      <div className="bg-card border border-border/40 rounded-2xl shadow-lg p-6 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Expense History</h2>
        <ExpensesList />
      </div>
    </div>

  </div>

  
  
</div>
  )
}

export default Expenses
