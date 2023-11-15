
function Header() {

    return(
        <div className="flex flex-row justify-between items-center bg-swirl-dark " style={{height: '60px', width: '100%'}}>
            <p className="ms-3">Logo</p>
            <div>
            <a href="/Login" className="btn-primary">Login</a>
            <a href="/Register" className="btn-primary">Register</a>
            </div>
        </div>
    )
}

export default Header;