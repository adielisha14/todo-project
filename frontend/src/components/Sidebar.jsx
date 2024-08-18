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
    
    <div className='sidebar-container'>

    <ul className='sidebar-list'>
        <li>
            <div onClick={()=>{setCount(true)}} className='addTodo'>
                Add a Todo
                <i className="fa-solid fa-circle-plus addIcon" ></i>
            </div>
        </li>
        <li>
        <label  className=" block text-2xl font-medium text-43ADAD-800 mb-2 cateLabel" >Filters:</label>

        <div className="search-containerSide">
            <input type="text" id='title' className='searchBarSide' placeholder="Search..." onChange={(e)=>{hendelFilter(e)}}/>
            <i className="fas fa-search search-icon searchIconSide"></i>
        </div>
        </li>
        {/* <li><div className='cursor-pointer mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm' >All todos</div></li> */}
       <li><button className='filtersbtn' onClick={()=>setShowFilters(perv=>!perv)}>Additional filters <MixerHorizontalIcon className="ml-2"/></button></li>
        {showFilters&& <>
          
                  <li><div>
          
                  <label htmlFor="categories" className=" block text-2xl font-medium text-43ADAD-800 mb-2 cateLabel" >Categories:</label>
                  <div className="search-containerSide">
          
                    <input type="text" id='categories' className='searchBarSide' placeholder="Search..." onChange={(e)=>{hendelFilter(e)}}/>
                  </div>
                  </div></li>
          
                  <li> <div>
        <label  className=" block text-2xl font-medium text-43ADAD-800 mb-2 cateLabel" > Order by:</label>
        <li><div className='cursor-pointer mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm ' 
        onClick={()=>{setSort({...sort,sortBy:"date"})}}>To be done by...</div></li>
        <li><div className='cursor-pointer mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm ' 
        onClick={()=>{setSort({...sort,sortBy:"update"})}}>last update</div></li>        
        <li><div className='cursor-pointer mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm ' 
        onClick={()=>{setSort({...sort,sortBy:"title"})}}>A B C...</div></li>
        <div className="flex items-center space-x-2 ml-2">
                <input type="radio" id="new" name="sort" value="1" onClick={()=>{setSort({...sort,sort:1})}}/>
                <ThickArrowUpIcon htmlFor="new"/>  
                <Label htmlFor="new">ascending order</Label><br/>

            </div><br/>

            <div className="flex items-center space-x-2 ml-2">
                <input  type="radio" id="old" name="sort" value="-1" onClick={()=>{setSort({...sort,sort:-1})}}/>
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

