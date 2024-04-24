import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import CodeCard from './CodeCard';
import Navbar from './Navbar';
import futuristicBackground from '../assets/svgbg.svg';
import { Skeleton } from '@mui/material';

const Home = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const codesSnapshot = await getDocs(collection(db, "codes"));
        const codesData = codesSnapshot.docs.map(doc => doc.data());
        setCodes(codesData);
      } catch (error) {
        console.error("Error fetching codes:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchCodes();
  }, []);

  return (
    <div className='h-screen overflow-scroll overflow-x-hidden p-2' style={{ backgroundImage: `url(${futuristicBackground})` }}>
      <Navbar />
      <div className="container  mx-auto py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Component Showcase</h1>
        {/* Conditional rendering of skeleton loading or code cards */}
        {loading || codes.length === 0 ? ( // Render skeleton loading if still loading or no codes available
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Render Skeleton components based on the number of cards you want to show */}
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" width={300} height={200} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Render code cards once data is loaded */}
            {codes.map((code, index) => (
              <div key={index}>
                <CodeCard code={code} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
