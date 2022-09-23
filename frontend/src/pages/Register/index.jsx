import Header from "../../components/Header";

import './index.css'

const Register = () =>{
    return(
        <div>
            <Header screem="Register"></Header>

            <div className="cadastro">
                <h1>Register</h1>
		        <p class="descricao">Como a sua conta, você poderá gerenciar suas coleções em flash cards.</p>
		        
                <form id="formCadastro">
                    <label for="name">Nome</label>
			        <input id="username" name="name" placeholder="Input your name" type="text" required/>

                    <label for="cpf">Cpf</label>
			        <input id="usercpf" name="cpf" placeholder="Input your CPF" type="text" required/>

                    <label for="date">Cpf</label>
			        <input id="userdate" name="date" placeholder="Input your birth date" type="date" required/>

			        <label for="email">E-mail</label>
			        <input id="userEmail" name="email" placeholder="Input your e-mail" type="email" required/>

			        <label for="password">Senha</label>
			        <input id="userpassword" name="password" type="password" placeholder="Input your password" required/>
			        <p class="condicaosenha">Use at least 8 characters containing letters, numbers and at least one special character</p>

			        <label for="repeat-password">Repetir a Senha</label>
			        <input id="userpasswordConfirm" name="repeat-password" type="password" placeholder="Confirm your password" required/>

			        <button type="submit" class="btn btn-primary"><b>Sign Up</b></button>
		        </form>
            </div>
        </div>
    )
}

export default Register