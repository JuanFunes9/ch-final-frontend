import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ======================= CSS ======================= //
import './NavBar.css'

// ======================= Material UI ======================= //
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Button, MenuItem, Menu, Tooltip, Avatar } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// ======================= import Components/ Hooks ======================= //
import TemporaryDrawer from './ToggleMenu';
import { UserContext } from '../../context/UserContext';

// ======================= Services ======================= //



const NavBar = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const navigate = useNavigate();

	const { user, setUser, setToken } = useContext(UserContext);



	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleLogout = () => {
		setUser(null);
		setToken(null);
		window.sessionStorage.removeItem('jwt');
		window.sessionStorage.removeItem('user');
		navigate('/auth/login');
	}

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="error">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={17} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
		</Menu>
	);

	const pages = [{ name: 'Productos', key: 'products' }, { name: 'Chat', key: 'chat' }];

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<TemporaryDrawer />
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ display: { xs: 'none', sm: 'block' } }}
					>
						<img
							src='https://cdn.worldvectorlogo.com/logos/opencart.svg'
							alt='img'
							id='svg-logo'
							onClick={() => { location.href = `/products` }}
						/>
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
						{pages.map((page) => (
							<Link
								key={page.key}
								sx={{ my: 2, color: 'white', display: 'block' }}
								to={`/${page.key}`}
							>
								<Button variant="plain">{page.name}</Button>
							</Link>
						))}
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					{
						(user)
							?
							<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
								<IconButton size="large" color="inherit">
									<Link to={'/chat'}>
										<Badge badgeContent={0} color="error">
											<MailIcon />
										</Badge>
									</Link>
								</IconButton>
								<IconButton
									size="large"
									color="inherit"
								>
									<Link to={'/cart'}>
										<Badge badgeContent={0} color="error">
											<ShoppingCartIcon />
										</Badge>
									</Link>
								</IconButton>
								<Box sx={{ flexGrow: 0 }}>
									<Tooltip title="Open settings">
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar alt="Remy Sharp" src={user.image} sx={{ width: 50, height: 50, mt: 1 }} />
										</IconButton>
									</Tooltip>
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
										<MenuItem onClick={handleCloseUserMenu}>
											<Link to={`/profile`}>Perfil</Link>
										</MenuItem>
										<MenuItem onClick={handleCloseUserMenu}>
											<Button onClick={handleLogout}>Salir</Button>
										</MenuItem>
									</Menu>
								</Box>
								{
									(user.role === 'ADMIN_ROLE')
									?
									<Button
										variant='outlined'
										color="secondary"
										sx={{padding: 0, ml: 2}}
									>
										ADMIN SESSION
									</Button>
									:
									false
								}
							</Box>
							:
							<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
								<Link to={`/auth/login`}>
									<Button size="lg" variant="outlined" sx={{ ml: 1 }}>Ingresar</Button>
								</Link>
								<Link to={`/auth/register`}>
									<Button size="lg" variant="outlined" sx={{ ml: 1 }}>Registrarse</Button>
								</Link>
							</Box>
					}

					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box >
	);
}

export default NavBar