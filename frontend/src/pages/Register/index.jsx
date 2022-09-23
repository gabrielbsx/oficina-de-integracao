import Header from "../../components/Header";
import { Formik } from "formik";
import * as Yup from "yup";
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
            date: '',
            email: '',
            password: '',
            repeatPassword: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required().max(50),
            cpf: Yup.string().required().min(13).max(15).matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'cpf must match the following: xxx.xxx.xxx-xx.'),
            date: Yup.date().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(8).max(50).matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, 'password must be at least 8 characters containing letters, numbers and at least one special character.'),
            repeatPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'password confirmation must be equals password'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            const {
              name: nome,
              cpf,
              email,
              date: data_nascimento,
              password: senha,
              repeatPassword: confirmacao_senha,
            } = values;
            const user = { nome, email, cpf, data_nascimento, senha, confirmacao_senha };
            console.log(user);
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
                className={touched.name && errors.name ? 'input-error' : null}
                required
              />
              {touched.name && errors.name ? (
                <small className="small-error">{errors.name}</small>
              ): null}

              <label htmlFor="cpf">Cpf</label>
              <input
                id="usercpf"
                name="cpf"
                placeholder="Input your CPF"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cpf}
                className={touched.cpf && errors.cpf ? 'input-error' : ''}
                required
              />
              {touched.cpf && errors.cpf ? (
                <small className="small-error">{errors.cpf}</small>
              ): null}

              <label htmlFor="date">Cpf</label>
              <input
                id="userdate"
                name="date"
                placeholder="Input your birth date"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.date}
                className={touched.date && errors.date ? 'input-error' : null}
                required
              />
              {touched.date && errors.date ? (
                <small className="small-error">{errors.date}</small>
              ): null}

              <label htmlFor="email">E-mail</label>
              <input
                id="userEmail"
                name="email"
                placeholder="Input your e-mail"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? 'input-error' : null}
                required
              />
              {touched.email && errors.email ? (
                <small className="small-error">{errors.email}</small>
              ): null}

              <label htmlFor="password">Senha</label>
              <input
                id="userpassword"
                name="password"
                type="password"
                placeholder="Input your password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={touched.password && errors.password ? 'input-error' : null}
                required
              />
              {touched.password && errors.password ? (
                <small className="small-error">{errors.password}</small>
              ): null}
              <p className="condicaosenha">
                Use at least 8 characters containing letters, numbers and at least
                one special character
              </p>

              <label htmlFor="repeat-password">Repetir a Senha</label>
              <input
                id="userpasswordConfirm"
                name="repeatPassword"
                type="password"
                placeholder="Confirm your password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.repeatPassword}
                className={touched.repeatPassword && errors.repeatPassword ? 'input-error' : null}
                required
              />
              {touched.repeatPassword && errors.repeatPassword ? (
                <small className="small-error">{errors.repeatPassword}</small>
              ): null}

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
