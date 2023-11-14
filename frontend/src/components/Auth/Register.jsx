import register_account from "../../api/register_account";
import { useState } from "react";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register_account(username, email, password, fullName);
        window.location.href = '/';
    }

    return (
        <div className="flex flex-col items-center justify-center mt-[20%] ">
            <p className="mb-4">Logo</p>
            <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input className="bg-zinc-800 shadow appearance-none hover:bg-zinc-700 rounded-full w-full py-2 px-3 text-white leading-tight focus:border focus:border-violet-500 focus:outline-none focus:shadow-outline" style={{width: '300px', height: '50px'}} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" name="username" />
                </div>
                <div className="mb-4">
                    <input className="bg-zinc-800 hover:bg-zinc-700 shadow appearance-none hover:border rounded-full w-full py-2 px-3 text-white leading-tight focus:border focus:border-violet-500 focus:outline-none focus:shadow-outline"  style={{width: '300px', height: '50px'}} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" type="text" name="fullName" />
                </div>
                <div className="mb-4">
                    <input className="bg-zinc-800 shadow appearance-none hover:bg-zinc-700 rounded-full w-full py-2 px-3 text-white leading-tight focus:border focus:border-violet-500 focus:outline-none focus:shadow-outline" style={{width: '300px', height: '50px'}} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" name="email" />
                </div>
                <div className="mb-4">
                    <input className="bg-zinc-800 hover:bg-zinc-700 shadow appearance-none hover:border rounded-full w-full py-2 px-3 text-white leading-tight focus:border focus:border-violet-500 focus:outline-none focus:shadow-outline"  style={{width: '300px', height: '50px'}} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" name="password" />
                </div>
                
                <input type="submit" className="bg-gradient-to-r from-violet-900 to-violet-700 hover:from-violet-800 hover:to-violet-600 text-white font-bold py-2 px-4 rounded-full" value="Register"/>
            </form>
        </div>
    )
}

export default Register;