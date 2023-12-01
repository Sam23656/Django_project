import Header from "../Start_Page/Header";
function ProfilePage() {
    return(
        <div>
        <Header />
        <div div className="d-flex flex-column align-items-center">
        <div style={{marginTop: "140px", width: "50%"}} className="border d-flex flex-column align-items-center border-primary rounded-3">
            <h1 className="ms-3 me-3">Профиль</h1>
        </div>
        </div>
        </div>
    )
}

export default ProfilePage;