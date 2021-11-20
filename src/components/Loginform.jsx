import axios from "axios";
import { useState } from "react";

const Loginform = () =>{
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [error , setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const authObject = {'Project-ID' : process.env.REACT_APP_PROJECTID , 'User-Name' : username, 'User-Secret': password }

        try {
            // username | password => chatengine -> give messsages
            await axios.get(process.env.REACT_APP_URL,{headers: authObject});

            //works out -> logged in

            localStorage.setItem('username',username);
            localStorage.setItem('password',password);

            window.location.reload();
            setError('')
        } catch (error) {
            // error -> try with new username...
            setError('Incorrect Username and Password')
        }
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
            </div>
        </div>
    );
}

export default  Loginform;