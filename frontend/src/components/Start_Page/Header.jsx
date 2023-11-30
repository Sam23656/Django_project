import Cookies from 'js-cookie';
import React from 'react';

function Header() {
    return (
        <div className="flex flex-row justify-between items-center bg-swirl-dark" style={{ height: '60px', width: '100%' }}>
            <a href="/" className="ms-3">Logo</a>
            <div>
                {Cookies.get("access_token") ? (
                    <>
                    <a href="/Logout" className="btn-primary">
                        Logout
                    </a>
                    <a href="/Profile" className="btn-primary">
                    Profile
                    </a>
                    </>
                ) : (
                    <>
                        <a href="/Login" className="btn-primary">
                            Login
                        </a>
                        <a href="/Register" className="btn-primary">
                            Register
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
