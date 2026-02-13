import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPaperPlane, FaUserMd, FaCircle } from 'react-icons/fa';
import DoctorLayout from '../../components/Doctor/DoctorLayout';
import './DoctorPages.css';

const DoctorMessages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'John Smith',
      type: 'patient',
      lastMessage: 'Thank you for the advice!',
      time: '10:30 AM',
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: 'Dr. Emily Brown',
      type: 'doctor',
      lastMessage: 'Can we discuss the patient case?',
      time: 'Yesterday',
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      type: 'patient',
      lastMessage: 'When should I take the medication?',
      time: 'Yesterday',
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      type: 'doctor',
      lastMessage: 'Thanks for the consultation notes',
      time: '2 days ago',
      unread: 0,
      online: true,
    },
  ];

  const messages = {
    1: [
      { id: 1, sender: 'other', text: 'Hello Doctor, I have a question about my medication', time: '10:00 AM' },
      { id: 2, sender: 'me', text: 'Hi John, of course! How can I help you?', time: '10:05 AM' },
      { id: 3, sender: 'other', text: 'Should I take it before or after meals?', time: '10:10 AM' },
      { id: 4, sender: 'me', text: 'Take it after meals to avoid stomach upset. Also, make sure to drink plenty of water.', time: '10:15 AM' },
      { id: 5, sender: 'other', text: 'Thank you for the advice!', time: '10:30 AM' },
    ],
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Simulate sending message
      setMessageText('');
    }
  };

  return (
    <DoctorLayout>
      <div className="page-container messages-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Messages</h1>
            <p className="page-subtitle">Communicate with patients and colleagues</p>
          </div>
        </div>

        <div className="messages-layout">
          <div className="conversations-list">
            <div className="conversations-header">
              <h3>Conversations</h3>
            </div>
            {conversations.map((conv, index) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`conversation-item ${selectedChat?.id === conv.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(conv)}
              >
                <div className="conversation-avatar">
                  {conv.type === 'patient' ? <FaUser /> : <FaUserMd />}
                  {conv.online && <FaCircle className="online-indicator" />}
                </div>
                <div className="conversation-info">
                  <div className="conversation-header-row">
                    <h4>{conv.name}</h4>
                    <span className="conversation-time">{conv.time}</span>
                  </div>
                  <div className="conversation-preview-row">
                    <p className="conversation-preview">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="unread-badge">{conv.unread}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="messages-content">
            {selectedChat ? (
              <>
                <div className="messages-header">
                  <div className="chat-user-info">
                    <div className="chat-avatar">
                      {selectedChat.type === 'patient' ? <FaUser /> : <FaUserMd />}
                      {selectedChat.online && <FaCircle className="online-indicator" />}
                    </div>
                    <div>
                      <h3>{selectedChat.name}</h3>
                      <p className="user-status">
                        {selectedChat.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="messages-body">
                  {messages[selectedChat.id]?.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                      <div className="message-bubble">
                        <p>{msg.text}</p>
                        <span className="message-time">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="messages-input-container">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="message-input"
                  />
                  <button onClick={handleSendMessage} className="send-btn">
                    <FaPaperPlane />
                  </button>
                </div>
              </>
            ) : (
              <div className="no-chat-selected">
                <FaUserMd className="no-chat-icon" />
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorMessages;
