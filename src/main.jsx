import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'

// ================ Components ================ //
import { Index } from './components/Index/Index';
import NavBar from './components/NavBar/NavBar'
import Tabs from './components/Tabs/Tabs'

// ================ Setting Dark Mode ================ //
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<ThemeProvider theme={darkTheme}>
			<NavBar />
			<Routes>
				<Route path='/' element={ <Index /> } />
				<Route path='/products' element={ <Tabs /> } />
				<Route path='/products/get-by-id/:id' element={ <Tabs /> } />
			</Routes>
		</ThemeProvider>
	</BrowserRouter>
)
