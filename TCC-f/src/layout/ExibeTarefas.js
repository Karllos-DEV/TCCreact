import { useState } from "react";
import { Link } from "react-router-dom";

import tarefaService from "../services/tarefas";

import "./ExibeTarefas.css";

function ExibeTarefas({ tarefas, setTarefas }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  const openConfirmation = (id) => {
    setTaskIdToDelete(id);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setTaskIdToDelete(null);
    setShowConfirmation(false);
  };

  const confirmDelete = () => {
    if (taskIdToDelete !== null) {
      tarefaService
        .remove(taskIdToDelete)
        .then(() => {
          setTarefas(tarefas.filter((tarefa) => tarefa.id !== taskIdToDelete));
          closeConfirmation();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.nome_tarefa}
            <Link to={`http://localhost:3000/${tarefa.id}`}>
              <i className="bi bi-pencil m-2 text-primary-emphasis"></i>
            </Link>
            <i
              className="bi bi-trash m-2 text-danger"
              onClick={() => openConfirmation(tarefa.id)}
              style={{ cursor: "pointer" }}
            ></i>
          </li>
        ))}
      </ul>
      {showConfirmation && (
        <div className="modal container">
          <div className="modal-content">
            <h4>Realmente deseja excluir?</h4>
            <button onClick={confirmDelete}>Sim</button>
            <button onClick={closeConfirmation}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExibeTarefas;
