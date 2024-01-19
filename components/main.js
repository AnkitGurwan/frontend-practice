import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'
import toast, { Toaster } from 'react-hot-toast';

const Main = () => {
  const [users, setUsers] = useState([]);

  const url = "http://localhost:5000"


  const getItem = async () => {

      const response = await fetch(`${url}/getAll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
      });
      
      const json = await response.json();
      

      if(response.status === 201)
      {
        setUsers(json);
      }
      else{
        toast.error('Could not fetch items at the moment.');
      }
     
      

  }
  
    useEffect(() => {
      getItem();
    }, []);

    const deletefunc = async (firstName,lastName) => {
      
      const response = await fetch(`${url}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstName,lastName})
      });
      
      const json = await response.json();
      

      if(response.status === 201)
      {
        toast.success('Deleted successfully');
        setUsers(json);
        
      }
      else{
        toast.error('Could not delete at the moment.');
      }
    }

    

    return (
      <div className='bg-white'>
        
          <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6 font-mono ml-1">User List</h2>
            {
            users && users.length === 0 ? (
              <p>Loading... (if do not load try adding new item)</p>
            ) : (
              <ul className='h-80 overflow-y-scroll'>
                {users && users.length && users.map((user, index) => (
                  <li key={index} className="relative mb-2 flex items-center shadow-md p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <span className='text-xl font-mono p-1'>{index+1}.</span>
                    <span className='flex items-center'><img className='w-16 h-16 object-cover' src={user.url} alt={user.firstName}/></span>
                    <span className="mx-2 text-xl font-mono capitalize">{user.firstName} </span>
                    <span className='text-xl font-mono capitalize'>{user.lastName}</span>
                    <span className='text-xl font-mono capitalize absolute right-0 mx-4 flex items-center' onClick={()=>deletefunc(user.firstName,user.lastName)}>
                      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                      <span class="material-symbols-outlined hover:text-red-500">
                      delete
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
        </div>
        <Toaster />
      </div>
    )
}

export default Main;