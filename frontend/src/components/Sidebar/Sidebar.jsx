import React from 'react'
import "./sidebar.css"
function Sidebar() {
  return (
    <>
    <div className='sidebar-container'>

    <ul className='sidebar-list'>
        <li>
            <div className='addTodo'>
                Add a Todo
                <i className="fa-solid fa-circle-plus addIcon"></i>
            </div>
        </li>
        <li>
        <div className="search-containerSide">
            <input type="text" className='searchBarSide' placeholder="Search..."/>
            <i className="fas fa-search search-icon searchIconSide"></i>
        </div>
        </li>
        <li><div className='cursor-pointer mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm '>All todos</div></li>

        <li><div className='cursor-pointer mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm '>Today's todos</div></li>

        <li><div>

        <label htmlFor="categories" className=" block text-2xl font-medium text-43ADAD-800 mb-2 cateLabel" >Categories:</label>
    <select id="categories" name="categories" className="mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm ">
      <option value="work" >Work</option>
      <option value="sport" >Sport</option>
      <option value="personal" >Personal</option>
    </select>

        </div></li>

    </ul>


    </div>
    </>
  )
}

export default Sidebar