
import Header from "../../components/Header";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../api";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
import trash from '../../assets/trash-white.png'

const RegisterMedicine = () => {

    return(
    <div>
      <Header screem="EditMedicine"></Header>

      <div className="edit">

        <h1>Editar Medicamento</h1>

        <button type="submit" className="trash-btn">
          <img src={trash} alt="Lixeira"/>
        </button>

		    <Formik
          initialValues={{
          name: '',
          date: '',
          hour: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required().max(50),
          date: Yup.date().required(),
          hour: Yup.date().required(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const {
            name: name_medicine,
            date: data_medicine,
            hour: hour_medicine
          } = values;
          const medicine = { name_medicine, data_medicine, hour_medicine };
          
          try {
            const { data: { body: statusCode } } = await api.put('/medicine/edit', medicine);

            if (statusCode === 201) {
              toast('Medicamento editado com sucesso!', {
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
              id="medicineName"
              name="name"
              placeholder="Nome do medicamento"
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

            <label htmlFor="date">Data</label>
            <input
              id="medicineDate"
              name="date"
              placeholder="Data para tomar o medicamento"
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

            <label htmlFor="time">Hora</label>
            <input
              id="medicineDate"
              name="time"
              placeholder="Hora para tomar o medicamento"
              type="time"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.hour}
              className={touched.hour && errors.hour ? 'input-error' : null}
              required
            />
            {touched.hour && errors.hour ? (
              <small className="small-error">{errors.hour}</small>
            ): null}

            <button type="submit" className="btn btn-primary">
              <b>Editar</b>
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