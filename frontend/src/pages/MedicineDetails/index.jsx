import Header from "../../components/Header";

import api from "../../api";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
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
 
  const fetchMedicineDetails = async () => {
    try {
      const { data } = await api.get(`/medicines/get-by-id/${id}`);
      if (data.statusCode === 200) {
        setMedicine(data.body.gerenciamento);
      }
    } catch (error) {
      if (error.message) {
        toast.error(error.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
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
            {medicine && (
              <>
                <h2>Medicamentos</h2>
                <h3>{medicine.medicamento.nome.replace(/"/g, '')}</h3>
                <h2>Horario</h2>
                <h3>{medicine.hora_gerenciamento}</h3>
              </>
            )}
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
                    navegar('/');
                  }
                } catch (error) {
                  if (error.message) {
                    toast.error(error.message, {
                      style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                      },
                    });
                  } else {
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
                }
              }}
              className="btn"
            >
              <b>Deletar</b>
            </button>
          </div>
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>

  );
};

export default MedicineDetails;
