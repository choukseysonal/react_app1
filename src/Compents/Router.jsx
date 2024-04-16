import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Loginpage from './LOGINPAGE/Loginpage';
import Sidenav from './Dashboard/Sidenav';
import Document from './Document';
import User from './User';
import ShareIcon from './AddSerach/ShareIcon';
import ShareDialog from './AddSerach/ShareDialog';
import AddUserformDialog from './ADDUser/AddUserformDialog';
import DocumentUser from './Document/DocumentUser';
// import AddUserDialog from './ADDUser/Attachedfile';
import AddUsers from './AddSerach/Addusers';
import AddDocument from './AddDocument';

function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleUserClick = () => {
    // Logic to handle user click and navigate to the user page
  };

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/loginpage" element={<Loginpage />} />
      <Route path="/login" element={<Loginpage />} />

        {/* <Route path="/" element={<Loginpage onLogin={handleLogin} />} /> */}
        {/* <Route path="/loginpage" element={<Loginpage onLogin={handleLogin} />} /> */}
        <Route path="/sidenav" element={<Sidenav/>}>
          <Route index element={<Document/>}/>
          <Route path="document" element ={<Document/>}/>
          <Route path="user" element ={<User/>}/>
        <Route path="documentuser/:userId" element={<DocumentUser/>} />

        </Route>
        {/* <Route
          path="/sidenav"
          element={
            isLoggedIn ? (
              <Sidenav>
                <Routes>
                  <Route path="document" element={<Document />} />
                  <Route path="/" element={<User />} />
                </Routes>
              </Sidenav>
            ) : (
              <Navigate to="/user" />
            )
          }
        /> */}
        <Route path="/shareIcon" element={<ShareIcon />} />
        <Route
          path="/sharedialog"
          element={<ShareDialog open={true} onClose={() => {}} onShareClick={() => {}} />}
        />

        <Route path="/adddocument" element={<AddDocument />} />
        <Route path="/addusers" element={<AddUsers />} />
        {/* <Route path="/addUserdialog" element={<AddUserDialog />} /> */}
        <Route path="/addUserformDialog" element={<AddUserformDialog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
