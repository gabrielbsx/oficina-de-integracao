import { useNavigate } from 'react-router-dom'
import Header from "../../components/Header"
import './index.css'


const Login = () =>{

    const navegar = useNavigate()

    return(
        <div className="login">
            <Header screem='Login' />

            <div className="Login container mt-4">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <h1>Login</h1>
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
                            <div className="mb-3">
                                <label htmlFor="inputPassword" className="form-label">Senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder='Input your password'
                                />
                            </div>

                            <span className="spanlogin" onClick={() => navegar('/refactorpassword')}>Forgot your password?</span>

                            <button onClick={() => navegar('/registermedicine')}>Enter</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login