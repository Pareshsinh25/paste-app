import React from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS

function ViewPaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  console.log("Final Paste", paste);

  // Format date to a more readable format
  const formattedDate = paste ? new Date(paste.createdAt).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) : '';

  return (
    <div className="container mt-4">
      {paste ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{paste.title}</h5>
            <textarea
              className="form-control"
              value={paste.content}
              disabled
              rows={10}
              style={{ resize: "none" }}
            />
            <div className="mt-3">
              <i className="fa fa-calendar" aria-hidden="true"></i> {/* Calendar Icon */}
              <strong className="ms-2"></strong> {formattedDate}
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          Paste not found!
        </div>
      )}
    </div>
  );
}

export default ViewPaste;
