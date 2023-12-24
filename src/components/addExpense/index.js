import React, { useEffect, useRef, useState } from 'react';
import * as styles from './styled.components';
import { PlusOutlined } from '@ant-design/icons';
import { DatePicker, Divider, Input, message, Select, Space, Button } from 'antd';
import dayjs from 'dayjs';
import { CategoriesActions } from '../../data/slices/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../categories';
import { ExpensesActions } from '../../data/slices/expensesSlice';

function AddExpense() {
    const [expenseAmount, setExpenseAmount] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [expenseDate, setExpenseDate] = useState(dayjs(new Date()));
    const [billingMonth, setBillingMonth] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [notes, setNotes] = useState('');
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef(null);
    const { categories } = useSelector(state => state.CategoriesReducer);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        loadDefaults();
    },[]);

    const loadDefaults = () => {
        dispatch(CategoriesActions.getCategories());
    }

    const clearData = () => {
        setExpenseAmount('');
        setSelectedCategory(null);
        setExpenseDate(dayjs(new Date()));
        setBillingMonth(null);
        setNotes('');
    }

    const addExpense = () => {
        if(expenseAmount === '' || selectedCategory === null || billingMonth === null){
            messageApi.open({
                type: 'warning',
                content: 'Please enter expense amount, category and billing month',
                duration: 5,
            })
            return;
        }
        let expense = {
            amount: Number.parseFloat(expenseAmount),
            category: selectedCategory,
            date: dayjs(expenseDate).format('DD-MM-YYYY'),
            billingMonth: dayjs(billingMonth).format('MMM-YYYY'),
            notes: notes,
        }
        dispatch(ExpensesActions.addExpense(expense));
        clearData();
    }

    const addCategory = (e) => {
        e.preventDefault();
        dispatch(CategoriesActions.addCategory(categoryName));
        setCategoryName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const filterOption = (input, option) => {
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    }

    return (
        <styles.AddExpenseContainer>
            <styles.RowContainer>
                <styles.LabelDiv>
                    Expense
                </styles.LabelDiv>
                <styles.InputContainer>
                    <styles.StyledInput type='text' placeholder='Enter Amount' value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}/>
                </styles.InputContainer>
            </styles.RowContainer>
            <styles.RowContainer>
                <styles.LabelDiv>
                    Category
                </styles.LabelDiv>
                <styles.InputContainer>
                    <Select options={categories} showSearch={true}
                        onChange={(category) => setSelectedCategory(category)} 
                        value={selectedCategory} placeholder='Select category'
                        style={{ width: '300px'}}
                        filterOption={filterOption}
                        dropdownRender={(menu) => (
                            <>
                              {menu}
                              <Divider
                                style={{
                                  margin: '8px 0',
                                }}
                              />
                              <Space
                                style={{
                                  padding: '0 8px 4px',
                                }}
                              >
                                <Input
                                  placeholder="Please enter item"
                                  ref={inputRef}
                                  value={categoryName}
                                  onChange={(e) => setCategoryName(e.target.value)}
                                  onKeyDown={(e) => e.stopPropagation()}
                                />
                                <Button type="text" icon={<PlusOutlined />} onClick={addCategory} disabled={categoryName === ''}>
                                  Add Category
                                </Button>
                              </Space>
                            </>
                        )}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                    />
                    <Button onClick={() => setShowModal(true)} title='Update Categories'>...</Button>
                    { showModal && <Categories setShowModal={setShowModal} showModal={showModal}/> }
                </styles.InputContainer>
            </styles.RowContainer>
            <styles.RowContainer>
                <styles.LabelDiv>
                    Date
                </styles.LabelDiv>
                <styles.InputContainer>
                    <DatePicker onChange={(date) => setExpenseDate(date)} 
                        allowClear={false}
                        defaultValue={null} 
                        value={expenseDate} 
                        format={'DD-MM-YYYY'}/>
                </styles.InputContainer>
            </styles.RowContainer>
            <styles.RowContainer>
                <styles.LabelDiv>
                    Billing Month
                </styles.LabelDiv>
                <styles.InputContainer>
                    <DatePicker onChange={(date) => setBillingMonth(date)} 
                        allowClear={false}
                        picker='month' 
                        defaultValue={null} 
                        value={billingMonth} 
                        format={'MMM-YYYY'}/>
                </styles.InputContainer>
            </styles.RowContainer>
            <styles.RowContainer>
                <styles.LabelDiv>
                    Notes
                </styles.LabelDiv>
                <styles.InputContainer>
                        <styles.StyledInput type='text' 
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)} />
                </styles.InputContainer>
            </styles.RowContainer>
            <styles.ButtonContainer>
                <styles.StyledButton onClick={clearData}>
                    Clear
                </styles.StyledButton>
                {contextHolder}
                <styles.StyledButton onClick={addExpense} type='primary'>
                    Add Expense
                </styles.StyledButton>
            </styles.ButtonContainer>
        </styles.AddExpenseContainer>
    )
}

export default AddExpense