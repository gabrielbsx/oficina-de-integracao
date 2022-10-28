import { Formik } from "formik";
import { useState } from "react"
import Header from "../../components/Header"
import * as Yup from "yup"
import toast, { Toaster } from "react-hot-toast";
import api from "../../api";
import './index.css'


const Refactor = () =>{
    const [newPassword, setNewPassword] = useState(null);
    return(
        <div className="login">
            <Header screem='Register' />

            <div className="Login container mt-4">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <h1>Recovery your password</h1>
                        <Formik
                            initialValues={{
                                cpf: '',
                            }}
                            validationSchema={Yup.object({
                                cpf: Yup.string().required().min(13).max(15).matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'cpf must match the following: xxx.xxx.xxx-xx.'),
                            })}
                            onSubmit={async (values, { setSubmitting }) => {
                                const { cpf } = values;
                                const user = { cpf };

                                try {
                                    const { data: { body: { password }, statusCode } } = await api.post('/users/recovery', user);
                                    if (statusCode === 200) {
                                        setNewPassword(password);
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
                                        <label htmlFor="inputEmail" className="form-label">CPF</label>
                                        <input
                                            type="string"
                                            name="cpf"
                                            className="form-control"
                                            id="inputEmail"
                                            placeholder='Input your cpf'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.cpf}
                                        />
                                        {touched.cpf && errors.cpf ? (
                                            <small className="small-error">{errors.cpf}</small>
                                        ): null}
                                    </div>
                                    {newPassword && (
                                        <div className="new-password">
                                            Sua nova senha é: {newPassword}
                                        </div>
                                    )}

                                    <button type="submit">Send</button>
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

export default Refactor