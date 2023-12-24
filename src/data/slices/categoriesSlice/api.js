import axios from 'axios';
import { endpoints } from '../../../utilities/endpoints';

export const getCategories = () => {
    return axios.get(endpoints.categories);
}

export const addCategory = (category) => {
    return axios.post(endpoints.categories, category);
}

export const updateCategory = (categoryId, category) => {
    return axios.put(`${endpoints.categories}/${categoryId}`, category);
}

export const deleteCategory = (categoryId) => {
    return axios.delete(`${endpoints.categories}/${categoryId}`);
}