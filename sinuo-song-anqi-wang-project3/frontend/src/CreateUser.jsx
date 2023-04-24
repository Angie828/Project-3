import axios from 'axios';
import React, { useState } from 'react';

export default function CreateUser() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('')

    function setUsername(event) {
        const username = event.target.value;
        setUsernameInput(username);
    }

    function setPassword(event) {
        const pswd = event.target.value;
        setPasswordInput(pswd);
    }

    function submit() {
        axios.post('/api/users/login', {username: usernameInput, password: passwordInput})
        // console.log(usernameInput, passwordInput);
    }

    return (
        <div>
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