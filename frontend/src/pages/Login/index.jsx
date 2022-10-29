import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import Header from "../../components/Header"
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import './index.css'
import api from '../../api';


const Login = ({ setToken }) =>{

    const navegar = useNavigate()

    return(
        <div className="login">
            <Header screem='Login' />

            <div className="Login container mt-4">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <h1>Login</h1>
                        <Formik
                            initialValues={{
                                cpf: '',
                                password: '',
                            }}
                            validationSchema={Yup.object({
                                cpf: Yup.string().required().min(13).max(15).matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Cpf deve corresponder ao seguinte formato: xxx.xxx.xxx-xx.'),
                                password: Yup.string().required().min(8).max(50),
                            })}
                            onSubmit={async (values, { setSubmitting }) => {
                                const { cpf, password: senha } = values;
                                const user = { cpf, senha };

                                try {
                                    const { data: { body: { cliente }, statusCode } } = await api.post('/auth/signin', user);

                                    if (statusCode === 200) {
                                        localStorage.setItem('token', cliente.token);
                                        toast('Conta autenticada sucesso!', {
                                          icon: '👏',
                                          style: {
                                            borderRadius: '10px',
                                            background: '#333',
                                            color: '#fff',
                                          },
                                        });
                                        setToken(cliente.token);
                                        navegar('/');
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
                                isSubmitting
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="inputEmail" className="form-label">Cpf</label>
                                        <input
                                            type="string"
                                            name="cpf"
                                            className="form-control"
                                            id="inputEmail"
                                            placeholder="Escreva seu nome"
                                            value={values.cpf}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.cpf && errors.cpf ? (
                                            <small className="small-error">{errors.cpf}</small>
                                        ): null}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputPassword" className="form-label">Senha</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            id="inputPassword"
                                            placeholder="Escreva sua senha"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.password && errors.password ? (
                                            <small className="small-error">{errors.password}</small>
                                        ): null}
                                    </div>

                                    <span className="spanlogin" onClick={() => navegar('/refactorpassword')}>Esqueceu sua senha?</span>

                                    <button type="submit">Entrar</button>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <Toaster position="bottom-center" reverseOrder={false} />
        </div>
    )
}

export default Login