import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router'

export default function CreateUser() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    function setUsername(event) {
        const username = event.target.value;
        setUsernameInput(username);
    }
    function setUserCreationDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        setCreateDate(formattedDate);
    }

    function setPassword(event) {
        const pswd = event.target.value;
        setPasswordInput(pswd);
    }

    async function submit() {
        try {
            const response = await axios.post('/api/users/register', {username: usernameInput, password: passwordInput, createDate: createDate})
            navigate('/')
        } catch (e) {
            console.log(e)
            setError(e.response.data)
        }
        console.log(usernameInput, passwordInput);
    }

    return (
        <div>
            <h1>Register New User</h1>
            {!!error && <h3>{error}</h3>}
            <div>
                <span>Username: </span><input type='text' value={usernameInput} onInput={setUsername}></input>
            </div>
            <div>
                <span>Password: </span><input type='text' value={passwordInput} onInput={setPassword}></input>
            </div>

            <button onClick={submit}>Create Account and Log In</button>
        </div>
    )


}
