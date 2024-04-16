import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AddUserformDialog from './ADDUser/AddUserformDialog';
// import AddUserDialog from './ADDUser/Attachedfile'; 
// import DocumentUser from './Document/DocumentUser';
import IconButton from '@mui/material/IconButton';
import TablePagination from '@mui/material/TablePagination';
import json from './MOCK_DATA (3).json';




// function createData(sno, usename, firstname, lastname, create) {
//   return { sno, usename, firstname, lastname, create };
// }

// const rows = [
//   createData(1, 'Shivani', 'Shivani', 'Chourasia', '26 Aug 2022'),
//   createData(2, 'Manu', 'Shivani', 'Chourasia', '26 Aug 2022'),
//   createData(3, 'Shivani', 'Shivani', 'Chourasia', '26 Aug 2022'),
//   createData(4, 'Shivani', 'Shivani', 'Chourasia', '26 Aug 2022'),
//   createData(5, 'Shivani', 'Shivani', 'Chourasia', '26 Aug 2022'),
//   createData(6, 'Shivani', 'Shivani', 'Chourasia', '26 Aug 2022'),
//   createData(7, 'Shivani', 'Shivani', 'Chourasia', '26 Aug 2022'),
//   createData(8, 'Shivani', 'Shivani', 'Chourasia', '26 Aug 2022'),
// ];

export default function User() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState(json);
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate();
  
  // const [user, setUser] = useState(null);
  
  // useEffect(() => {
  //   // Fetch data from API
  //   fetch('API_ENDPOINT_URL')
  //     .then(response => response.json())
  //     .then(data => setUsers(data))
  //     .catch(error => console.error('Error fetching users:', error));
  // }, []);
  // useEffect(() => {
  //   setUsers(json);
  // }, []);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const idToken = localStorage.getItem('idToken'); 
        const response = await fetch('http://192.168.1.20:3400/api/users', {
          headers: {
            'Authorization': idToken
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (newUser, idToken) => {
    try {
      const response = await fetch('http://192.168.1.20:3400/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken,
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      const responseData = await response.json();
      setUsers(prevUsers => [...prevUsers, responseData]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  

  
  // useEffect(() => {
  //   console.log('Current location:', location.pathname);
  // }, [location]);

  // useEffect(() => {
  //   setTimeout(() => navigate(props.nextPage), 3000);
  // }, []);

// Open DocumentUser component when table cell is clicked
  // const handleDocumentUserClick = () => {
  //   setShowDocumentUser(true); 
  // };
  // Close DocumentUser component

  
  
  const handleDocumentUserClick = (id) => {
    // Redirect to DocumentUser component
    navigate(`/sidenav/documentuser/${id}`);
  };
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  //   const handleDocumentUserClick = () => {
    //   setShowDocumentUser(true); // DocumentUser component ko show karein
// };
  
  // const handleCloseDocumentUser = () => {
  //   setShowDocumentUser(false); // Close DocumentUser dialog
  // };
  
  const handleSearchChange = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  // const filteredRows = rows.filter((row) =>
  //   row.usename.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredRows = users.filter((user) => {
    const username = user && user.username ? user.username.toLowerCase() : '';
    const firstname = user && user.firstname ? user.firstname.toLowerCase() : '';
    const lastname = user && user.lastname ? user.lastname.toLowerCase() : '';
    const createdAt= user && user.createAt ? user.createdAt.toLowerCase() : '';
  
    return (
      username.includes(searchTerm.toLowerCase()) ||
      firstname.includes(searchTerm.toLowerCase()) ||
      lastname.includes(searchTerm.toLowerCase()) ||
      createdAt.includes(searchTerm.toLowerCase())
    );
  });

  const handleAddCircleClick = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));//value ke bas,10 laga sakte h
    setPage(0);
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={5} marginTop={5}>
        <div>
          <h2 className="text-2xl font-semibold tracking-wide...">Users</h2>
        </div>
        <Input
        
          type="text"
          placeholder="Search..."
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
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 100, align: 'right' }} aria-label="simple table">
            <TableHead className='bg-stone-100 '>
              <TableRow>
                <TableCell className="!text-gray-400 !text-xl !tracking-wide... !text-center">S.no</TableCell>
                <TableCell className="!text-gray-400 !text-xl !tracking-wide... !text-center">User&nbsp;Name</TableCell>
                <TableCell className="!text-gray-400 !text-xl !tracking-wide... !text-center">First&nbsp;Name</TableCell>
                <TableCell className="!text-gray-400 !text-xl !tracking-wide... !text-center">Last&nbsp;Name</TableCell>
                <TableCell className="!text-gray-400 !text-xl !tracking-wide... !text-center">Create&nbsp;At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ textAlign: 'center' }}>
            {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index) => (
                  <TableRow  hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer' }} key={index} onClick={()=>handleDocumentUserClick(row.sno)}> 
                  <TableCell className="text-slate-900 !text-lg font-semibold  !text-center !tracking-wide..." component="th" scope="row">
                    {index + 1 + "."}
                  </TableCell>
                  <TableCell className="text-slate-900 !text-lg font-semibold !tracking-normal !text-center">{row.username}</TableCell>
                  <TableCell className="text-slate-900 !text-lg font-semibold !tracking-normal !text-center">{row.firstname}</TableCell>
                  <TableCell className="text-slate-900 !text-lg font-semibold !tracking-normal !text-center">{row.lastname}</TableCell>
                  <TableCell className="text-slate-900 !text-lg font-semibold !tracking-normal !text-center">{row.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        <TablePagination
          rowsPerPageOptions={[10,25, 100]}
          component="div"
          count={filteredRows.length} // Use filteredRows length for count
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableContainer>
        <AddUserformDialog open={isAddDialogOpen} onClose={handleCloseAddDialog} onAddUser={handleAddUser} />
        {/* <AddUserDialog open={isAddDialogOpen} onClose={handleCloseAddDialog} /> */}
        {/* <DocumentUser open={showDocumentUser} onClose={handleCloseDocumentUser} /> */}
        <IconButton
          onClick={handleAddCircleClick}
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <AddCircleOutlinedIcon sx={{ fontSize: 60 }}  color="primary" />
        </IconButton>
      </Box>
    </>
  );
}