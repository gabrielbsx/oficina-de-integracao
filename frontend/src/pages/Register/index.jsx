import Header from "../../components/Header";
import { Formik } from "formik";

import "./index.css";

const Register = () => {
  return (
    <div>
      <Header screem="Register"></Header>

      <div className="cadastro">
        <h1>Register</h1>
        <p className="descricao">
          Como a sua conta, você poderá gerenciar suas coleções em flash cards.
        </p>

				<Formik
          initialValues={{
            name: '',
            cpf: '',
            date: null,
            email: '',
            password: '',
            repeatPassword: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form id="formCadastro" onSubmit={handleSubmit}>
              <label htmlFor="name">Nome</label>
              <input
                id="username"
                name="name"
                placeholder="Input your name"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                required
              />

              <label htmlFor="cpf">Cpf</label>
              <input
                id="usercpf"
                name="cpf"
                placeholder="Input your CPF"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cpf}
                required
              />

              <label htmlFor="date">Cpf</label>
              <input
                id="userdate"
                name="date"
                placeholder="Input your birth date"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.date}
                required
              />

              <label htmlFor="email">E-mail</label>
              <input
                id="userEmail"
                name="email"
                placeholder="Input your e-mail"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                required
              />

              <label htmlFor="password">Senha</label>
              <input
                id="userpassword"
                name="password"
                type="password"
                placeholder="Input your password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                required
              />
              <p className="condicaosenha">
                Use at least 8 characters containing letters, numbers and at least
                one special character
              </p>

              <label htmlFor="repeat-password">Repetir a Senha</label>
              <input
                id="userpasswordConfirm"
                name="repeat-password"
                type="password"
                placeholder="Confirm your password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.repeatPassword}
                required
              />

              <button type="submit" className="btn btn-primary">
                <b>Sign Up</b>
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
