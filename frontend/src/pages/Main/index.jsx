
import Header from "../../components/Header"
import './index.css'
import logo from '../../assets/logo.svg'

const Main = () =>{
    return(
        <div>
            <Header screem="Main" />
            <div className="logo">
                <img src={logo} alt="Logo"/>
            </div>

            <div className='main'>
                <h2>The best place for you to menage your medicines!</h2>
            </div>
        </div>
    )
}

export default Main