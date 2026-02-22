import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Table from './components/Table';
import './App.css';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/profiles');
      setProfiles(res.data);
    } catch (error) {
      toast.error("Failed to fetch profiles",error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

return (
  <div className="container py-5">
    <Toaster position="top-right" />

    <div className="text-center mb-5">
      <h1 className="fw-bold text-green">GitHub Profile Scraper</h1>
      <p className="text-muted">
        Scrape & Store GitHub Profiles using MERN Stack
      </p>
    </div>

    <div className="custom-card p-4 mb-4">
      <Form fetchProfiles={fetchProfiles} />
    </div>

    <div className="custom-card p-4">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-green" role="status" />
          <p className="mt-3 text-green">Fetching profiles...</p>
        </div>
      ) : (
        <Table profiles={profiles} />
      )}
    </div>
  </div>
);
}

export default App;