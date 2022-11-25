import Header from "../../components/Header";
import api from "../../api";
import "./styles.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const Medicines = () => {
  const [limit, setLimit] = useState(10);
  const [medicine, setMedicine] = useState();
  const [medicines, setMedicines] = useState([]);
  const [date, setDate] = useState("04:20");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState();
  const navegar = useNavigate();

  const fetchMedicines = async () => {
    try {
      const { data } = await api.get(
        `/medicines/all?page=${page}&limit=${limit}`
      );
      console.log(data);
      if (data.statusCode === 200) {
        setMeta(data.body.gerenciamentos.meta);
        setMedicines(data.body.gerenciamentos.data);
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
    fetchMedicines();
  }, []);

  return (
    <div>
      <Header screem="Medicines"></Header>

      <div className="cadastro">
        <h1 className="title">Medicamentos</h1>
        <button
          onClick={() => {
            navegar('/registermedicine')
          }}
          className="btnTitle"
        >
          <b>Adicionar</b>
        </button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text">Medicamento</TableCell>
                <TableCell>Horário</TableCell>
                <TableCell colSpan={2}></TableCell>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines.map((medicine, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>
                    {medicine.medicamento.nome.replace(/\"/g, "")}
                  </TableCell>
                  <TableCell>{medicine.hora_gerenciamento}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => {
                        navegar(`/editmedicine/${medicine.id}`);
                      }}
                      className="btnManage"
                    >
                      <b>Editar</b>
                    </button>
                  </TableCell>
                  <TableCell>
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
                      className="btnManage"
                    >
                      <b>Deletar</b>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Medicines;
