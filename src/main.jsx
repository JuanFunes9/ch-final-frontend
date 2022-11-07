import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {UserProvider} from './context/UserProvider';
// ================ Components ================ //
import App from './components/App/App'

// ================ Setting Dark Mode ================ //
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={darkTheme}>
				<UserProvider>
					<App />
				</UserProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
)
