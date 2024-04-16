import React, { useEffect, useState } from 'react';
// import { useNavigate,useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import ShareDialog from './AddSerach/ShareDialog';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddDocument from './AddDocument';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search'; 
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import TablePagination from '@mui/material/TablePagination';


// import Sidenav from './Dashboard/Sidenav';
// import json from './MOCK_DATA (4).json';


  function Document() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  // const {document} = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const idToken = localStorage.getItem('idToken');
        console.log('idToken:', idToken); // Log the idToken to the console
        const response = await fetch('http://192.168.1.20:3400/api/documents', {
          headers: {
            'Authorization': idToken           //`${idToken}`
          }
        });
        console.log('Headers:', response.headers);

        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
       
      } finally {
        setLoading(false); // Set loading state to false after fetching documents
      }
    };
    // API call to fetch documents
    fetchDocuments();
  }, []);
    // Function to add a new document
  const handleAddDocument = async (newDocument, idToken) => {
    try {
      
      const response = await fetch('http://192.168.1.20:3400/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken
        },
        body: JSON.stringify(newDocument),
      });
      if (!response.ok) {
        throw new Error('Failed to add document');
      }

      const responseData = await response.json();
    console.log('Document added successfully:', responseData);

    //  // Update the newDocument object with the response data
    //  const updatedDocument = { ...newDocument, ...responseData };//add new update
    //   // Call the provided callback function to inform the parent component about the new document
    // onAddDocument(newDocument);a
      // const data = await response.json();

      //     // Update the newDocument object with the response data
      // const updatedDocument = { ...newDocument, ...responseData };


      // Call the provided callback function to inform the parent component about the new document
      setDocuments(prevDocuments => [...prevDocuments, responseData]);
    } catch (error) {
      console.error('Error adding document:', error);
    
    }
  };
  
  // Check if loading, display loading indicator if true
  if (loading) {
    return <div>Loading...</div>;
  }

  

//   const handleAddDocument = (newDocument) => {
//     setDocuments(prevDocuments => [...prevDocuments, newDocument]); // Update documents state with new document
// };



  // Other functions and JSX code


  // const [documents, setDocuments] = useState(json);
  // useEffect(() => {
  //   setDocuments(json)
  // },[]);
// yeh agar humko mannually data show karna hai
  // const [rows, setRows] = useState([
  //   { sno: 1., title: 'Document Title-1', owner: 'Owner-A', create: '26 Aug 2022' },
  //   { sno: 2., title: 'Document Title-2', owner: 'Owner-A', create: '26 Aug 2022' },
  //   { sno: 3., title: 'Document Title-3', owner: 'Owner-B', create: '26 Aug 2022' },
  //   { sno: 4., title: 'Document Title-4', owner: 'Owner-C', create: '26 Aug 2022' },
  //   { sno: 5., title: 'Document Title-5', owner: 'Owner-D', create: '26 Aug 2022' },
  //   { sno: 6., title: 'Document Title-6', owner: 'Owner-E', create: '26 Aug 2022' },
  //   { sno: 7., title: 'Document Title-7', owner: 'Owner-F', create: '26 Aug 2022' },
  // ]);
  
 

  //  useEffect(() => {
  //   // Update URL when component mounts
  //   history.push('/document');
  // }, [history]);

  // useEffect(() => {
  //   if (Sidenav !== '/document') {
  //     navigate('/document');
  //   }
  // }, [Sidenav, navigate]);
  // // useEffect(() => {
  // //   navigate('/document');
  // // }, [navigate]);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const truncateString = (str, maxLen) => {
    if (str.length <= maxLen) return str;
    return str.substr(0, maxLen - 1) + '...';
  };

  const handleShareClick = () => {
    console.log('Share icon clicked');
    setIsShareDialogOpen(true);
  };

  const handleCloseShareDialog = () => {
    setIsShareDialogOpen(false);
  };

  const handleVisibility = (row) => {
    console.log('Visibility clicked for row:', row);
  };

  const handleCancel = async (row) => {
    try {
      const idToken = localStorage.getItem('idToken');
      const response = await fetch(`http://192.168.1.20:3400/api/documents/${row.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': idToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete document');
      }

      const updatedDocuments = documents.filter((document) => document.id !== row.id);
      setDocuments(updatedDocuments);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };
    // const updatedRows = rows.filter((r) => r !== row); // url demoFilter karke updated rows ko le liya
   // Filter karke updated rows ko le liya
   //without delete function used
  //  const updatedDocuments = documents.filter((document) => document !== row);
  //   // Updated rows ko state mein set kar diya
  //   setDocuments(updatedDocuments);
  // };

  const handleSearchChange = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  // const filteredRows = rows.filter((row) =>
  //   row.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredRows = documents.filter((document) => {
    const title = document && document.title ? document.title.toLowerCase() : '';
    const owner = document && document.owner ? document.owner.toLowerCase() : '';
    const createdAt= document && document.createdAt ? document.createdAt.toLowerCase() : '';
  
    return (
     
      title.includes(searchTerm.toLowerCase()) ||
      owner.includes(searchTerm.toLowerCase()) ||
      createdAt.includes(searchTerm.toLowerCase())
    );
  });

  const handleAddCircleClick = () => {
    setIsAddDialogOpen(true);
  };

  
  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  // const handleClose = () => {
  //   setIsAddDialogOpen(false);
  // };

  // const handleAddDocument = () => {
  // const handleAddDocument = () => {
  //   // Define the functionality of adding a document here
  // };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));//value ke bas,10 laga sakte h
    setPage(0);
  };

  return (
    <>
    

    
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={5} marginTop={5} >
        <div>
          <h2 className="text-2xl font-semibold tracking-wide...">Documents</h2>
        </div>
        
        <Input
          type="text"
          placeholder="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />

      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={5} marginTop={-4}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100} } aria-label="simple table">
          <TableHead className='bg-stone-100 '>
            <TableRow>
              <TableCell className="!text-gray-400 !text-xl !tracking-wide... !text-center">S.no</TableCell>
              <TableCell className="!text-gray-400 !text-xl !tracking-wide... !text-center">Title</TableCell>
              <TableCell className="!text-gray-400 !text-xl !tracking-wide... !text-center">Owner</TableCell>
              <TableCell className="!text-gray-400 !text-xl !tracking-wide... !text-center">Create&nbsp;At</TableCell>
              <TableCell className="!text-gray-400 !text-xl !tracking-wide... !text-center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ textAlign: 'center' }}>
  {filteredRows
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  // yeh agar hum api demo wali used kar rahe h tb .map((row) => (
    .map((row, index) => (
      
    <TableRow hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer' }} key={row.id}>
      <TableCell className="text-slate-900 !text-lg font-semibold  !text-center !tracking-wide..." component="th" scope="row">
        {/*  yeh agar hum api demo wali used kar rahe h tb {row.sno + "."} */}
        {index + 1 + "."}
      </TableCell>
      <TableCell className="text-slate-900 !text-lg font-semibold !tracking-normal !text-center">
                    {truncateString(row.title, 40)} {/* Truncate to 40 characters */}
                  </TableCell>
      {/* <TableCell className="text-slate-900 !text-lg font-semibold !tracking-normal !text-center">{row.title}</TableCell> */}
      <TableCell className="text-slate-900 !text-lg font-semibold !tracking-normal !text-center">{row.owner}</TableCell>
      <TableCell className="text-slate-900 !text-lg font-semibold !tracking-normal !text-center">{row.createdAt}</TableCell>
      <TableCell className="text-slate-900 !text-lg font-semibold !tracking-normal !text-center">
        <IconButton onClick={() => handleVisibility(row)} color="primary">
          <VisibilitySharpIcon/>
        </IconButton>
        <IconButton onClick={() => handleShareClick(row)} color="primary">
        <ShareSharpIcon />
        </IconButton>
        <IconButton onClick={() => handleCancel(row)} color="primary">
          <CancelSharpIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]} // Define available rows per page options
          component="div"
          count={filteredRows.length} // Use filteredRows.length instead of rows.length, agar 0 row table hoga toh isline ko remove kar denge
          // yeh code hai aggar humko ke pass 20 sno table hoge count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
     
      <ShareDialog open={isShareDialogOpen} onClose={handleCloseShareDialog} onShareClick={handleShareClick} />
      <AddDocument open={isAddDialogOpen} onClose={handleCloseAddDialog} onAddDocument={handleAddDocument} idToken={localStorage.getItem('idToken')} />


      {/* <AddDocument open={isAddDialogOpen} onClose={handleCloseAddDialog} onAddDocument={handleAddDocument} /> */}
      {/* <AddDocument open={isAddDialogOpen} onClose={handleCloseAddDialog} /> */}
      {/* {isAddDialogOpen && <AddDocument onClose={() => setIsAddDialogOpen(false)} />} */}
<IconButton
  onClick={handleAddCircleClick}
  sx={{ position: 'fixed', bottom: 16, right: 16 }}
>
  <AddCircleOutlinedIcon sx={{ fontSize: 45 }}  color="primary" />
</IconButton>
</Box>

  
</>
  )
};
export default Document; 