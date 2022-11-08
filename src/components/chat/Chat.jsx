import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import './Chat.css';
import { io } from 'socket.io-client';

// ==================== Matrerial UI ==================== //
import { Box, Stack, styled, Paper, Button } from '@mui/material';

const socket = io(`${import.meta.env.VITE_API_BASE_URL}`);

export const Chat = () => {

    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { user } = useContext(UserContext);


    useEffect(() => {
        socket.on('messages', messages => setMessages(messages) )

        return () => {
            socket.off('messages', messages => setMessages(messages))
        }
    }, [messages])



    const handleSendMessage = () => {
        const msg = {
            user: user.id,
            text: newMessage
        }
        if(!msg.text) return false;
        socket.emit('newMessage', msg)
        setNewMessage('')
        document.getElementById('msg-input').value = '';
    }

    return (
        <div className='chat-main-container'>
            <div className="chat-child-container">
                <div className="msg-container">
                    {messages.map(msg => {
                        return (
                            <div className='msg-item-container' key={msg._id}>
                                <div className="img-user-text">
                                    <div className="msg-img-cont">
                                        <img src={msg.user.image ? msg.user.image : 'https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666576906/default-avatar_k1zdop.png'} alt="img" />
                                    </div>
                                    <div className="msg-name-cont">
                                        <b>{msg.user.firstName} {msg.user.lastName}:</b>
                                    </div>
                                    <div className="msg-text-cont">
                                        {' ' + msg.text}
                                    </div>
                                </div>
                                <div className="date-msg-cont">
                                    {msg.date}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="form-container">
                    <input type="text" onChange={e => setNewMessage(e.target.value)} id='msg-input' />
                    <Button
                        variant="contained"
                        sx={{ bgcolor: '#05d305' }}
                        onClick={handleSendMessage}
                    >Enviar</Button>
                </div>
            </div>
        </div>
    )
}
