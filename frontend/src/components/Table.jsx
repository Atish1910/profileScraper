export default function Table({ profiles }) {
  if (profiles.length === 0) {
    return (
      <div className="text-center py-5">
        <h5 className="text-muted">No Profiles Found</h5>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Followers</th>
            <th>Repos</th>
            <th>Bio</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {profiles.map((p) => (
            <tr key={p._id}>
              <td className="fw-semibold text-green">
                {p.username}
              </td>

              <td>{p.name || "N/A"}</td>

              <td>
                <span className="badge badge-followers px-3 py-2">
                  {p.followers}
                </span>
              </td>

              <td>
                <span className="badge badge-repos px-3 py-2">
                  {p.repos}
                </span>
              </td>

              <td className="text-muted" style={{ maxWidth: "250px" }}>
                {p.bio || "No bio"}
              </td>

              <td>
                <span className="badge time-badge px-3 py-2">
                  {new Date(p.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 