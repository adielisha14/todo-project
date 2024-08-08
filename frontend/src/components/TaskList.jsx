
import TaskCard from './TaskCard'
import { SkeletonCard } from './SkeletonCard';
import { useState,useEffect } from "react"
import {getTasks} from '../services/task'


export default function TaskList() {

    const [allTasks, setTasks]=   useState([])
    async function getData(){
        let res= await getTasks('66b21e119e04a25c9d5bab37')
        if(res){
            let newArr=res.filter(el=>{return el.isPinned} )
            console.log(newArr);
            
            let newArr2=res.filter(el=>{return !el.isPinned} )
            console.log(newArr2);
    
            setTasks(newArr.concat(newArr2))
        }else{
          console.log(res);
        }

    }

    useEffect(() =>{getData()},[])

        
     
    
  

  return (
    <div className='flex flex-wrap gap-5'>
        {allTasks.length>0? allTasks.map((task,inx)=>{
            return <TaskCard key={inx} task={task}/>
        }):
        [1,2,3,4,5,6].map(card=>{
            return <SkeletonCard key={card}/>
        })}


    </div>
 )
}
