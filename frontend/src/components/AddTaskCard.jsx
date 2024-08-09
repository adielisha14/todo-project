import { Button } from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import {createTask} from '../services/task'



export default function AddTaskCard({cancel}) {
  const [date, setDate] = useState()
  const [formData,setFormData]=useState({})

  function hendelFormData(e) {
    
    if (e.target.id !="isPinned") {
      setFormData({...formData,[e.target.id]:e.target.value})
      
    }else{
      let val=e.target.dataset.state==="unchecked"?true:false
      setFormData({...formData,isPinned: val})
    }
    console.log(formData);
  }

  let userId="66b21e119e04a25c9d5bab37"

  //  async function submit(e) {
  //   // e.preventdefault()
    
  //   try{
  //      await createTask(userId,{...formData,date: date})
  //     //  cancel(false)
    
  //   }catch(err){
  //     return err

  //   }
  // }
  async function submit(e) {
    e.preventDefault() 
    try{
      if(date!=undefined){
        
      }
      await createTask(userId,{...formData,date: date})
      cancel(false)

    
    }catch(err){
      return err

    }
  }

  

  return (
    <div  className='w-screen static flex items-center justify-center'>
    <Card className="w-[350px] absolute shadow-2xl z-50  top-24">
      <CardHeader>
        <CardTitle>Create Todo</CardTitle>
      </CardHeader>
        {/* <form> */}
      <CardContent>
          <div className="grid w-full items-center gap-4">
           
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Title</Label>
              <Input required onChange={(e)=>{hendelFormData(e)}} id="title" placeholder="title of your todo" />
              
            </div>


            <div className="flex flex-col space-y-1.5">
              <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input  onChange={(e)=>{hendelFormData(e)}} id="description" placeholder="description of your todo" />
            </div>
            </div>


            
            <div className="flex flex-col space-y-1.5">
              <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Input required onChange={(e)=>{hendelFormData(e)}} id="category" placeholder="category of your todo" />
            </div>
            </div>
                        
            <div className="flex flex-col space-y-1.5">
              <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">To be done by</Label>
              {/* <Input  onChange={(e)=>{hendelFormData(e)}} id="date" placeholder="Pick a date" /> */}
            </div>

            <Popover >
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
              <Calendar 
                 
                 mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  /> 
              </PopoverContent>
            </Popover>
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="body">Body</Label>
                <Textarea required id='body' onChange={(e)=>{hendelFormData(e)}} placeholder="Type your todo here." />
             </div>
            </div>


            <div className="flex items-center space-x-2">
              <Switch id="isPinned" onClick={(e)=>{hendelFormData(e)}}/>
              <Label htmlFor="isPinned">Pin to the top</Label>
            </div>
                        

          </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type='submit'  onClick={(e)=>{submit(e)}}>add to list</Button>
        <Button variant="outline" onClick={()=>{cancel(false)}}>Cancel</Button>
      </CardFooter>
        {/* </form> */}
    </Card>
    </div>
  )
}

/**  title: { type: String, required: true },
  description: { type: String },
  body: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category:{ type: String, default: 'general' ,required: true },
  updated: { type: Date, default: Date.now(), required: true },
  date:{ type: Date, required: false } */

    