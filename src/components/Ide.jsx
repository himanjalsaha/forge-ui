import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';
import AceEditor from 'react-ace';
import { Resizable } from 're-resizable';
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { db } from '../../firebase';
import { Share } from '@mui/icons-material';
import 'ace-builds/src-noconflict/mode-html';
import '@twind/intellisense';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-dracula';
import { UserAuth } from '../context/UserAuth';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your HTML Document</title>

  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<!-- write your code here -->
</body>
</html>
`;

const Ide = () => {
  const notify = () => toast.success("code shared successfully");
  const notifyerror = () => toast.error("something went wrong");


  const { currentuser } = UserAuth();

  const [fontSize, setFontSize] = useState(20);
  const [theme, setTheme] = useState('solarized_dark');
  const [htmlContent, setHtmlContent] = useState(defaultHtmlContent);
  const [likes, setLikes] = useState(0);
  const [type, setType] = useState("html");
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleChange = (newValue) => {
    setHtmlContent(newValue);
    Prism.highlightAll();
  };

  const increaseFontSize = () => {
    setFontSize(fontSize + 0.5);
  };

  const reduceFontSize = () => {
    setFontSize(fontSize - 1);
  };

  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const openShareModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const shareCode = async () => {

    try {
      const docRef = await addDoc(collection(db, "codes"), {
        htmlContent,
        currentUser: currentuser.displayName,
        createdAt: serverTimestamp(),
        likes,
        type,
        name,
        description,
      });
      console.log("Document written with ID: ", docRef.id);
 
      closeModal(); 
     // Close modal after sharing code
     notify() // Show success toast after sharing code
    } catch (e) {
      console.error("Error adding document: ", e);
      notifyerror()
    }
  };

  return (
    <div className='flex flex-row h-screen'>

      <Resizable
        defaultSize={{ width: '50%' }}
        minWidth={200}
        maxWidth='90%'
        style={{ flex: '0.5' }}
      >
        <div className='bg-black text-white flex items-center p-1 space-x-2'>
          <button onClick={increaseFontSize}><CiCirclePlus className='w-8 h-8' /></button>

        <ToastContainer />
          <button onClick={reduceFontSize}><CiCircleMinus className='w-8 h-8' /></button>
          <select
            className="bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-blue-400"
            onChange={(e) => changeTheme(e.target.value)}
            value={theme}
          >
            <option value="solarized_dark">Solarized Dark</option>
            <option value="monokai">Monokai</option>
            <option value="github">GitHub</option>
            <option value="xcode">Xcode</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="dracula">Dracula</option>
          </select>
        </div>
        <AceEditor
          mode="html"
          theme={theme}
          onChange={handleChange}
          value={htmlContent}
          style={{ width: '100%', height: '100%', fontSize: `${fontSize}px` }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true
          }}
        />
      </Resizable>
      <div className='flex-1'>
        <div className='flex justify-between bg-black text-white p-2 text-lg'>
          <text className='bg-neutral-700 p-1 rounded-xl'>preview</text>
          <button className='rounded-full hover:bg-slate-500 w-8 h-8  flex items-center' onClick={openShareModal}><Share /></button>
        </div>
        <iframe
          title="HTML Preview"
          srcDoc={htmlContent}
          style={{ width: '100%', height: '100%', border: 'none' }}
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
        {/* Share Modal */}
        {modalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-xl font-semibold mb-4">Share Code</h2>
              <input
                type="text"
                placeholder="Name"
                className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={shareCode}>Share</button>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ide;
