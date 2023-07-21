import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Products', 'Pricing', 'Blog'];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar({ title, user, setUser }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [modalLogin, setModalLogin] = useState(false);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [username, setUsername] = useState(null);

  
  const handleLoginSubmit = () => {
    console.log(username);
    setModalLogin(false);
    setUser(username);
  };
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const selectSetting = (title) => {
    if (title === 'Logout') {
      setUser(false);
    }
  };

  useEffect(() => { 

  },[]);

  return (
    <AppBar position="static" sx={{ backgroundColor: `rgb(252 165 165)` }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography
              variant="h6"
              // noWrap
              // component="a"
              // href="/"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
              onClick={() => {
                console.log(username)
              }}
            >
              {title}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              {username ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {username}
                  </IconButton>
                </Tooltip>
              ) : (
                <h1 className='font-bold' onClick={() => setModalLogin(true)}>Login</h1>
              )}
              {/* <h1 className='font-bold' onClick={() => setModalLogin(true)}>Login</h1> */}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={() => selectSetting(setting)}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {modalLogin && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-75 fixed inset-0" onClick={()=>setModalLogin(false)}></div>
          <div className="bg-white z-20 rounded-lg shadow-xl p-4">
            <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
            <div className='border-2 border-black rounded-lg pl-2'>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='text-black'
              />
              <button className='bg-black p-2 rounded-l-lg' onClick={handleLoginSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </AppBar>
  );
}

export default Navbar;
