import { Button, Input, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import * as styles from './styled.components';
import { CategoriesActions } from '../../data/slices/categoriesSlice';
import { useDispatch } from 'react-redux';

function CategoryItem({category}) {
    const [isEditing, setIsEditing] = useState(false);
    const [categoryName, setCategoryName] = useState(category.label);
    const dispatch = useDispatch();

    const updateCategoryName = () => {
        dispatch(CategoriesActions.updateCategory({ category, categoryName }));
        setIsEditing(false);
    }

    const cancelEditing = () => {
        setCategoryName(category.label);
        setIsEditing(false);
    }

    const deleteCategory = () => {
        dispatch(CategoriesActions.deleteCategory(category.id))
    }
    return (
        <styles.ItemContainer>
            { !isEditing ? (
                    <>
                        <styles.Item>
                            {categoryName}
                        </styles.Item>
                        <styles.ButtonContainer>
                            <Button icon={<EditOutlined />} 
                                onClick={() => setIsEditing(true)}
                            />
                            <Popconfirm title='Confirm Delete'
                                description='Are you sure to delete this category?'
                                onConfirm={deleteCategory}
                                okText='Delete'
                            >
                                <Button icon={<DeleteOutlined />}/>
                            </Popconfirm>
                        </styles.ButtonContainer>
                    </>
                ) : (
                        <>
                            <styles.Item>
                                <Input defaultValue={categoryName} 
                                    onChange={(e) => setCategoryName(e.target.value)}/>
                            </styles.Item>
                            <styles.ButtonContainer>
                                <Popconfirm title='Confirm Update'
                                    description='Are you sure to update the name?'
                                    onConfirm={updateCategoryName}
                                    onCancel={() => setIsEditing(false)}
                                    okText='Update'
                                >
                                    <Button icon={<CheckOutlined />}/>
                                </Popconfirm>
                                <Button icon={<CloseOutlined />}
                                    onClick={cancelEditing} />
                            </styles.ButtonContainer>
                        </>
                )
            }
            {/* <styles.Item>
                { !isEditing ? (
                        <>{category.label}</>
                    ) : (
                        <styles.Item>
                            <Input defaultValue={category.label} />
                            <styles.ButtonContainer
                        </styles.Item>
                    )
                }
            </styles.Item>
            <styles.ButtonContainer>
                { !isEditing && (
                    <Button icon={<EditOutlined />} 
                        onClick={() => setIsEditing(true)}
                    />
                )}
                <Button icon={<DeleteOutlined />}/>
            </styles.ButtonContainer> */}
        </styles.ItemContainer>
    )
}

export default CategoryItem