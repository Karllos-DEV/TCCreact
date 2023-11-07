import { useEffect, useState } from "react";

import ExibeTarefas from "../layout/ExibeTarefas";
import tarefaService from "../services/tarefas";
import Loading from "../layout/Loading";

function Contents({ nome }) {
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      tarefaService
        .getAll()
        .then((response) => {
          setTarefas(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response) {
            // O servidor respondeu com um status de erro
            console.error("Erro na requisição:", error.response);
          } else if (error.request) {
            // A requisição foi feita, mas não houve resposta do servidor
            console.error("Não foi possível se conectar ao servidor.");
            setError(
              "Não foi possível se conectar ao servidor. Verifique sua conexão de rede."
            );
          } else {
            // Algo aconteceu na configuração da requisição que causou o erro
            console.error("Erro na configuração da requisição:", error.message);
          }
        });
    }, 1000);
  }, []);

  const addTarefa = (event) => {
    event.preventDefault();
    const tarefaObject = {
      nome_tarefa: tarefa,
    };
    //console.log(tarefaObject);
    tarefaService
      .create(tarefaObject)
      .then((response) => {
        setTarefas([...tarefas, response.data]);
        setTarefa("");
      })
      .catch((error) => console.error(error));
  };

  const handleTarefaChange = (event) => {
    console.log(event.target.value);
    setTarefa(event.target.value);
  };

  return (
    <div className="container">
      <h2>Aprendendo React</h2>
      <p>Seja bem vindo, {nome}!</p>
      {error ? (
        <p className="alert alert-warning" role="alert">
          {error}
        </p>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div>
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
                required
                className="form-control"
                value={tarefa}
                onChange={handleTarefaChange}
              />
              <button className="btn btn-secondary mt-4">Adicionar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Contents;
