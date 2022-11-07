import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/UserContext';
import PropTypes from 'prop-types';


// ================================ Material UI ================================ //
import EditIcon from '@mui/icons-material/Edit';
import { Tabs, Tab, Box, Stack, styled, Paper } from '@mui/material';

// ==================== Components ==================== //
import Orders from './Orders';
import ChangeInfo from './ChangeInfo';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    fontSize: 20,
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicTabs() {
    const [value, setValue] = useState(0);
    const { user, token, setUser } = useContext(UserContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const info = [{
        key: user.firstName,
        propName: 'firstName',
        name: 'Nombre: '
    }, {
        key: user.lastName,
        propName: 'lastName',
        name: 'Apellido: '
    }, {
        key: user.email,
        propName: 'email',
        name: 'Email: '
    }, {
        key: user.address,
        propName: 'address',
        name: 'Dirección:  '
    }, {
        key: user.phone,
        propName: 'phone',
        name: 'Teléfono: '
    }]

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Info" {...a11yProps(0)} />
                    <Tab label="Historial" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <div className="info-container">
                    <Box sx={{ width: '100%' }}>
                        <Stack spacing={2}>
                            {
                                info.map(info => {
                                    return (
                                        <Item key={info.name}>
                                            <div className="email-cont info-item">
                                                <div className='clave'>
                                                    <span>&#10024;<b>{info.name}</b></span>
                                                    <p>{info.key}</p>
                                                </div>
                                                <ChangeInfo name={info.name} propName={info.propName}/>
                                            </div>
                                        </Item>
                                    )
                                })
                            }

                        </Stack>
                    </Box>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Orders />
            </TabPanel>
        </Box>
    );
}