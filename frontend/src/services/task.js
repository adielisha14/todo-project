import axios from '../utils/axios';

const getTasks = async () => {
    const response = await axios.get(`/api/tasks/getall/${id}`);
    return response.data;
};

const getTaskById = async (id) => {
    const response = await axios.get(`/api/tasks/${id}`);
    return response.data;
};

const createTask = async (task) => {
    const response = await axios.post(`/api/tasks/${id}`, task);
    return response.data;
};

const editTask = async (id, task) => {
    const response = await axios.put(`/api/tasks/${id}`, task);
    return response.data;
};

const deleteTask = async (id) => {
    const response = await axios.delete(`/api/tasks/${id}`);
    return response.data;
};

export default { getTasks, getTaskById, createTask, editTask, deleteTask };