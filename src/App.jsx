import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import JobCard from './components/JobCard';
import { collection, query, orderBy, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase.config";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
       
  const fetchJobs = async () => {
    try {
      const tempJobs = [];
      const jobsRef = collection(db, "jobs");
      const q = query(jobsRef, orderBy("postedOn", "desc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempJobs.push({
          ...doc.data(),
          id: doc.id,
          postedOn: doc.data().postedOn.toDate()
        });
      });

      console.log("Fetched jobs:", tempJobs);
      setJobs(tempJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };
      
  const fetchJobsCustom = async (jobCriteria) => {
    try {
      const tempJobs = [];
      const jobsRef = collection(db, "jobs");
      let q = jobsRef;

      if (jobCriteria.type) {
        q = query(q, where("type", "==", jobCriteria.type));
      }
      if (jobCriteria.title) {
        q = query(q, where("title", "==", jobCriteria.title));
      }
      if (jobCriteria.experience) {
        q = query(q, where("experience", "==", jobCriteria.experience));
      }
      if (jobCriteria.location) {
        q = query(q, where("location", "==", jobCriteria.location));
      }

      q = query(q, orderBy("postedOn", "desc"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempJobs.push({
          ...doc.data(),
          id: doc.id,
          postedOn: doc.data().postedOn.toDate()
        });
      });

      console.log("Fetched custom jobs:", tempJobs);
      setJobs(tempJobs);
    } catch (error) {
      console.error("Error fetching custom jobs:", error);
    }
  };

  const addJob = async (job) => {
    try {
      const docRef = await addDoc(collection(db, "jobs"), job);
      console.log("Document written with ID: ", docRef.id);
      fetchJobs(); // Re-fetch jobs after adding a new one
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <Searchbar fetchJobsCustom={fetchJobsCustom} />
      <button
        onClick={() =>
          addJob({
            title: "Frontend Developer",
            type: "Full Time",
            location: "Remote",
            experience: "Mid Level",
            postedOn: new Date()
          })
        }
      >
        Add Job
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} {...job} />)
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
}

export default App;
