import React from 'react'
import "./sidebar.css"
import { Label } from "@/components/ui/label"
import {MixerHorizontalIcon, ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import {taskListByConditions} from '../services/task'

export default function Sidebar({setCount,setTasks,setNoTasks}) {
  const userId='66b21e119e04a25c9d5bab37'
  const [filterForm, setFilterForm]=useState({conditions:"",sortConditions:undefined})
  const [sort,setSort]=useState({sort:1})
  const [showFilters,setShowFilters]=useState(false)

  async function getFilterData(){
      setShowFilters(false)
      console.log("enter fun");
      console.log(filterForm);
      
      
      let res= await taskListByConditions(userId,[filterForm,sort])
      console.log(res);
      console.log(res.data.length>0);
      
      if(res.data.length>0){
          setNoTasks(false)
          setTasks(res.data)
      }else{
          setNoTasks('There are no tasks that match the filters');
      }

  }

  function hendelFilter(e) {
      setFilterForm({...filterForm,[e.target.id]:e.target.value})
      console.log(filterForm);
      
  }

  return (
    <div >
    
    <div className='sidebar-container w-[15vw] h-[89vh] m-0.5 rounded-lg border-4 border-primary p-5 flex justify-center'>

    <ul className='sidebar-list list-none p-0 m-0 w-full'>
        <li>
            <div onClick={()=>{setCount(true)}} className='addTodo text-text/90 text-base p-4 flex justify-center items-center h-12 w-full rounded-sm bg-accent/40 shadow-sm cursor-pointer'>
                Add a Todo
                <i className="fa-solid fa-circle-plus addIcon text-2xl p-3"></i>
            </div>
        </li>
        <li className='mb-5'>
        <label  className=" block text-2xl font-medium text-43ADAD-800 mb-2 cateLabel text-primary" >Filters:</label>

        <div className="search-containerSide p-4 bg-accent/40 shadow-sm rounded-sm flex text-center h-12 w-full">
            <input type="text" id='title' className='searchBarSide focus:outline-none bg-transparent w-full' placeholder="Search..." onChange={(e)=>{hendelFilter(e)}}/>
            <i className="fas fa-search search-icon searchIconSide text-2xl right-0 mr-5 text-primary"></i>
        </div>
        </li>
        {/* <li><div className='cursor-pointer mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm' >All todos</div></li> */}
       <li className='mb-5'><button className='filtersbtn text-text/80' onClick={()=>setShowFilters(perv=>!perv)}>Additional filters <MixerHorizontalIcon className="ml-2"/></button></li>
        {showFilters&& <>
          
                  <li className='mb-5'><div>
          
                  <label htmlFor="categories" className=" block text-2xl font-medium text-43ADAD-800 mb-2 cateLabel text-primary" >Categories:</label>
                  <div className="search-containerSide p-4 bg-accent/40 shadow-sm rounded-sm flex text-center h-12 w-full">
          
                    <input type="text" id='categories' className='searchBarSide focus:outline-none bg-transparent w-full' placeholder="Search..." onChange={(e)=>{hendelFilter(e)}}/>
                  </div>
                  </div></li>
          
                  <li className='mb-5'> <div>
        <label  className=" block text-2xl font-medium text-43ADAD-800 mb-3 cateLabel text-primary" > Order by:</label>
        <li className='mb-5'><div className='cursor-pointer mt-1 block w-full py-2 px-3 text-text/80 bg-accent/40 hover:bg-accent/30 rounded-md shadow-sm focus:outline-none  sm:text-sm ' 
        onClick={()=>{setSort({...sort,sortBy:"date"})}}>To be done by...</div></li>
        <li className='mb-5'><div className='cursor-pointer mt-1 block w-full py-2 px-3 text-text/80 bg-accent/40 hover:bg-accent/30 rounded-md shadow-sm focus:outline-none  sm:text-sm ' 
        onClick={()=>{setSort({...sort,sortBy:"update"})}}>last update</div></li>        
        <li className='mb-5'><div className='cursor-pointer mt-1 block w-full py-2 px-3 text-text/80 bg-accent/40 hover:bg-accent/30 rounded-md shadow-sm focus:outline-none  sm:text-sm ' 
        onClick={()=>{setSort({...sort,sortBy:"title"})}}>A B C...</div></li>
        <div className="flex items-center space-x-2 ml-2">
                <input type="radio" id="new" name="sort" value="1" onClick={()=>{setSort({...sort,sort:1})}}/>
                <ThickArrowUpIcon htmlFor="new"/>  
                <Label htmlFor="new">ascending order</Label><br/>

            </div><br/>

            <div className="flex items-center space-x-2 ml-2">
                <input className='' type="radio" id="old" name="sort" value="-1" onClick={()=>{setSort({...sort,sort:-1})}}/>
                <ThickArrowDownIcon htmlFor="old"/> 
                <Label htmlFor="old">Descending order</Label> 
            </div>

          </div></li></>}
          <li onClick={()=>{getFilterData()}}>
            <div className='addTodo'>
            Search 
            </div>
        </li>

        </ul>

    </div>
    </div>
  )
}

