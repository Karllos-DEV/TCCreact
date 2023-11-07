import { useEffect, useState } from "react";

import ExibeTarefas from "./ExibeTarefas";
import tarefaService from "./services/tarefas";

function Contents({ nome }) {
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState("");

  useEffect(() => {
    tarefaService.getAll().then((response) => {
      setTarefas(response.data);
    });
  }, []);

  const addTarefa = (event) => {
    event.preventDefault();
    const tarefaObject = {
      nome_tarefa: tarefa,
    };
    //console.log(tarefaObject);
    tarefaService.create(tarefaObject).then((response) => {
      setTarefas([...tarefas, response.data]);
      setTarefa("");
    });

    //console.log(tarefas);

    //console.log("botão clicado", event.target);
  };

  const handleTarefaChange = (event) => {
    console.log(event.target.value);
    setTarefa(event.target.value);
  };

  return (
    <div className="container">
      <h2>Aprendendo React</h2>
      <p>Seja bem vindo, {nome}!</p>
      <h3>Lista de tarefas:</h3>
      <ExibeTarefas tarefas={tarefas} setTarefas={setTarefas} />
      <hr />
      <form onSubmit={addTarefa}>
        <div className="mb-3">
          <label htmlFor="tarefa" className="form-label">
            Tarefa:
          </label>
          <input
            type="text"
            placeholder="Digite a tarefa..."
            className="form-control"
            value={tarefa}
            onChange={handleTarefaChange}
          />
          <button className="btn btn-secondary mt-4">Adicionar</button>
        </div>
      </form>
    </div>
  );
}

export default Contents;
