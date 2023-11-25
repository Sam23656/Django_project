import Header from "./Header";
import Footer from "./Footer";
function StartPage() {

    return(
        <div className="flex flex-col">
            <Header />
            <div className="flex self-center mt-2 flex-wrap border-2 bg-swirl-dark rounded border-rust text-center items-center justify-center  flex-col" style={{height: '200px', width: '40%'}}>
                <p>Start Page</p>
            </div>
            <Footer />
        </div>
    )
}

export default StartPage;