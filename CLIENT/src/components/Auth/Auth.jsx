import { useRef } from "react";
import { loginuser, registerUser } from "../../services/api_services";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    // Constants
    const navigator = useNavigate();
    // Refs
    const registerName = useRef(null);
    const registerEmail = useRef(null);
    const registerPassword = useRef(null);

    const loginEmail = useRef(null);
    const loginPassword = useRef(null);

    // Funcitons
    const registerUserHandler = async () => {
        const payload = {
            name: registerName.current?.value ?? "",
            email: registerEmail.current?.value ?? "",
            password: registerPassword.current?.value ?? "",
        };
        const { status, data } = await registerUser(payload);
        if (status) {
            alert("Registration Success!");
            console.log("Registration Success!");
        } else {
            alert("Registration Failed, " + data);
        }
    };
    const loginUser = async () => {
        const payload = {
            email: loginEmail.current?.value ?? "",
            password: loginPassword.current?.value ?? "",
        };
        const { status, data } = await loginuser(payload);
        if (status) {
            alert("Login Success, Redirecting Now!");
            // Writing access token in local storage
            localStorage.setItem("login-token", data.accessToken);
            console.log("Registration Success!", data);
            navigator("/");
        } else {
            alert("Login Failed, " + data);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-blue-900 text-xl">Auth</h1>
            <hr />

            <i className="text-blue-900 text-xl">Create Account</i>
            <div className="flex  gap-3 w-52">
                <input
                    type="text"
                    name="register_name"
                    placeholder="Name Here..."
                    className="border-2 border-black p-2"
                    ref={registerName}
                />
                <input
                    type="text"
                    name="register_email"
                    placeholder="Email Here..."
                    className="border-2 border-black p-2"
                    ref={registerEmail}
                />
                <input
                    type="password"
                    name="register_password"
                    placeholder="Password Here..."
                    className="border-2 border-black p-2"
                    ref={registerPassword}
                />
                <button
                    className="border-2 p-2 w-100 bg-black text-white"
                    onClick={registerUserHandler}
                >
                    CREATE_ACCOUNT
                </button>
            </div>
            <br />
            <hr />
            <br />
            <i className="text-blue-900 text-xl">Login</i>
            <div className="flex  gap-3 w-52">
                <input
                    type="text"
                    name="login_email"
                    placeholder="Email Here..."
                    className="border-2 border-black p-2"
                    ref={loginEmail}
                />
                <input
                    type="password"
                    name="login_password"
                    placeholder="Password Here..."
                    className="border-2 border-black p-2"
                    ref={loginPassword}
                />

                <button
                    className="border-2 p-2 w-100 bg-black text-white"
                    onClick={loginUser}
                >
                    LOGIN
                </button>
            </div>
        </div>
    );
};

export default Auth;
