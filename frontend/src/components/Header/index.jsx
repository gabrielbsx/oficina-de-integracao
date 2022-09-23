import { useNavigate } from 'react-router-dom'
import icon from '../../assets/logo.png'

import './index.css'

const Header = ({ screem }) => {
	const navegar = useNavigate()

	const renderNavLinks = (screen) => {
		switch (screen) {
			case 'Main':
				return (
					<>
						<span onClick={() => navegar('/register')}>Sign Up</span>
						<span onClick={() => navegar('/login')}><strong>Sign In</strong></span>
					</>
				)

			case 'Login':
				return (
					<>
						<span onClick={() => navegar('/register')} ><strong>Sign Up</strong></span>
					</>
				)

			case 'Cadastro':
				return (
					<>
						<span onClick={() => navegar('/Login')}><strong>Sign In</strong></span>
					</>
				)

			default:
				break
		}
	}

	return (
		<div className="Header">
			<div className='Header-logo'>
				<img src={icon} alt="Icone" />
			</div>
			<div className='Header-btns'>
				{renderNavLinks(screem)}
			</div>
		</div>
	)
}

export default Header