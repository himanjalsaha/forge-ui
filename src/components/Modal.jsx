import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AceEditor from 'react-ace';
import { FiCopy } from 'react-icons/fi'; // Import FiCopy icon from react-icons/fi
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-solarized_dark'; // Choose your preferred theme
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';
import { toast } from 'react-hot-toast'; // Import toast from react-hot-toast

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const editorStyle = {
  width: '100%',
  height: 'calc(100% - 20px)', // Adjust height to accommodate the header
};

const Modalsimple = ({ code }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false); // State to track whether the code has been copied

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  // Function to copy code content to clipboard
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code.htmlContent);
    setCopied(true); // Set copied to true after successfully copying the code
  };

  return (
    <div>
      <Button onClick={handleOpen}>View code</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className={`flex ${window.innerWidth < 768 ? 'flex-col' : 'flex-row'} w-full h-full`}>
            <Box className='flex-1 flex flex-col border-r pr-4'>
              <Box className="flex items-center">
                <Typography variant="h4" color="primary" className="mb-4">{code.name}</Typography>
                {/* Button to copy code content */}
                <Button variant="outlined" onClick={copyCodeToClipboard} startIcon={<FiCopy />}>
                  {copied ? 'Copied' : 'Copy Code'} {/* Show 'Copied' if code has been copied */}
                </Button>
              </Box>
              {/* Use AceEditor for syntax highlighting */}
              <AceEditor
                mode="html"
                theme="solarized_dark" // Choose your preferred theme
                readOnly={true}
                value={code.htmlContent}
                style={editorStyle}
              />
            </Box>
            <Box className='flex-1 pl-4'>
              <Typography variant="h4" color="primary" className="mb-4">Preview</Typography>
              <iframe title="HTML Preview" srcDoc={code.htmlContent} style={editorStyle} />
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Modalsimple;
