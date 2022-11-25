
import Header from "../../components/Header"
import './index.css'
import logo from '../../assets/logo.svg'

const Home = () =>{
    return(
        <div>
            <Header screem="Home" />
            <div className="logo">
                <img src={logo} alt="Logo"/>
            </div>

            <div className='home'>
                <h2>O melhor lugar para você administrar seus medicamentos!</h2>
            </div>
        </div>
    )
}

export default Home