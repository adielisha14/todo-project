import axios from '../utils/axios';
const userList= async () => {
    try{
        const response = await axios.get(`/api/user`);
        
        return response.data;

    }catch(err){
        console.log(err);
        
        
    }

};
const deleteUser=async (id)=>{
    console.log(id);
    
    try{
        const response = await axios.delete(`/api/user/${id}`);
        
        return response;

    }catch(err){
        console.log(err);
        
        
    }

}

export { userList,deleteUser };



