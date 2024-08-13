import axios from '../utils/axios';

const getTasks = async (id) => {
    try{
        const response = await axios.get(`/api/tasks/getall/${id}`);
        
        return response.data;

    }catch(err){
        console.log(err);
        
        
    }

};

const getTaskById = async (id) => {
    try{

        const response = await axios.get(`/api/tasks/${id}`);
        return response.data;
    }catch(err){
        console.log(err);


    }
};

const createTask = async (id,task) => {    
    try{
        const response = await axios.post(`/api/tasks/${id}`,task);
        return response.data;

    }catch(err){
        console.log(err);    
    }
};

const editTask = async (id, task) => {
    try{

        const response = await axios.put(`/api/tasks/${id}`, task);
        return response.data;
        
    }catch(err){
        
    }
};

const deleteTask = async (id) => {
    
    try{
        const response = await axios.delete(`/api/tasks/${id}`);
        return response;
    }catch(err){
        return err;
        
    }

};

const complete= async(id,data)=>{
    try{
        const response = await axios.patch(`/api/tasks/complete/${id}`,data);
        return response;

    }catch(err){

    }
} 
const unPin= async(id,data)=>{
    try{
        const response = await axios.patch(`/api/tasks/unPin/${id}`,data);
        return response;

    }catch(err){

    }
}

const taskListByConditions= async(id,data)=>{
    try {
        const conditions= JSON.stringify(data[0])
        console.log(data[0]);
        
        const response=await axios.get(`/api/tasks/getBy/${id}?conditions=${conditions}&sortConditions=${data[1].sortby}&sort=${data[1].sort}`)
        return response;

    } catch (error) {
        
    }
}
export  { getTasks, getTaskById, createTask, editTask, deleteTask ,complete,unPin,taskListByConditions};