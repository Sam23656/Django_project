import Header from "./Header";

function StartPage() {
    
    return(
        <div>
        <Header />
        <div className="d-flex flex-column align-items-center">
        <div style={{marginTop: "140px", width: "50%"}} className="border d-flex flex-column align-items-center border-primary rounded-3">
            <h1 className="ms-3 me-3">Добро пожаловать</h1>
        </div>
        </div>
        </div>
    )
}

export default StartPage;