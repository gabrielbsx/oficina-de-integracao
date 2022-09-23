import Header from "../../components/Header"
import './index.css'


const Refactor = () =>{

    return(
        <div className="login">
            <Header screem='Register' />

            <div className="Login container mt-4">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <h1>Recovery your password</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="inputEmail" className="form-label">Email</label>
                                 <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder='Input your email'
                                />
                            </div>

                            <button>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Refactor