import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import GithubComponent from './components/GithubComponent';
import Table from './components/Table';
import './App.css';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

    const fetchProfiles = useCallback( async () => {
      try {
        setLoading(true);
        console.log("yes its rendering fetchProfiles");
        const res = await axios.get('http://localhost:5000/api/profiles');
        setProfiles(res.data);
      } catch (error) {
        toast.error("Failed to fetch profiles",error);
      } finally {
        setLoading(false);
      }
    } , []);

  const handleDeleteProfile = useCallback( async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/profiles/${id}`);
      setProfiles((profiles) => profiles.filter((p) => {
        return p._id !== id;
      }));

      toast.success("Profile Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error);      
    }
  }, []);

  
  const handleUpdateProfile = useCallback( async (id, updatedData) => {
    // debugger;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/profiles/${id}`,
        updatedData
      );

      setProfiles((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, ...updatedData } : p
        )
      );
      console.log("Response after update:", res.data);

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);


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
      <GithubComponent fetchProfiles={fetchProfiles} />
    </div>

    <div className="custom-card p-4">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-green" role="status" />
          <p className="mt-3 text-green">Fetching profiles...</p>
        </div>
      ) : (
        <Table handleDeleteProfile={handleDeleteProfile}  handleUpdateProfile={handleUpdateProfile} profiles={profiles} />
      )}
    </div>
  </div>
);
}

export default App;