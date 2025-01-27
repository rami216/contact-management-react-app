import React, { useState, useEffect } from "react";
import api from "../api";
import ContactTable from "../components/ContactTable";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(""); // Search query

  useEffect(() => {
    fetchContacts(currentPage, search);
  }, [currentPage, search]);

  const fetchContacts = async (page, searchQuery = "") => {
    setLoading(true);
    try {
      const res = await api.get(
        `/api/contacts/?page=${page}&search=${searchQuery}`
      );
      setContacts(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 10));
    } catch (error) {
      alert("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // Update currentPage state
    }
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      await api.put(`/api/contacts/${updatedContact.id}/`, updatedContact);
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        )
      );
      alert("Contact updated successfully!");
    } catch (error) {
      alert("Failed to update contact.");
    }
  };
  const handleDeleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return; // Cancel the delete action
    }
    try {
      await api.delete(`/api/contacts/${id}/`);
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
      alert("Contact deleted successfully!");
    } catch (error) {
      alert("Failed to delete contact.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contacts</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search contacts by name, email, or phone"
          value={search}
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <ContactTable
            contacts={contacts}
            onUpdateContact={handleUpdateContact}
            onDeleteContact={handleDeleteContact}
          />
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="align-self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Contacts;
