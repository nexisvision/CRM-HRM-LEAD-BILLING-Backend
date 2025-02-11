import { Server } from 'socket.io';
import User from '../models/userModel.js';

function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
            allowedHeaders: ["my-custom-header"],
        },
        allowEIO3: true, // Allow Engine.IO version 3
        transports: ['websocket', 'polling']
    });

    // Add connection error handling
    io.engine.on("connection_error", (err) => {
        console.log('Connection error:', err.req);      // the request object
        console.log('Error message:', err.code);     // the error code
        console.log('Error message:', err.message);  // the error message
        console.log('Error context:', err.context);  // some additional error context
    });

    // Move these to the outer scope so they persist across connections
    const onlineUsers = new Set();
    const userStatus = new Map();

    io.on('connection', async (socket) => {
        console.log('A user connected with ID:', socket.id);

        socket.on('user_connected', (userId) => {
            if (!userId) return;

            socket.userId = userId;
            socket.join(userId);
            onlineUsers.add(userId);

            // Update user status with active timestamp
            userStatus.set(userId, {
                isOnline: true,
                lastSeen: new Date().toISOString()
            });

            // Emit updated status to all users
            io.emit('users_status', {
                activeUsers: Array.from(onlineUsers),
                userStatus: Object.fromEntries(userStatus)
            });
        });

        socket.on('disconnect', () => {
            if (socket.userId) {
                onlineUsers.delete(socket.userId);

                // Update last seen time when user disconnects
                userStatus.set(socket.userId, {
                    isOnline: false,
                    lastSeen: new Date().toISOString()
                });

                // Emit updated status
                io.emit('users_status', {
                    activeUsers: Array.from(onlineUsers),
                    userStatus: Object.fromEntries(userStatus)
                });
            }
        });

        // Get user's conversations
        socket.on('get_conversations', async ({ userId }) => {
            try {
                const user = await User.findOne({ where: { id: userId } });
                if (user) {
                    let conversations = {};
                    try {
                        conversations = JSON.parse(user.conversations || '{}');

                        // Filter and organize conversations
                        const organizedConversations = {};

                        Object.entries(conversations).forEach(([id, conv]) => {
                            if (conv.type === 'group') {
                                // This is a group conversation
                                organizedConversations[id] = {
                                    ...conv,
                                    messages: conv.messages || []
                                };
                            } else {
                                // This is a direct message conversation
                                organizedConversations[id] = conv;
                            }
                        });

                        socket.emit('conversations_received', organizedConversations);
                    } catch (e) {
                        console.error('Error parsing conversations:', e);
                        socket.emit('conversations_received', {});
                    }
                }
            } catch (error) {
                console.error('Error fetching conversations:', error);
                socket.emit('error', { message: 'Error fetching conversations' });
            }
        });

        // Handle sending/receiving messages
        socket.on('send_message', async (data) => {
            try {
                const { sender_id, receiver_id, message, timestamp } = data;

                if (!sender_id || !receiver_id || !message) {
                    throw new Error('Missing required fields');
                }

                const [sender, receiver] = await Promise.all([
                    User.findOne({ where: { id: sender_id } }),
                    User.findOne({ where: { id: receiver_id } })
                ]);

                if (!sender || !receiver) {
                    throw new Error('User not found');
                }

                // Create message object with initial status
                const newMessage = {
                    sender_id,
                    receiver_id,
                    message,
                    timestamp: timestamp || new Date().toISOString(),
                    status: 'sent'
                };

                try {
                    const senderConvos = JSON.parse(sender.conversations || '{}');
                    const receiverConvos = JSON.parse(receiver.conversations || '{}');

                    if (!senderConvos[receiver_id]) senderConvos[receiver_id] = [];
                    if (!receiverConvos[sender_id]) receiverConvos[sender_id] = [];

                    // Add message with correct initial status
                    senderConvos[receiver_id].push({ ...newMessage, status: 'sent' });
                    receiverConvos[sender_id].push({ ...newMessage, status: 'delivered' });

                    await Promise.all([
                        sender.update({ conversations: JSON.stringify(senderConvos) }),
                        receiver.update({ conversations: JSON.stringify(receiverConvos) })
                    ]);

                    // Emit to sender with sent status
                    io.to(sender_id).emit('receive_message', {
                        user_id: receiver_id,
                        message: { ...newMessage, status: 'sent' }
                    });

                    // Emit to receiver with delivered status
                    io.to(receiver_id).emit('receive_message', {
                        user_id: sender_id,
                        message: { ...newMessage, status: 'delivered' }
                    });

                    // Update sender about delivered status immediately
                    io.to(sender_id).emit('message_status_updated', {
                        message_timestamp: newMessage.timestamp,
                        status: 'delivered'
                    });

                } catch (updateError) {
                    console.error('Error updating conversations:', updateError);
                    throw new Error('Failed to save messages');
                }

            } catch (error) {
                console.error('Error in send_message:', error);
                socket.emit('error', {
                    message: 'Error sending message',
                    details: error.message
                });
            }
        });

        // Handle message status updates
        socket.on('update_message_status', async (data) => {
            try {
                const { user_id, other_user_id, message_timestamp, status } = data;

                // Get both users
                const [user, otherUser] = await Promise.all([
                    User.findOne({ where: { id: user_id } }),
                    User.findOne({ where: { id: other_user_id } })
                ]);

                if (user) {
                    const userConvos = user.conversations || {};
                    const messages = userConvos[other_user_id] || [];
                    const updatedMessages = messages.map(msg =>
                        msg.timestamp === message_timestamp ? { ...msg, status } : msg
                    );
                    userConvos[other_user_id] = updatedMessages;
                    await user.update({ conversations: userConvos });
                }

                if (otherUser) {
                    const otherConvos = otherUser.conversations || {};
                    const messages = otherConvos[user_id] || [];
                    const updatedMessages = messages.map(msg =>
                        msg.timestamp === message_timestamp ? { ...msg, status } : msg
                    );
                    otherConvos[user_id] = updatedMessages;
                    await otherUser.update({ conversations: otherConvos });
                }

                // Notify both users
                io.to(user_id).to(other_user_id).emit('message_status_updated', {
                    message_timestamp,
                    status
                });

            } catch (error) {
                console.error('Error updating message status:', error);
                socket.emit('error', { message: 'Error updating message status' });
            }
        });

        // Handle deleting messages
        socket.on('delete_message', async (data) => {
            try {
                const { conversation_id, message_timestamp, user_id } = data;

                const conversation = await Conversation.findByPk(conversation_id);
                if (!conversation) return;

                const updatedConversations = conversation.conversations.filter(
                    msg => msg.timestamp !== message_timestamp
                );

                await conversation.update({
                    conversations: updatedConversations,
                    updated_by: user_id
                });

                // Notify both users about the deletion
                io.to(conversation.reference_id.split('_')).emit('message_deleted', {
                    conversation_id,
                    message_timestamp
                });

            } catch (error) {
                console.error('Error deleting message:', error);
                socket.emit('error', { message: 'Error deleting message' });
            }
        });

        socket.on('mark_messages_read', async ({ sender_id, receiver_id }) => {
            try {
                const [sender, receiver] = await Promise.all([
                    User.findOne({ where: { id: sender_id } }),
                    User.findOne({ where: { id: receiver_id } })
                ]);

                if (sender && receiver) {
                    const senderConvos = JSON.parse(sender.conversations || '{}');
                    const receiverConvos = JSON.parse(receiver.conversations || '{}');
                    let hasUpdates = false;

                    // Update messages in sender's conversations
                    if (senderConvos[receiver_id]) {
                        senderConvos[receiver_id] = senderConvos[receiver_id].map(msg => {
                            if (msg.sender_id === sender_id && msg.status !== 'read') {
                                hasUpdates = true;
                                return { ...msg, status: 'read' };
                            }
                            return msg;
                        });
                    }

                    // Update messages in receiver's conversations
                    if (receiverConvos[sender_id]) {
                        receiverConvos[sender_id] = receiverConvos[sender_id].map(msg => {
                            if (msg.sender_id === sender_id && msg.status !== 'read') {
                                hasUpdates = true;
                                return { ...msg, status: 'read' };
                            }
                            return msg;
                        });
                    }

                    if (hasUpdates) {
                        // Update both users' conversations simultaneously
                        await Promise.all([
                            sender.update({ conversations: JSON.stringify(senderConvos) }),
                            receiver.update({ conversations: JSON.stringify(receiverConvos) })
                        ]);

                        // Emit status update for all messages
                        io.to(sender_id).to(receiver_id).emit('message_status_updated', {
                            user_id: sender_id,
                            status: 'read'
                        });

                        // Also emit updated conversations to both users
                        io.to(sender_id).emit('conversations_received', senderConvos);
                        io.to(receiver_id).emit('conversations_received', receiverConvos);
                    }
                }
            } catch (error) {
                console.error('Error marking messages as read:', error);
            }
        });

        socket.on('typing', ({ sender_id, receiver_id, isTyping }) => {
            console.log('Typing event received on server:', { sender_id, receiver_id, isTyping });

            try {
                // Make sure both IDs exist
                if (!sender_id || !receiver_id) {
                    console.error('Missing sender_id or receiver_id in typing event');
                    return;
                }

                // Emit typing status to receiver
                io.to(receiver_id).emit('user_typing', {
                    userId: sender_id,
                    isTyping: isTyping
                });

                console.log('Typing status emitted to receiver:', receiver_id);
            } catch (error) {
                console.error('Error in typing event:', error);
            }
        });

        // Add edit message handler
        socket.on('edit_message', async ({ message_timestamp, new_message, sender_id, receiver_id }) => {
            try {
                const [sender, receiver] = await Promise.all([
                    User.findOne({ where: { id: sender_id } }),
                    User.findOne({ where: { id: receiver_id } })
                ]);

                if (sender && receiver) {
                    const senderConvos = JSON.parse(sender.conversations || '{}');
                    const receiverConvos = JSON.parse(receiver.conversations || '{}');

                    // Update message in both conversations
                    if (senderConvos[receiver_id]) {
                        senderConvos[receiver_id] = senderConvos[receiver_id].map(msg =>
                            msg.timestamp === message_timestamp
                                ? { ...msg, message: new_message, edited: true }
                                : msg
                        );
                    }

                    if (receiverConvos[sender_id]) {
                        receiverConvos[sender_id] = receiverConvos[sender_id].map(msg =>
                            msg.timestamp === message_timestamp
                                ? { ...msg, message: new_message, edited: true }
                                : msg
                        );
                    }

                    // Save updated conversations
                    await Promise.all([
                        sender.update({ conversations: JSON.stringify(senderConvos) }),
                        receiver.update({ conversations: JSON.stringify(receiverConvos) })
                    ]);

                    // Notify both users
                    io.to(sender_id).to(receiver_id).emit('message_edited', {
                        message_timestamp,
                        new_message
                    });
                }
            } catch (error) {
                console.error('Error editing message:', error);
            }
        });

        // Simplified group handling
        socket.on('create_group', async (data) => {
            try {
                const { name, members } = data;

                if (!name || !members || members.length < 2) {
                    throw new Error('Invalid group data');
                }

                const groupId = `group_${Date.now()}`;

                const group = {
                    id: groupId,
                    name,
                    members,
                    created_at: new Date().toISOString(),
                    type: 'group',
                    conversations: []
                };

                // Store group info in each member's conversations
                const users = await User.findAll({
                    where: {
                        id: members
                    }
                });

                for (const user of users) {
                    try {
                        const userConversations = JSON.parse(user.conversations || '{}');

                        // Store group info and empty conversation array
                        userConversations[groupId] = {
                            ...group,  // Store group metadata
                            messages: [] // Initialize empty messages array
                        };

                        await user.update({
                            conversations: JSON.stringify(userConversations)
                        });
                    } catch (error) {
                        console.error(`Error updating user ${user.id} conversations:`, error);
                    }
                }

                // Notify all members about the new group
                members.forEach(memberId => {
                    io.to(memberId).emit('group_created', group);
                });

                // Also emit updated conversations to all members
                members.forEach(memberId => {
                    socket.to(memberId).emit('conversations_received', {
                        groupId,
                        group
                    });
                });

                console.log('Group created and stored:', group);
            } catch (error) {
                console.error('Error creating group:', error);
                socket.emit('error', { message: 'Failed to create group' });
            }
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    });

    return io;
}

export default initializeSocket;


