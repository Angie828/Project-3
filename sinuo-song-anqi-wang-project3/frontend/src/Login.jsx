import axios from 'axios';
import React, { useState } from 'react';

export default function Login() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [error, setErrorValue] = useState('');

    function setUsername(event) {
        const username = event.target.value;
        setUsernameInput(username);
    }

    function setPassword(event) {
        const pswd = event.target.value;
        setPasswordInput(pswd);
    }

    async function submit() {
        try {
            const response = await axios.post('/api/users/login', {username: usernameInput, password: passwordInput})
        } catch (e) {

            setErrorValue("Username is taken, please try again!")
        }
        // console.log(usernameInput, passwordInput);
    }

    return (
        <div>
            {!!error && error}
            <div>
                <span>Username: </span><input type='text' value={usernameInput} onInput={setUsername}></input>
            </div>
            <div>
                <span>Password: </span><input type='text' value={passwordInput} onInput={setPassword}></input>
            </div>

            <button onClick={submit}>Create Account/Login</button>
        </div>
    )


}