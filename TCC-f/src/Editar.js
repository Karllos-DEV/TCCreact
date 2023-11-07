import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Editar() {
  const { id } = useParams();
  const navigate = useNavigate(); // Inicializa o useNavigate
  const [tarefaEditada, setTarefaEditada] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/tarefas/${id}`).then((response) => {
      setTarefaEditada(response.data.nome_tarefa);
    });
  }, [id]);

  const handleTarefaChange = (event) => {
    setTarefaEditada(event.target.value);
  };

  const editTarefa = (event) => {
    event.preventDefault();

    const tarefaObject = {
      nome_tarefa: tarefaEditada,
    };

    axios
      .patch(`http://localhost:3001/tarefas/${id}`, tarefaObject)
      .then(() => {
        setTarefaEditada("");
        navigate("/");
      });
  };

  return (
    <div className="container">
      <h2>Edição de Tarefa</h2>
      <form onSubmit={editTarefa}>
        <div className="mb-3">
          <label htmlFor="tarefa" className="form-label">
            Tarefa:
          </label>
          <input
            type="text"
            className="form-control"
            value={tarefaEditada}
            onChange={handleTarefaChange}
          />
          <button className="btn btn-secondary mt-4">Editar</button>
        </div>
      </form>
    </div>
  );
}

export default Editar;
