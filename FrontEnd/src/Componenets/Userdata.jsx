import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUserData } from '../Storage/Usersave';

const Userdata = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const dispatch = useDispatch();
    const [isDirty, setIsDirty] = useState(false);
  
    const onSubmit = (data) => {
        const userData = { data, userId: generateUserId() };

        const existingData = JSON.parse(localStorage.getItem('userData')) || [];

        existingData.push(userData);

        localStorage.setItem('userData', JSON.stringify(existingData));

        dispatch(setUserData(existingData));

        reset();
        setIsDirty(false);

        setTimeout(() => {
            window.location.reload(); 
        }, 200);
    };

    const generateUserId = () => {
        return 'user-' + Math.random().toString(36).substring(2, 9);
    };

    watch(() => {
        setIsDirty(true);
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-2 w-[85%] mx-10 mt-10 bg-opacity-50 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-4">User Data Form</h2>
      
          <div className="mb-4 flex items-center">
            <label className="block font-medium">Name:</label>
            <input
              {...register("name", { required: true })}
              className="mx-6 mr-5 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
          </div>
      
          <div className="mb-4 flex items-center">
            <label className="block font-medium">Address:</label>
            <input
              {...register("address", { required: true })}
              className="mx-2 mr-5 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && <span className="text-red-500 text-sm">This field is required</span>}
          </div>
      
          <div className="mb-4 flex items-center">
            <label className="block font-medium">Email:</label>
            <input
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className="mx-7 mr-5 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">This field is required and must be a valid email</span>
            )}
          </div>
      
          <div className="mb-4 flex items-center">
            <label className="block font-medium">Phone:</label>
            <input
              {...register("phone", { required: true, pattern: /^[0-9]*$/ })}
              className="mr-5 mx-5 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">This field is required and must be a valid phone number</span>
            )}
          </div>
      
          <button
            type="submit"
            className="w-60 mx-24 bg-black bg-opacity-30 text-black mb-5 font-bold py-2 rounded hover:bg-opacity-50 transition duration-200"
          >
            Save
          </button>
        </form>
    );
};

export default Userdata;
