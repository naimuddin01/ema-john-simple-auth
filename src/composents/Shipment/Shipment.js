import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
        const [loggedInUser, setLoggedInUser] = useContext(UserContext)
        const onSubmit = data => console.log("from submitted", data);

        console.log(watch("example")); // watch input value by passing the name of it

        return (
            /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
            <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
            
            {/* include validation with required or other standard HTML validation rules */}
            <input defaultValue={loggedInUser.name} {...register("name",  { required: true })} placeholder="Name"/>
            {/* errors will return when field validation fails  */}
            {errors.name && <span className='error'>name is required</span>}

            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="email"/>
            {/* errors will return when field validation fails  */}
            {errors.email && <span className='error'>email is required</span>}

            <input {...register("phone", { required: true })} placeholder="phone"/>
            {/* errors will return when field validation fails  */}
            {errors.phone && <span className='error'>phone is required</span>}

            <input {...register("address", { required: true })} placeholder="address" />
            {/* errors will return when field validation fails  */}
            {errors.address && <span className='error'>address is required</span>}



            
            <input type="submit" />
    </form>
  );

};

export default Shipment;