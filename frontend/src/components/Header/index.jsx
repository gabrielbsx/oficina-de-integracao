import { useNavigate } from 'react-router-dom'
import icon from '../../assets/icon.png'

import './index.css'

const Header = ({ screem }) => {
	const navegar = useNavigate()

	const renderNavLinks = (screen) => {
		switch (screen) {
			case 'Home':
				return (
					<>
						<span onClick={() => navegar('/register')}>Cadastre-se</span>
						<span onClick={() => navegar('/login')}><strong>Entrar</strong></span>
					</>
				)

			case 'Login':
				return (
					<>
						<span onClick={() => navegar('/register')} ><strong>Cadastrar-se</strong></span>
					</>
				)

			case 'Register':
				return (
					<>
						<span onClick={() => navegar('/Login')}><strong>Entrar</strong></span>
					</>
				)

			case 'RegisterMedicine':
				return (
					<>
						<span onClick={() => navegar('/registermedicine')}><strong>Home</strong></span>
					</>
				)

			default:
				break
		}
	}

	return (
		<div className="Header">
			<div className='Header-logo'>
				<img onClick={() => navegar('/')} src={icon} alt="Icone" />
			</div>
			<div className='Header-btns'>
				{renderNavLinks(screem)}
			</div>
		</div>
	)
}

export default Header