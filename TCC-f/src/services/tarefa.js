import axios from "axios";

    const urlBase= "http://localhost:3001/tarefas";

    const getAll = () => axios.get(urlBase);

    const creat = (tarefaObject) => axios.post(urlBase, tarefaObject);

    const tarefaService = {getAll, creat}

export default tarefaService;
