import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/UserContext';
import './Profile.css'

// ======================= Material UI ======================= //
import TabPanel from './TabPanel';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ======================= Services ======================= //
import toCamelCase from '../../services/others/toCamelCase';

// ======================= Components ======================= //
import { ChangeImageDialog } from './ChangeImageDialog';


export const Profile = () => {

    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false)

    const handleActualizar = () => {
        setLoading(true)
        setInterval(() => {
            setLoading(false)
        }, 1000 )
    }

    return (
        <div className="profile-main-container">
            {
                (!loading)
                    ? <div className="profile-child-container">
                        <div className="profile-left-container">
                            <div className="profile-img-container">
                                <div className="profile-img-cover">
                                    <ChangeImageDialog />
                                </div>
                                <img src={user.image} alt="img" />
                            </div>
                            <div className="profile-name-container">
                                <div className="firstName-container">
                                    <h1>{toCamelCase(user.firstName)}</h1>
                                </div>
                                <div className="lastName-container">
                                    <h1>{toCamelCase(user.lastName)}</h1>
                                </div>
                            </div>
                            {
									(user.role === 'ADMIN_ROLE')
									?
									<Button
										variant='outlined'
										color="secondary"
										sx={{padding: 1, mt: 1}}
									>
										ADMIN SESSION
									</Button>
									:
									false
								}
                            <div className="actualizardatos">
                                <Button
                                    sx={{ fontSize: '.8em', mt: '10px' }}
                                    variant="contained"
                                    color="success"
                                    onClick={handleActualizar}
                                >
                                    Actualizar
                                </Button>
                            </div>
                        </div>
                        <div className="profile-right-container">
                            <div className="profile-right-child-container">
                                <TabPanel />
                            </div>
                        </div>
                    </div>
                    : <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
            }

        </div>
    )
}
