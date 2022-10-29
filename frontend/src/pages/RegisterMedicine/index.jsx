import Header from "../../components/Header";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../api";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import { TextField } from "@material-ui/core";

const RegisterMedicine = () => {
  const [limit, setLimit] = useState(10);
  const [medicine, setMedicine] = useState();
  const [medicines, setMedicines] = useState([]);
  const [date, setDate] = useState("04:20");
  // const [page, setPage] = useState(1);
  const [meta, setMeta] = useState();
  const navegar = useNavigate();

  const fetchMedicines = async (search = "", options, { page }) => {
    try {
      page = page || 1;
      const { data } = await api.get(
        `/medicines?page=${page}&limit=${limit}&search=${search}`
      );
      if (data.statusCode === 200) {
        setMeta(data.body.medicamentos.meta);
        const hasMore = data.body.medicamentos.meta.last_page > page;
        const options = data.body.medicamentos.data.map((medicine) => ({
          value: medicine.id,
          label:
            medicine.nome.replace(/"/g, "").toLowerCase() +
            " - " +
            medicine.farmaceutica
              .replace(/"/g, "")
              .toLowerCase()
              .split(" - ")[1],
        }));
        setMedicines(options);
        return {
          options,
          hasMore,
          additional: {
            page: page + 1,
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header screem="RegisterMedicine"></Header>

      <div className="register">
        <h1>Register Medicine</h1>

        <Formik
          initialValues={{}}
          onSubmit={async () => {
            try {
              const med = {
                idMedicamento: medicine.value,
                horaGerenciamento: date,
              };
              const {
                data: { statusCode },
              } = await api.post("/medicines/create", med);

              if (statusCode === 201) {
                toast("Medicamento adicionado na agenda com sucesso!", {
                  icon: "👏",
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              }
            } catch (error) {
              const errors = error.response.data.errors;
              const message = errors.map((error) => error.message).join(", ");
              toast.error(message, {
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
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
            <form id="formRegister" onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  marginBottom: 20,
                }}
              >
                <TextField
                  id="outlined-basic"
                  defaultValue="04:20"
                  type="time"
                  placeholder="Hora"
                  className="input"
                  variant="outlined"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <AsyncPaginate
                  className="input"
                  placeholder="Medicamento"
                  value={medicine}
                  loadOptions={fetchMedicines}
                  onChange={setMedicine}
                  additional={{
                    page: 1,
                  }}
                />
              </div>

              {touched.cpf && errors.cpf ? (
                <small className="small-error">{errors.cpf}</small>
              ) : null}

              <button type="submit" className="btn btn-primary">
                <b>Registrar</b>
              </button>
            </form>
          )}
        </Formik>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default RegisterMedicine;
