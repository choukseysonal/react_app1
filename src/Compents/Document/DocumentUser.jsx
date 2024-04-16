import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'gray',
    color: 'white',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(Document) {
  return { Document };
}

const rows = [
  createData('Document Title-1'),
  createData('Document Title-2'),
  createData('Document Title-3'),
  createData('Document Title-5'),
  createData('Document Title-8'),
];

export default function DocumentUser() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // React Router's navigate function
  
  const handleDocumentUserClick = () => {
    // Redirect to DocumentUser component
    navigate("/documentuser/:userId");
  };

  const filteredRows = rows.filter((row) =>
    row.Document.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={7} marginTop={7} className='bg-stone-100'>
        <div>
          <h2 className="text-2xl font-semibold tracking-wide...">Users/</h2>
          {/* Input field for searching */}
          {/* <input 
            type="text" 
            placeholder="" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          /> */}
        </div>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={7} marginTop={-4}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100, align: 'right' }} aria-label="simple table">
          <TableHead  className='bg-stone-100 '>
            <TableRow>
            <TableCell className="!text-gray-400 !text-xl !tracking-wide... ">DOCUMENTS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ textAlign: 'center' }}>
            {filteredRows.map((row) => (
              <TableRow key={row.Document} onClick={handleDocumentUserClick}>
                <TableCell className="text-slate-900 !text-lg font-semibold !tracking-normal ">{row.Document}</TableCell>
                {/* <StyledTableCell>{row.Document}</StyledTableCell> */}
              </TableRow>
            ))}
          </TableBody >
        </Table>
      </TableContainer>
      
      </Box>
    </>
  );
}
