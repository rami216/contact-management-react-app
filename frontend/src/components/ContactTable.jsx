import React, { useState } from "react";

function ContactTable({ contacts, onUpdateContact, onDeleteContact }) {
  const [editingId, setEditingId] = useState(null);
  const [editedContact, setEditedContact] = useState({});

  const handleEdit = (contact) => {
    setEditingId(contact.id); // Set the row being edited
    setEditedContact(contact); // Populate form with contact data
  };

  const handleCancel = () => {
    setEditingId(null); // Exit editing mode
    setEditedContact({}); // Clear edited contact state
  };

  const handleSave = () => {
    onUpdateContact(editedContact); // Trigger the update function
    setEditingId(null); // Exit editing mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value }); // Update the edited contact
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              {editingId === contact.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="first_name"
                      className="form-control"
                      value={editedContact.first_name || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="last_name"
                      className="form-control"
                      value={editedContact.last_name || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={editedContact.email || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={editedContact.phone || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{contact.first_name}</td>
                  <td>{contact.last_name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <div className="d-flex justify-content-between mt-4">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(contact)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDeleteContact(contact.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactTable;
