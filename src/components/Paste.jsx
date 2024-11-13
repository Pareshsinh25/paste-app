import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(pasteId) {
    const shareableLink = `${window.location.origin}/pastes/${pasteId}`; // Generate the link
    navigator.clipboard.writeText(shareableLink); // Copy the link to the clipboard
    toast.success("Shareable link copied to clipboard!"); // Show success message
  }

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <input
          className="form-control"
          type="search"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              className="col-md-6 col-lg-4 mb-4"
              key={paste._id}
            >
              <div
                className="card shadow-sm border-light"
                style={{ height: "100%" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{paste.title}</h5>
                  <p className="card-text" style={{ height: "60px", overflow: "hidden" }}>
                    {paste.content}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link to={`/?pasteId=${paste._id}`}>
                      <button className="btn btn-primary btn-sm">Edit</button>
                    </Link>
                    <Link to={`/pastes/${paste._id}`}>
                      <button className="btn btn-info btn-sm">View</button>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(paste._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        navigator.clipboard.writeText(paste.content);
                        toast.success("Copied to clipboard");
                      }}
                    >
                      Copy
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleShare(paste._id)} // Add share functionality
                    >
                      Share
                    </button>
                  </div>
                  <div className="mt-2 text-muted">{new Date(paste.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-warning" role="alert">
            No pastes found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Paste;
