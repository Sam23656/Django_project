
function Footer() {

    return(
        <div className="flex flex-row justify-between items-center fixed bottom-0 bg-swirl-dark " style={{height: '60px', width: '100%'}}>
            <p className="ms-3">Logo</p>
            <div className="flex flex-col flex-wrap" style={{height: '50px', width: '80%'}}>
            <a className="hover:underline" href="/Login">Login</a>
            <a className="hover:underline" href="/Register">Register</a>
            
            </div>
        </div>
    )
}

export default Footer;