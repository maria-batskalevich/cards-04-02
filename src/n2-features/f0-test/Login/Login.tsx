import React from 'react';
//first
export const Login = (): React.ReactElement => (
    <div className={'loginContainer'}>
        <h1>Sign In</h1>
        <div><input type={'email'} placeholder={'Email'}/></div>
        <div><input type={'password'} placeholder={'Password'}/></div>
        <div><span>Remember me</span><input type={'checkbox'}/></div>
        <div><a href={''}>forgot?</a></div>
        <div><button>Login</button></div>
        <div><a href={''}>Don't have an account?</a></div>
        <div><button>Sign Up</button></div>
    </div>
);