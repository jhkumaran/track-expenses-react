import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExpensesActions } from '../../data/slices/expensesSlice';

function PerDayExpense({expense, showModal, setShowModal}) {
    const [form] = Form.useForm();
    const [dayExpenses, setDayExpenses] = useState([]);
    const [columns, setColumns] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const { expenses } = useSelector(state=> state.ExpensesReducer);
    const { categories } = useSelector(state => state.CategoriesReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(expenses);
        loadData();
    }, [expenses]);

    useEffect(() => {
        console.log('editingKey: ',editingKey);
        loadData();
    }, [editingKey])

    const loadData = () => {
        loadColumns();
        let dayExpenses = expenses.filter(t=> t.date === expense.date);
        setDayExpenses(dayExpenses);
    }

    const loadColumns = () => {
        let columns = [
            {
                key: 'amount',
                dataIndex: 'amount',
                title: 'Amount',
                editable: true,
                width: 200,
            },
            {
                key: 'category',
                dataIndex: 'category',
                title: 'Category',
                editable: true,
                render: (_, record) => (
                    <>
                        {categories.find(t=> t.id === record.category.id).label}
                    </>
                ),
                width: 200,
            },
            {
                key: 'notes',
                dataIndex: 'notes',
                title: 'Notes',
                editable: true,
                width: 200,
            },
            {
                title: '',
                key: 'edit',
                render:(_,record) => {
                    return isEditing(record) ? (
                        <div style={{ gap: '5px', display: 'flex', justifyContent: 'center' }}>
                            <Popconfirm title='Confirm Save'
                                description='Are you sure to save the changes?'
                                onConfirm={() => saveChanges()}
                                okText='Save'
                            >
                                <Button icon={<CheckOutlined />}/>
                            </Popconfirm>
                            <Button icon={<CloseOutlined />}
                                onClick={() => setEditingKey('')} />
                        </div>
                    ) : (
                        <div style={{ gap: '5px', display: 'flex', justifyContent: 'center' }}>
                            <Button icon={<EditOutlined/>} 
                                onClick={() => onEdit(record)} 
                                disabled={editingKey !== ''}/>
                            <Popconfirm title='Confirm Delete'
                                    description='Are you sure to delete this expense?'
                                    onConfirm={() => onDelete(record)}
                                    okText='Delete'
                                >
                                <Button icon={<DeleteOutlined />} disabled={editingKey !== ''}/>
                            </Popconfirm>
                        </div>
                    )
                },
                width: 80
            }
        ];
        
        setColumns(columns);
    }

    const isEditing = (record) => {
        return record.id === editingKey;
    };

    const onDelete = (expense) => {
        dispatch(ExpensesActions.deleteExpense(expense.id));
    }

    const onEdit = (expense) => {
        console.log(expense);
        form.setFieldsValue({
            amount: '',
            caegory: '',
            notes: '',
            ...expense
        });
        setEditingKey(expense.id);
    }

    const saveChanges = async() => {
        const row = await form.validateFields();
        console.log(row);
        console.log(expenses);
        console.log(editingKey);
        let expense = {...expenses.find(t=> t.id === editingKey)};
        console.log(expense);
        expense.amount = row.amount;
        expense.category = row.category;
        expense.notes = row.notes;
        dispatch(ExpensesActions.updateExpense(expense));
        setEditingKey('');
    }

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        record,
        index,
        children,
        ...restProps
      }) => {
        const inputNode = dataIndex === 'category' ? <Select options={categories}/> : <Input />;
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {inputNode}
              </Form.Item>
            ) : (
              children
            )}
          </td>
        );
    };

    const mergedColumns = columns.map((col) => {
        // console.log(`editing key is ${record.id}: ${isEditing(record)}`)
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      });

    return (
        <Modal title={`Expenses made on ${expense.date}`} 
            open={showModal}
            onOk={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
        >
            <Form component={false} form={form}>
                <Table bordered 
                    components={{
                        body: {
                          cell: EditableCell,
                        },
                      }}
                    columns={mergedColumns} 
                    dataSource={dayExpenses}
                    pagination={{ position: ['none','none'] }} />
            </Form>
        </Modal>
    )
}

export default PerDayExpense