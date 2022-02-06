import React, {ChangeEvent, useState} from 'react';

export const Login = (): React.ReactElement => {
        console.log('login')

        const [email, setEmail] = useState('blabla@mail.ru')
        const [password, setPassword] = useState('12345')

        const changeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)
        const changePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)

        return  <div className={'loginContainer'}>
                <h1>Sign In</h1>
                <div><input type={'email'} placeholder={'Email'} value={email} onChange={changeEmail}/></div>
                <div><input type={'password'} placeholder={'Password'} value={password} onChange={changePassword}/></div>
                <div><span>Remember me</span><input type={'checkbox'}/></div>
                <div><a href={''}>forgot?</a></div>
                <div><button>Login</button></div>
                <div><a href={''}>Don't have an account?</a></div>
                <div><button>Sign Up</button></div>
        </div>
}