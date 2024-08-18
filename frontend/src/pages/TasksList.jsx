import TaskCard from '../components/TaskCard'
import { SkeletonCard } from '../components/SkeletonCard';

export default function TaskList({allTasks,noTasks}) {



  return (
    <div className="static">
        <div className='flex flex-wrap gap-5 mt-2'>
            {noTasks&&<h3>{noTasks}</h3>}
            {allTasks.length>0? allTasks.map((task,inx)=>{
                return <TaskCard key={inx} task={task}/>
            }): allTasks[0]==undefined?<></>:
            [1,2,3,4,5,6].map(card=>{
                return <SkeletonCard key={card}/>
            })}
            
        </div>
    </div>
 )
}
