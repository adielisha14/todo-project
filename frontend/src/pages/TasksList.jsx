import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {MixerHorizontalIcon, ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons"
import {Card} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import AddTaskCard from '../components/AddTaskCard'
import TaskCard from '../components/TaskCard'
import { SkeletonCard } from '../components/SkeletonCard';
import { useState,useEffect } from "react"
import {getTasks,taskListByConditions} from '../services/task'

export default function TaskList() {
    const userId='66b21e119e04a25c9d5bab37'
    const [count, setCount] = useState(false)
    const [noTasks, setNoTasks] = useState(false)
    const [allTasks, setTasks]=  useState([])
    const [filterForm, setFilterForm]=useState({conditions:"",sortConditions:undefined,sort:1})
    const [showFilters,setShowFilters]=useState(false)

    async function getData(){
        let res= await getTasks(userId)
      
        if(res){
            setNoTasks(false)
            let newArr=res.filter(el=>{return el.isPinned} )
            
            let newArr2=res.filter(el=>{return !el.isPinned} )
    
            setTasks(newArr.concat(newArr2))
        }else{
            setNoTasks('There are no tasks');
            setTasks([])

        }

    }
    function render(par1,par2) {
        if (filterForm.sortConditions=== par1|| filterForm.sortConditions===par2) {
            return true
        }else{
            return false
        }

        
    }

    async function getFilterData(){
        setShowFilters(false)
        console.log("enter fun");
        console.log(filterForm);
        
        
        let res= await taskListByConditions(userId,filterForm)
        console.log(res);
        console.log(res.data.length>0);
        
        if(res.data.length>0){
            setNoTasks(false)
            setTasks(res.data)
        }else{
            setNoTasks('There are no tasks that match the filters');
        }

    }

    useEffect(() =>{getData()},[])

    function hendelFilter(key,value) {
        setFilterForm({...filterForm,[key]:value})
    }

  return (
    <div className="static">
       <Button onClick={()=>{setCount(true)}}>Click to add task</Button>
       {count&&<AddTaskCard cancel={setCount}/>}

        <Button onClick={()=>{setShowFilters(showFilters?false:true)}}> filters <MixerHorizontalIcon className="ml-2"/></Button>
        {showFilters&&<Card className={`w-[350px] ml-5 mb-5 absolute z-50`}>
           
            <Select required onValueChange={(e)=>{hendelFilter("sortConditions",e)}}>
                <SelectTrigger className="w-[180px] ml-2">
                    <SelectValue placeholder="sort by..." />
                </SelectTrigger>
                <SelectContent> 
                    <SelectItem value="title">title</SelectItem>
                    <SelectItem value="category">category</SelectItem>
                    <SelectItem value="date">To be done by...</SelectItem>
                    <SelectItem value="update">last update</SelectItem>
                </SelectContent>
            </Select>

            {render("title","category") &&<><div name="testBody" value="123" className="flex flex-col space-y-1.5 m-5 ml-2">
                <div className="flex flex-col space-y-1.5">
              <Input  onChange={(e)=>{hendelFilter("conditions",e.target.value)}} 
                                      required  value={filterForm.conditions} name="conditions" id="conditions"/>

                </div>

            </div></>}

            <div className="flex items-center space-x-2 ml-2">
                <input type="radio" id="new" name="sort" value="1" onClick={(e)=>{hendelFilter("sort",e.target.value)}}/>
                <ThickArrowUpIcon htmlFor="new"/>  
                <Label htmlFor="new">ascending order</Label><br/>

            </div>

            <div className="flex items-center space-x-2 ml-2">
                <input  type="radio" id="old" name="sort" value="-1" onClick={(e)=>{hendelFilter("sort",e.target.value)}}/>
                <ThickArrowDownIcon htmlFor="old"/> 
                <Label htmlFor="old">Descending order</Label> 
            </div>
          

            <Button className=" m-2" onClick={()=>{getFilterData()}}>filter</Button>
        </Card>}



    <div className='flex flex-wrap gap-5'>
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
