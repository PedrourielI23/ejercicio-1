// src/services/usuariosService.js
import axios from "axios";

const cliente = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "Content-Type": "application/json" }
});

export const obtenerUsuarios = async () => {
  const resp = await cliente.get("/users");
  return resp.data;
};

export const obtenerUsuarioPorId = async (id) => {
  const resp = await cliente.get(`/users/${id}`);
  return resp.data;
};
