import Header from "../../components/Header";

import api from "../../api";
import "./index.css";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const MedicineDetails = () => {
  const { id } = useParams();
  const [limit, setLimit] = useState(10);
  const [medicine, setMedicine] = useState();
  const [medicines, setMedicines] = useState([]);
  const [meta, setMeta] = useState();
  const [selectedMedicine, setSelectedMedicine] = useState();
  const [date, setDate] = useState("04:20");
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
  };
  
  const fetchMedicineDetails = async () => {
    try {
      const { data } = await api.get(`/medicines/get-by-id/${id}`);
      console.log(id, data);
      if (data.statusCode === 200) {
        setDate(data.body.gerenciamento.hora_gerenciamento);
        setSelectedMedicine(data.body.gerenciamento.medicamento.id);
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
  };

  useMemo(() => {
    fetchMedicineDetails();
  }, []);
  
  return (
    <div>
      <Header screem="MedicineDetails"></Header>

      <div className="details">
        <h1>Detalhes do Medicamento</h1>
          <div className="content">
            <h2>Medicamentos</h2>
            <h3>{medicine}</h3>
            <h2>Horario</h2>
            <h3>{date}</h3>
          </div>
          <div  className="content-btn">
            <button
              onClick={() => {
                navegar(`/editmedicine/${medicine.id}`);
              }}
              className="btn"
            >
              <b>Editar</b>
            </button>
            <button
              onClick={async () => {
                try {
                  const { data } = await api.delete(
                    `/medicines/delete/${medicine.id}`
                  );
                  if (data.statusCode === 200) {
                    toast.success('Medicamento removido com sucesso!', {
                      style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                      },
                    });
                    fetchMedicines();
                  }
                } catch (error) {
                  const errors = error.response.data.errors;
                  const message = errors
                    .map((error) => error.message)
                    .join(", ");
                  toast.error(message, {
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                }
              }}
              className="btn"
            >
              <b>Deletar</b>
            </button>
          </div>
        </div>
      </div>

  );
};

export default MedicineDetails;
