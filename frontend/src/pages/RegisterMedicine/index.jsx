
import Header from "../../components/Header";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../api";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";


const RegisterMedicine = () => {
    return(
        <div>
      <Header screem="Register"></Header>

      <div className="cadastro">
        <h1>Register Medicine</h1>

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
          onSubmit={async (values, { setSubmitting }) => {
            const {
              name: nome,
              cpf,
              email,
              date: data_nascimento,
              password: senha,
              repeatPassword: confirmacao_senha,
            } = values;
            const user = { nome, email, cpf, data_nascimento, senha, confirmacao_senha };
            
            try {
              const { data: { body: { cliente }, statusCode } } = await api.post('/users/create', user);

              if (statusCode === 201) {
                toast('Conta criada com sucesso!', {
                  icon: '👏',
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                });
              }
            } catch (error) {
              const errors = error.response.data.errors;
              const message = errors.map((error) =>  error.message).join(', ')
              toast.error(message, {
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              });
            }
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
                id="medicinename"
                name="name"
                placeholder="Input Medicine Name"
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
                id="medicinepharmaceutical"
                name="pharmaceutical"
                placeholder="Input Pharmaceutical Name"
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

              <button type="submit" className="btn btn-primary">
                <b>Register</b>
              </button>
            </form>
          )}
        </Formik>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
    );
}


export default RegisterMedicine