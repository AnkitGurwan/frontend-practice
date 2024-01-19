// InputForm.js

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from './spinner';

const InputForm = () => {
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState({
    firstName:"",
    lastName: ""
  })
  const [formValue, setFormValue] = useState();

  const url = "http://localhost:5000"

  const changeHandler = (e) => {
    setUser({...user,[e.target.name]:e.target.value});
  }

  const submitHandler = async () => {

    const formdata = new FormData();
    formdata.append("file",formValue);
    formdata.append("upload_preset","ankitdemo");
    formdata.append("cloud_name","dyufvjigd");

    const x = await fetch(`https://api.cloudinary.com/v1_1/dyufvjigd/image/upload`, {
      method: 'POST',
      body: formdata,
    }).then((res)=>res.json()).then((data)=>
    {
        return createPost(user._id,post.description,data.url);
    });
   

    if(x === 201){
      Navigate(`/mypost/${user._id}`);
      getItem();
      setPostAdd(false);
      toast.success('Post Added', {
      position: toast.POSITION.TOP_CENTER
      });
      post.description="";
      setFormValue(null);
      setPostAdded(true);
      setShowImage(false);
    }
    
    else {
      setPostAdd(false);
        toast.error('Could not Post. Please try again later.', {
        position: toast.POSITION.TOP_CENTER
      });
    }
}

  const clickHandler = async (e) => {
      

      if(!user.firstName)
      {
        toast.error('User first name is missing');
          setLoading(false);
          return;
      }
      if(!user.lastName)
      {
        toast.error('User last name is missing');
          setLoading(false);
          return;
      }

      setLoading(true);
      e.preventDefault();



      //cloudinary usage
      const formdata = new FormData();
      formdata.append("file",formValue);
      formdata.append("upload_preset","ankitdemo");
      formdata.append("cloud_name","dyufvjigd");

      const x = await fetch(`https://api.cloudinary.com/v1_1/dyufvjigd/image/upload`, {
        method: 'POST',
        body: formdata,
      });

      const body = await x.json();
      const urlImg = body.url;

      const firstName = user.firstName;
      const lastName = user.lastName;

      //post request to add new item
      const response = await fetch(`${url}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName , lastName , urlImg})
      });
      
      const json = await response.json();

      if(response.status === 201)
      {
        user.firstName="";
        user.lastName="";
        setFormValue(null);
        toast.success('You did it!');
        setLoading(false);
      }
      else if(response.status === 401)
      {
        toast.error('Name already there.');
        setLoading(false);
      }
      else{
        toast.error('Can not add at the moment.');
        setLoading(false);
      }

  }

  const imageHandler = async (event) => {
    setFormValue(event.target.files[0]);
  }
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">User Information</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your first name"
            required
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your last name"
            required
          />
        </div>
        <input className="mb-2 p-1 md:p-0 w-full text-black bg-white" type='file' id='picture' name='picture' required onChange={imageHandler}/>
        
          <button
          type="submit"
          onClick={clickHandler}
          className="w-full mt-2 h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 focus:outline-none focus:shadow-outline"
          >
            {
            loading
            ?
            <div className='flex items-center justify-center'>
              <div className='pr-2'><Spinner/></div>
              <div>Loading...</div>
            </div>
            :<div>Submit</div>
            }
        </button>
        
        </form>
        <Toaster />
    </div>
  );
};

export default InputForm;
