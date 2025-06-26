import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin/SocialLogin';
import useAuth from '../../Hooks/useAuth';

const Login = () => {

    const { signIn } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || '/';


    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(res => {
                console.log(res.data);
                navigate(from)
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <div className="card bg-base-100 w-full md:max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Login Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }

                        <label className="label">Password</label>
                        <input type="password" {...register("password", { required: true })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button className="btn btn-primary text-black mt-4">Login</button>
                    </fieldset>
                </form>
                <p><small>New to this website? <Link to='/register' className='text-blue-500'>Register</Link> </small></p>

                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;