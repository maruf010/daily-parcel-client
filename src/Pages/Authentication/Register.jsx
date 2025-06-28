import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';


const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState();
    const axiosInstance = useAxios();

    //form submit
    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);

                //update userinfo in DB
                const userInfo = {
                    email: data.email,
                    role: 'user', //default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                };
                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data);


                //update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('Profile Updated!');
                    }).catch(error => {
                        console.log(error);
                    })

            })
            .catch(error => {
                console.log(error);
            })
    };


    //image uploading
    const handleImage = async (e) => {
        const image = e.target.files[0]
        console.log(image);
        const formData = new FormData();
        formData.append('image', image)

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`
        const res = await axios.post(imageUploadUrl, formData)
        // console.log(res.data.data.url);
        setProfilePic(res.data.data.url);
    };


    return (
        <div className="card bg-base-100 w-full md:max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Name</label>
                        <input type="text" {...register('name', { required: true })} className="input" placeholder="Name" />
                        {
                            errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
                        }
                        {/* image */}
                        <label className="label">Photo</label>
                        <input type="file"
                            onChange={handleImage}
                            className="input"
                            placeholder="Photo" />

                        {/* Email */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }

                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                        }

                        <button className="btn btn-primary text-black mt-4">Register</button>

                    </fieldset>
                </form>
                <p><small>Already have an Account? <Link to='/login' className='text-blue-500'>Login</Link> </small></p>

                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;