import React from 'react'
import AddExpense from '../addExpense'
import * as styles from './styled.components';
import ExpenseTable from '../expenseTable';

function Home() {
  return (
    <styles.Container>
      <AddExpense />
      <ExpenseTable />
    </styles.Container>
  )
}

export default Home;