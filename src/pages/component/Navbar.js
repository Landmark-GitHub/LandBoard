import React, { useState } from 'react';
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
  const [login, setLogin] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');

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

  const handleUsernameInput = (event) => {
    setUsernameInput(event.target.value);
  };

  const handleLoginSubmit = () => {
    if (usernameInput.trim() !== '') {
      setUser(usernameInput);
      setLogin(false);
      setUsernameInput('');
    } else {
      alert('Please enter a valid username');
    }
  };

  return (
    <AppBar position="static" className='bg-red-300'>
      {/* <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              right:0
            }}
          >
            {title}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user}
                </IconButton>
              </Tooltip>
            ) : (
              <h1 className='font-bold' onClick={() => setLogin(true)}>Login</h1>
            )}
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
        </Toolbar>
      </Container> */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              {title}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {user}
                  </IconButton>
                </Tooltip>
              ) : (
                <h1 className='font-bold' onClick={() => setLogin(true)}>Login</h1>
              )}
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

      {/* Modal for Username Input */}
      {login && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-75 fixed inset-0" onClick={()=>setLogin(false)}></div>
          <div className="bg-white z-20 rounded-lg shadow-xl p-4">
            <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
            <div className='border-2 border-black rounded-lg pl-2'>
              <input
                type="text"
                placeholder="Enter your username"
                value={usernameInput}
                onChange={handleUsernameInput}
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
