import { useState , useEffect} from 'react';
import { Outlet, useLocation , useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Document from '../Document';
import User from '../User';
import { CenterFocusStrong } from '@mui/icons-material';

const drawerWidth = 240;

function Sidenav(props) {
  const location = useLocation();
 
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [open, setOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('Documents');
  const navigate = useNavigate();

  // useEffect(() => {
  //   const path = location.pathname;
  //   if (path.includes('user')) {
  //     setCurrentPage('Users');
  //   } else if (path.includes('document')) {
  //     setCurrentPage('Documents');
  //   }
  // }, [location]);




  
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  
  // const handleMenuItemClick = (menuName) => {
    //   setSelectedMenu(menuName);
    // };
    // const getPageName = (pathname) => {
      //   // Split the pathname by "/" and get the last part
      //   const parts = pathname.split('/');
      //   return parts[parts.length - 1];
      // };
      
      const handleLogout = () => {
        // Implement your logout logic here
        console.log('Logged out');
        localStorage.removeItem('authToken');
        // For example, you can navigate to the login page
        navigate('/login');
      };
  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ ml: 2, mt: 3 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight:'bold' }}>
          DMS.
        </Typography>
      </Box>
      
      <Box sx={{ flexGrow: 1 , mt: 3}}>
        <List>
          <ListItem disablePadding onClick={() => {
            setCurrentPage('Documents'); 
            navigate('/sidenav/document')
            }}>
            <ListItemButton
              sx={{
            
                justifyContent: 'center',
              
                color: currentPage === 'Documents' ? 'primary.main' : 'inherit',
              }}>
              <ListItemIcon className='text-gray-400' sx={{ color: currentPage === 'Documents' ? 'primary.main' : 'gray'}}>
                <FileOpenOutlinedIcon /> 
              </ListItemIcon>
              <ListItemText className='text-gray-400' primary='Documents' sx={{color: currentPage === 'Documents' ? 'primary.main' : 'gray',fontSize: '50px',}} />
            </ListItemButton>
          </ListItem>
     
          <ListItem disablePadding sx={{ mt: 3}} onClick={() =>{
            setCurrentPage('Users'); 
            navigate('/sidenav/user')
            }}>
            <ListItemButton
              sx={{
                justifyContent: 'center',
                color: currentPage === 'Users' ? 'primary.main' : 'inherit',
              }}
            >
              <ListItemIcon sx={{ color: currentPage === 'Users' ? 'primary.main' : 'gray'}}>
                <GroupOutlinedIcon />
              </ListItemIcon>
              <ListItemText className='text-gray-400' primary='Users'  sx={{color: currentPage === 'Users' ? 'primary.main' : 'gray'}} />
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
          <ListItem disablePadding onClick={() => handleLogout()}>
        <ListItemButton
          sx={{
            justifyContent: 'center',
            color: 'inherit',
          }}
        >
          <ListItemText  primary='Logout'  sx={{ color: 'gray' ,  fontSize:  '1.5rem' }} className='text-gray-400 text-3xl mt-10' /> 
        </ListItemButton>
      </ListItem>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderBottom: '1px solid #ddd',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            {currentPage}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box className='bg-stone-100'
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
          <Outlet/>

        <Toolbar />
      </Box>
    </Box>
  );
}

Sidenav.propTypes = {
  window: PropTypes.func,
};

export default Sidenav;
