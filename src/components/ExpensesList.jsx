import React, { useEffect, useState } from 'react'
import { auth, db } from '../Firebase/firebase'
import { collection, doc, limit, onSnapshot } from 'firebase/firestore'
import { Utensils, Car, Gamepad2, ShoppingBag, Receipt, MoreHorizontal, TrendingDown } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses } from '../redux/expenesSlice';

const ExpensesList = () => {



  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expenses.items);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubExpenses = null;

    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = collection(db, "users", user.uid, "expenses");

        unsubExpenses = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          dispatch(setExpenses(data)); // ✅ Dispatch user-specific data
          setLoading(false);
        });
      } else {
        dispatch(setExpenses([])); // ✅ Clear Redux state on logout
        setLoading(false);
      }
    });

    // 🔄 Cleanup both snapshot and auth listeners
    return () => {
      if (unsubExpenses) unsubExpenses();
      unsubAuth();
    };
  }, [dispatch]);

  const getCategoryIcon = (category) => {
    const lowerCategory = category.toLowerCase();
    switch (lowerCategory) {
      case 'food':
        return <Utensils className="w-5 h-5" />;
      case 'transport':
        return <Car className="w-5 h-5" />;
      case 'entertainment':
        return <Gamepad2 className="w-5 h-5" />;
      case 'shopping':
        return <ShoppingBag className="w-5 h-5" />;
      case 'bills':
        return <Receipt className="w-5 h-5" />;
      default:
        return <MoreHorizontal className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    const lowerCategory = category.toLowerCase();
    switch (lowerCategory) {
      case 'food':
        return 'bg-expense-food/20 text-expense-food border-expense-food/30';
      case 'transport':
        return 'bg-expense-transport/20 text-expense-transport border-expense-transport/30';
      case 'entertainment':
        return 'bg-expense-entertainment/20 text-expense-entertainment border-expense-entertainment/30';
      case 'shopping':
        return 'bg-expense-shopping/20 text-expense-shopping border-expense-shopping/30';
      case 'bills':
        return 'bg-expense-bills/20 text-expense-bills border-expense-bills/30';
      default:
        return 'bg-expense-other/20 text-expense-other border-expense-other/30';
    }
  };

  const totalAmount = expense.reduce((sum, e) => sum + Number(e.amount), 0);

  return (

    <div>

      <div className="max-w-md mx-auto p-6 bg-gradient-card rounded-2xl shadow-card-dark border border-border/50 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-primary rounded-lg shadow-expense">
            <TrendingDown className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Your Expenses</h2>
            <p className="text-sm text-muted-foreground">
              Total: ₹{totalAmount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Expense List */}
        <div className="space-y-3">
          {expense.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
                <Receipt className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No expenses yet</p>
            </div>
          ) : (
            expense.map((e) => (
              <div
                key={e.id}
                className="group relative overflow-hidden bg-gradient-to-r from-card to-card/80 rounded-xl border border-border/60 p-4 transition-all duration-300 hover:shadow-hover-glow hover:border-primary/30 hover:scale-[1.02]"
              >
                {/* Content */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    {/* Category Icon */}
                    <div
                      className={`p-2.5 rounded-lg border transition-all duration-300 group-hover:scale-110 ${getCategoryColor(
                        e.category
                      )}`}
                    >
                      {getCategoryIcon(e.category)}
                    </div>

                    {/* Expense Details */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-foreground">
                          ₹{e.amount.toLocaleString()}
                        </span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                          {e.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(e.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* Subtle Border Glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm -z-10" />
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {expense.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {expense.length} transaction{expense.length !== 1 ? 's' : ''}
              </span>
              <span className="text-sm font-medium text-success">
                Avg: ₹{totalAmount}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpensesList
