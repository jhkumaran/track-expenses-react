import { List, Modal } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import CategoryItem from '../categoryItem';
import * as styles from './styled.components';

function Categories({showModal, setShowModal}) {
    const { categories } = useSelector(state => state.CategoriesReducer);
    return (
        <Modal title='Edit/Remove Categories' 
            open={showModal}
            onOk={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
        >
            <styles.ListContainer>
                {
                    categories.map((category) => (
                        <CategoryItem category={category} key={category.id}/>
                    ))
                }
            </styles.ListContainer>
        </Modal>
    )
}

export default Categories