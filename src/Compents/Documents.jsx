// import React, { useState } from "react";
// import Table from '@mui/material/Table';

// function Documents(){
//     const [tabledata, setTabeldata] = useState([
//         {sno:1, title:'Documnet Title-1', owner:'Owner-A', create:'26 Aug 2022', action:''},
//         {sno:2, title:'Documnet Title-2', owner:'Owner-A', create:'26 Aug 2022', action:''},
//         {sno:3, title:'Documnet Title-3', owner:'Owner-B', create:'26 Aug 2022', action:''},
//         {sno:4, title:'Documnet Title-4', owner:'Owner-C', create:'26 Aug 2022', action:''},
//         {sno:5, title:'Documnet Title-5', owner:'Owner-D', create:'26 Aug 2022', action:''},
//         {sno:6, title:'Documnet Title-6', owner:'Owner-E', create:'26 Aug 2022', action:''},
//         {sno:1, title:'Documnet Title-7', owner:'Owner-F', create:'26 Aug 2022', action:''},
        
//     ]);
//     const columns=[
//         {title:'Sno',field:'sno'},
//         {title:'Title',field:'itle'},
//         {title:'Owner',field:'owner'},
//         {title:'Create&nbsp;At',field:'create:'},
//         {title:'Action',field:'action'},
       
//     ]
//     return(

//         <div>
//             <h1 align='center'>React-App</h1>
//             <h1 align='center'>Crash course on m</h1>
//             <Table columns ={columns} data={tabledata} options={{sorting:true,search:true,searchText:"sno"}} title="Document"/>
//         </div>
//     )
// }
// actions={[
//     {
//       icon: 'edite',
//       tooltip: 'edite User',
//       onClick: (event, rowData) => 
//         ("You edite " + rowData.sno)
//         // Do save operation
//       },
  
//     {
//       icon: 'share',
//       tooltip: 'share User',
//       onClick: (event, rowData) => 
//         ("You share" + rowData.sno)
//         // Do save operation
//       },
//     {
//       icon: 'Cancel',
//       tooltip: 'Cancel User',
//       onClick: (event, rowData) => 
//         ("You Cancel" + rowData.sno)
//         // Do save operation
//       },
//       options={{
//         actionsColumnIndex: -1
//       }},
//     ]};
// impot
{/* <IconButton onClick={handleAddDocumentClick}>
<AddIcon />
</IconButton> */}
// endAdornment={
//     <InputAdornment position="end">
//       <IconButton onClick={handleAddDocumentClick}>
//         <AddIcon />
//       </IconButton>
//     </InputAdornment>
//   }

// import { useState } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
// import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
// import Document from '../Document';
// import User from '../User';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

// export default function Sidenav() {
//   const theme = useTheme();
//   const [open, setOpen] = useState(true);
//   const [selectedMenu, setSelectedMenu] = useState('Documents');

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//     <Box className="flex">
//       <CssBaseline />
//       <AppBar position="fixed" elevation={4} sx={{backgroundColor:'white', color:'white'}}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={()=>{setOpen(!open)}}
//             edge="start"
            
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
           
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
       
//         <ListItem className="min-h-20 flex justify-center sm:justify-start px-14 font-bold text-3xl">
//             DMS.
//           </ListItem>
//           <ListItem className="text-lg block" disablePadding onClick={() => setSelectedMenu('Documents')}>
//             <ListItemButton className="min-h-20 flex justify-center sm:justify-start px-14 font-bold text-3xl"> 
//               <ListItemIcon 
//               // className={`min-w-0 ${open ? 'mr-3' : 'mr-auto'} justify-center ${selectedMenu === 'Documents' ? 'text-primary' : 'text-inherit'} text-lg`}
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : 'auto',
//                   justifyContent: 'center',
//                   color: selectedMenu === 'Documents' ? theme.palette.primary.main : 'inherit',
//                   fontSize: '12rem'
//                 }}
//               >
//                 <FileOpenOutlinedIcon/>
//               </ListItemIcon>
//               <ListItemText primary='Documents' sx={{fontSize: '20rem', color: selectedMenu === 'Documents' ? theme.palette.primary.main : 'inherit' }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setSelectedMenu('Users')}>
//             <ListItemButton
//               sx={{
//                 minHeight: 80,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : 'auto',
//                   justifyContent: 'center',

//                   color: selectedMenu === 'Users' ? theme.palette.primary.main : 'inherit',
//                 }}
//               >
//                 <GroupOutlinedIcon />
//               </ListItemIcon>
//               <ListItemText primary='Users' sx={{ color: selectedMenu === 'Users' ? theme.palette.primary.main : 'inherit' }} />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Drawer>
//       <Box className='bg-stone-100'component="main" sx={{ flexGrow: 1, p: 1}}>
//         <DrawerHeader />
//         {selectedMenu === "Documents" && <Document/>}
//         {selectedMenu === "Users" && <User/>}
//       </Box>
//     </Box>
//     </>
//   );
// }

// }
// }
// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
// import AttachFileIcon from '@mui/icons-material/AttachFile'; 
// import Divider from '@mui/material/Divider';



