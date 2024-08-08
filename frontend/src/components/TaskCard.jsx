
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DrawingPinFilledIcon, TrashIcon, DrawingPinIcon } from "@radix-ui/react-icons"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { useState } from "react"
import {complete,unPin,deleteTask} from '../services/task'

export default function TaskCard({task}) {
    const {title,description,body ,isComplete, isPinned, category, updated, date}=task
    const [taskComplete,setComplete]= useState(isComplete)
    const [pin,setpin]= useState(isPinned)
    const { toast } = useToast()
    async function getData(name){
      let newpin,res
      switch (name) {
        case "isPinned":
          newpin=pin?false:true;
          setpin(newpin)
          res= await unPin(task._id,{[name]:newpin})
          if(res){
            console.log(res);
            
          }else{
            console.log(res);
          }
          break;


        case "isComplete":
          newpin=taskComplete?false:true;
          setComplete(newpin)
          res= await complete(task._id,{[name]:newpin})
          if(res){
            console.log(res);
            
          }else{
            console.log(res);
          }
          
          break;
        case "deleteTask":
          console.log("delete");
          
          res= await deleteTask(task._id)


          if(res){
            console.log(res);
            
          }else{
            console.log(res);
          }
          
          break;
        
      
        default:
          break;
      }
      location.reload()
  }
    


  return (

    <Card className={`w-[350px] ml-5 relative ${taskComplete?"line-through":""}`}>
      <CardDescription className='m-2'>{updated}</CardDescription>      
        {pin?
      <DrawingPinFilledIcon onClick={()=>{getData("isPinned")}} 
      className="mr-2 h-10 w-10 absolute right-0 top-0"/>:
        <DrawingPinIcon  onClick={()=>{getData("isPinned")}} 
       className="mr-2 h-10 w-10 absolute right-0 top-0"/>}

      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        
          <div name="test" className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>{body}</Label>
            </div>
            {date&&<div className="flex items-center space-x-2">
              <Label>To be done by:</Label>
              <CardDescription>{date}</CardDescription>
            </div>}
            
          </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center justify-between">
            <Label htmlFor="isComplete" className="m-2">Done!</Label>
            <Switch checked={taskComplete} 
             id="isComplete"  name="isComplete" onClick={()=>{getData("isComplete")}} />
        </div>
        <Button variant="destructive"  onClick={()=>{getData("deleteTask")}}  >
    
      <TrashIcon/>Delete</Button>
      </CardFooter>

    </Card>
)
}
//  
/**  title: { type: String, required: true },
  description: { type: String },
  body: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category:{ type: String, default: 'general' ,required: true },
  updated: { type: Date, default: Date.now(), required: true },
  date:{ type: Date, required: false } */

  