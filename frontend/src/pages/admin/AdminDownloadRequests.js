import React, { useEffect, useState } from "react";
import { fetchDownloadRequests, approveDownloadRequest } from "../../services/api";
import { toast } from "react-toastify";

const AdminDownloadRequests = () => {
  const [requests, setRequests] = useState([]);
  const load = () => fetchDownloadRequests().then(setRequests);
  useEffect(() => { load(); }, []);
  const handle = (id, status) => {
    approveDownloadRequest(id, status)
      .then(() => { toast.success(`Request ${status}`); load(); })
      .catch(() => toast.error("Action failed."));
  };
  return (
    <div>
      <h2>Download Requests</h2>
      {requests.length===0? <p>No pending.</p> : (
        <table>
          <thead><tr><th>User</th><th>Project</th><th>Reason</th><th>Action</th></tr></thead>
          <tbody>
            {requests.map(r=> (
              <tr key={r.id}>
                <td>{r.user}</td>
                <td>{r.project_title}</td>
                <td>{r.description}</td>
                <td>
                  <button onClick={()=>handle(r.id,'approved')}>Approve</button>
                  <button onClick={()=>handle(r.id,'rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default AdminDownloadRequests;