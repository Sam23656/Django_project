
function Header() {

    return(
        <div className="flex flex-row justify-between items-center bg-gradient-to-r to-zinc-940 from-purple-950 " style={{height: '60px', width: '100%'}}>
            <p className="ms-3">Logo</p>
            <div>
            <a href="/Login" className="btn-primary">Login</a>
            <a href="/Register" className="btn-primary">Register</a>
            </div>
        </div>
    )
}

export default Header;