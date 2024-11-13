import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

import "./Navbar.css";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      } else {
        console.log("Paste not found");
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div
            className="card shadow-sm border-0"
            style={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
          >
            <div
              className="card-header text-center"
              style={{
                backgroundColor: "#f0f0f0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <h5
                className="mb-0"
                style={{ fontWeight: "bold", color: "#333" }}
              >
                {pasteId ? "Update Paste" : "Create New Paste"}
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: "500" }}>
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#333",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                  placeholder="Enter title here"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: "500" }}>
                  Content
                </label>
                <textarea
                  className="form-control"
                  value={value}
                  placeholder="Enter content here"
                  onChange={(e) => setValue(e.target.value)}
                  rows={10}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#333",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    padding: "15px",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
              <button
                className="btn w-100"
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  padding: "10px",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
                onClick={createPaste}
              >
                {pasteId ? "Update Paste" : "Create Paste"}
              </button>
            </div>
            <div
              className="card-footer text-center"
              style={{
                backgroundColor: "#f0f0f0",
                borderTop: "1px solid #ddd",
                color: "#777",
              }}
            >
              {pasteId ? "Editing an existing paste." : "Creating a new paste."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
