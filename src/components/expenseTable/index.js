import React, { useEffect, useState } from 'react';
import * as styles from './styled.component';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DatePicker, Form, Input, Radio, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { ExpensesActions } from '../../data/slices/expensesSlice';
import PerDayExpense from '../perDayExpense';

function ExpenseTable() {
    const { expenses } = useSelector(state => state.ExpensesReducer);
    const { categories } = useSelector(state => state.CategoriesReducer);
    const [expensesData, setExpensesData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()));
    const [total, setTotal] = useState('');
    const [showExpensesModal, setShowExpensesModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [isDetailed, setIsDetailed] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ExpensesActions.getExpenses());
    }, []);

    useEffect(() => {
        loadExpenseData();
    }, [isDetailed, selectedMonth, expenses, categories]);

    useEffect(() => {
        calculateTotal();     
    }, [expensesData]);

    const loadColumns = (isDetailed) => {
        let columns = [
            {
                key: 'date',
                dataIndex: 'date',
                title: 'Date',
                width: 105,
                fixed: 'left',
            }
        ];
        categories.map(category => {
            let width = (category.label.length * 10) + 20;
            if(width < 70) {
                width = 70
            } else if( width > 120) {
                width = 120
            }
            columns.push({
                key: category.value,
                dataIndex: category.label,
                title: category.label,
                editable: true,
                width: width,
            })
        })
        if(isDetailed){
            columns.push({
                title: '',
                key: 'edit',
                render:(record) => (
                    <Button icon={<EditOutlined />}
                        onClick={() => editExpenses(record)}/>
                ),
                width: 60,
                fixed: 'right'
            });
        }
        setColumns(columns);
    }

    const editExpenses = (expense) => {
        setShowExpensesModal(true);
        setSelectedExpense(expense);
    }

    const loadExpenseData = () => {
        if(isDetailed){
            loadDetailedExpensesData();
        } else {
            loadTotalSummary();
        }
        loadColumns(isDetailed);
    }

    const loadDetailedExpensesData = () => {
        if(categories.length === 0 || expenses.length === 0) return;
        let expensesData = [];
        let filteredExpenses = expenses.filter(t=> t.billingMonth === dayjs(selectedMonth).format('MMM-YYYY'));
        filteredExpenses.map(expense => {
            let index = expensesData.findIndex(t=> t.date === expense.date);
            let expenseData = index === -1 ? { date: expense.date, billingMonth: expense.billingMonth } : expensesData[index];
            let category = categories.find(t=> t.id === expense.category.id);
            let amount = Reflect.get(expenseData, category.label);
            if(amount === undefined){
                Reflect.set(expenseData, category.label, expense.amount);
            } else {
                Reflect.set(expenseData, category.label, expense.amount + amount);
            }
            if(index === -1) expensesData.push(expenseData);
        })
        setExpensesData(expensesData);   
    }

    const loadTotalSummary = () => {
        let expensesData = [];
        let filteredExpenses = expenses.filter(t=> t.billingMonth === dayjs(selectedMonth).format('MMM-YYYY'));
        let expenseData = {
            date: dayjs(selectedMonth).format('MMM-YYYY')
        };
        filteredExpenses.map(expense => {
            let category = categories.find(t=> t.id === expense.category);
            let amount = Reflect.get(expenseData, category.label);
            if(amount === undefined){
                Reflect.set(expenseData, category.label, expense.amount);
            } else {
                Reflect.set(expenseData, category.label, expense.amount + amount);
            }
        });
        expensesData.push(expenseData);
        setExpensesData(expensesData);
    }

    const calculateTotal = () => {
        let total = 0;
        expensesData.map((expense) => {
            categories.map((category) => {
                let amount = Reflect.get(expense, category.label);
                if(amount !== undefined){
                    total += amount;
                }
            })
        });
        setTotal(total);
    }

    const showFooterData = () => {
        return (
            <styles.TotalDiv>
                {`TOTAL BILL: ${total}`}
            </styles.TotalDiv>
        );
    }

    return (
        <styles.Container>
            <styles.OptionsContainer>
                <DatePicker picker='month' 
                    defaultValue={selectedMonth}
                    allowClear={false}
                    onChange={(date) => setSelectedMonth(date)}
                    format={'MMM-YYYY'} />
                <Radio.Group defaultValue={true} 
                    value={isDetailed} 
                    onChange={() => setIsDetailed(!isDetailed)}>
                    <Radio.Button value={true}>Show Detailed Summary</Radio.Button>
                    <Radio.Button value={false}>Show Total Summary</Radio.Button>
                </Radio.Group>
            </styles.OptionsContainer>
            <styles.ExpenseTableContainer>
                <Table columns={columns} dataSource={expensesData} bordered
                    pagination={{ pageSize: 35, position: ['none','none'] }}
                    scroll={{
                        y: 300,
                    }}
                    footer={showFooterData}
                />
            </styles.ExpenseTableContainer>
            { showExpensesModal && (
                <PerDayExpense expense={selectedExpense}
                    showModal={showExpensesModal}
                    setShowModal={setShowExpensesModal} />
            )}
        </styles.Container>
    )
}

export default ExpenseTable