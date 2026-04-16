import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const getContacts = () => {
  return API.get("/contacts").then((res) => {
    // Filter out deleted contacts and sort by updated_at (newest first)
    return {
      ...res,
      data: res.data
        .filter((contact) => contact.deleted_at === null)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)),
    };
  });
};

export const addContact = (data) => {
  const now = new Date().toISOString();
  const contactData = {
    ...data,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  };
  return API.post("/contacts", contactData);
};

export const updateContact = (id, data) => {
  const updatedData = {
    ...data,
    updated_at: new Date().toISOString(),
  };
  return API.put(`/contacts/${id}`, updatedData);
};

export const softDeleteContact = (id) => {
  // Soft delete: set deleted_at instead of hard delete
  return API.patch(`/contacts/${id}`, {
    deleted_at: new Date().toISOString(),
  });
};

// Keep deleteContact as alias for softDeleteContact for backward compatibility
export const deleteContact = (id) => softDeleteContact(id);
