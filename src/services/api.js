import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000"
});

export const getContacts = () => API.get("/contacts");
export const addContact = (data) => API.post("/contacts", data);
export const updateContact = (id, data) => API.put(`/contacts/${id}`, data);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);
