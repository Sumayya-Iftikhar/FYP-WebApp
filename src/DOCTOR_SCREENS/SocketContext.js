import React, { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
    let socket = '';
const ContextProvider = ({ children }) => {

    const [me, setMe] = useState('');
    const [stream, setStream] = useState(null);
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const [isCalling, setIsCalling] = useState(false);
    const [connectedUsers, setConnectedUsers] = useState([]);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        socket = io('http://localhost:5000');
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(currentStream => {
                console.log('current Stream: ', currentStream);
                setStream(currentStream);

                // myVideo.current.srcObject = currentStream;
            });

        socket.on('me', id => setMe(id));
        socket.emit('myName', 'WAHB UR REHMAN')

        socket.on('allConnectedUsers', (users) => {
            setConnectedUsers(users)
        })


        // socket.on('calluser', ({ from, name: callerName, signal }) => {
        //     setCall({ isCallReceived: true, from, name: callerName, signal })
        // })
    }, [])

    const answerCall = () => {
        setIsCalling(false);
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from })
        });

        peer.on('stream', (currentStream) => {
            console.log('answer call current Stream: ', currentStream);
            myVideo.current.srcObject = stream;
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {
        setIsCalling(true);
        // myVideo.current.srcObject = stream;
        const peer = new Peer({ initiator: true, trickle: false, stream });
        socket.on('calluser', ({ from, name: callerName, signal }) => {
            myVideo.current.srcObject = stream;
            setCall({ isCallReceived: true, from, name: callerName, signal })
        })

        peer.on('signal', (data) => {
            console.log('data:', data)
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name })
        });

        peer.on('stream', (currentStream) => {
            console.log('call user current stream: ', currentStream);
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);

            console.log('call accepted signal: ', signal);
            peer.signal(signal)
        })

        connectionRef.current = peer;
    }



    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, isCalling, setIsCalling, callEnded, me, answerCall, callUser, leaveCall, connectedUsers }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext }