import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore'; // Import updateDoc from Firestore

import Modalsimple from './Modal';

const CodeCard = ({ code }) => {
  const [likes, setLikes] = useState(code.likes);

  const handleLike = async () => {
    console.log('Like button clicked'); // Check if the click event is triggered
    const newLikes = likes + 1; // Increment likes
    setLikes(newLikes); // Update local state
    try {
      // Update likes in the database
      await updateDoc(doc(db, 'codes', code.id), {
        likes: newLikes,
      });
      console.log('Likes updated in database');
    } catch (error) {
      console.error('Error updating likes in database:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{code.name}</h2>

        <iframe
          title="HTML Preview"
          srcDoc={code.htmlContent}
          className="w-full h-64"
          style={{ border: 'none' }}
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
        
      </div>
      <div className='px-6'>{code.description}</div>

      <div className="px-6 py-4 bg-neutral-100 border-t border-gray-200">
        <p className="text-sm text-gray-600">Type: {code.type}</p>
        <p className="text-sm text-gray-600 mt-2">Created by: {code.currentUser}</p>
        <div className='flex justify-between items-center'>
    
        <Modalsimple code={code}/>
        </div>
        
     
      </div>
    </div>
  );
};

export default CodeCard;
