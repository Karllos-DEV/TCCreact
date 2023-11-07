import axios from "axios";

const urlBase = "http://localhost:3001/tarefas";

const getAll = () => axios.get(urlBase);

const getOne = (id) => axios.get(`${urlBase}/${id}`)

const create = (tarefaObject) => axios.post(urlBase, tarefaObject);

const remove = (id) => axios.delete(`${urlBase}/${id}`)

const update = (id, tarefaObject) => axios.patch(`${urlBase}/${id}`, tarefaObject)

const tarefaService = { getAll, getOne, create, remove, update };

export default tarefaService;
