import React, { useEffect, useState, useRef, } from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";
import { Howl } from 'howler'

//ICONS
import DuoIcon from '@material-ui/icons/Duo';
import CallEndIcon from '@material-ui/icons/CallEnd';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import VideoCallOutlined from '@material-ui/icons/VideoCallOutlined';

//COMPONENTS
import Navbar from '../Navbar';
import Banner from '../COMPONENTS/Banner';
import ringtone from './Sounds/ringtone.mp3';
import CallNotification from './COMPONENTS/CallNotification';


const ringtoneSound = new Howl({
    src: [ringtone],
    loop: true,
    preload: true
})

const Communication = (props) => {

    const socket = useRef();
    const myPeer = useRef();
    const myVideo = useRef();
    const partnerVideo = useRef();

    const [authorized, setAuthorized] = useState();

    const [myID, setMyID] = useState("");
    const [stream, setStream] = useState();
    const [caller, setCaller] = useState("");
    const [calling, setCalling] = useState(false);
    const [callerName, setCallerName] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [audioMuted, setAudioMuted] = useState(false)
    const [videoMuted, setVideoMuted] = useState(false)
    const [callAccepted, setCallAccepted] = useState(false);
    const [callRejected, setCallRejected] = useState(false);
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [isReceivingCall, setIsReceivingCall] = useState(false);

    useEffect(async () => {
        try {
            let userInfo = await JSON.parse(localStorage.getItem('userInfo'));
            let userRole = await JSON.parse(localStorage.getItem('userRole'));
            console.log(userRole)
            console.log(userInfo)
            if (!userInfo || userRole !== 'doctor') {
                setAuthorized(false)
                setTimeout(() => {
                    props.history.push('/')
                }, 2000);
            }
            else {
                setAuthorized(true)
                socket.current = io.connect("http://localhost:5000");
                socket.current.emit('userInfo', { name: userInfo.name, userRole: 'doctor' })

                socket.current.on("yourID", (id) => {
                    setMyID(id);
                })
                socket.current.on("allUsers", (users) => {
                    setConnectedUsers(users);
                })

                socket.current.on("callComing", (data) => {
                    setIsReceivingCall(true);
                    ringtoneSound.play();
                    setCaller(data.callerID);
                    setCallerName(data.callerName)
                    setCallerSignal(data.signal);
                })
            }

        } catch (error) {
            console.log(error)
        }
        // "http://192.168.10.8:5000"
    }, []);

    function makeCall(id) {
        // alert(id)
        if (id !== '' && id !== myID) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
                setStream(stream);
                setCalling(true)
                setCaller(id)
                if (myVideo.current) {
                    console.log('make call my stream: ', stream)
                    myVideo.current.srcObject = stream;
                }
                const peer = new Peer({
                    initiator: true,
                    trickle: false,
                    config: {

                        iceServers: [
                            { url: 'stun:stun01.sipphone.com' },
                            { url: 'stun:stun.ekiga.net' },
                            { url: 'stun:stun.fwdnet.net' },
                            { url: 'stun:stun.ideasip.com' },
                            { url: 'stun:stun.iptel.org' },
                            { url: 'stun:stun.rixtelecom.se' },
                            { url: 'stun:stun.schlund.de' },
                            { url: 'stun:stun.l.google.com:19302' },
                            { url: 'stun:stun1.l.google.com:19302' },
                            { url: 'stun:stun2.l.google.com:19302' },
                            { url: 'stun:stun3.l.google.com:19302' },
                            { url: 'stun:stun4.l.google.com:19302' },
                            { url: 'stun:stunserver.org' },
                            { url: 'stun:stun.softjoys.com' },
                            { url: 'stun:stun.voiparound.com' },
                            { url: 'stun:stun.voipbuster.com' },
                            { url: 'stun:stun.voipstunt.com' },
                            { url: 'stun:stun.voxgratia.org' },
                            { url: 'stun:stun.xten.com' },
                            {
                                url: 'turn:numb.viagenie.ca',
                                credential: 'muazkh',
                                username: 'webrtc@live.com'
                            },
                            {
                                url: 'turn:192.158.29.39:3478?transport=udp',
                                credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                                username: '28224511:1379330808'
                            },
                            {
                                url: 'turn:192.158.29.39:3478?transport=tcp',
                                credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                                username: '28224511:1379330808'
                            }
                        ]
                    },
                    stream: stream,
                });

                myPeer.current = peer;

                peer.on("signal", data => {
                    socket.current.emit("callUser", { userToCall: id, signalData: data, callerID: myID, callerName: 'WAHB UR REHMAN' })
                })

                peer.on("stream", stream => {
                    if (partnerVideo.current) {
                        partnerVideo.current.srcObject = stream;
                    }
                });

                peer.on('error', (err) => {
                    endCall()
                })

                socket.current.on("callAccepted", signal => {
                    setCallAccepted(true);
                    peer.signal(signal);
                })

                socket.current.on('close', () => {
                    window.location.reload()
                })

                socket.current.on('rejected', () => {
                    window.location.reload()
                })
            })
                .catch(() => {
                    alert('audio and video permissions are not granted')
                })
        } else {
            alert('you cannot make a call to yourself')
            return
        }
    }

    function acceptCall() {
        ringtoneSound.unload();
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (myVideo.current) {
                console.log('in call my stream: ', stream)
                myVideo.current.srcObject = stream;
            }
            setCallAccepted(true);
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: stream,
            });

            myPeer.current = peer

            peer.on("signal", data => {
                socket.current.emit("acceptCall", { signal: data, to: caller })
            })

            peer.on("stream", stream => {
                partnerVideo.current.srcObject = stream;
            });

            peer.on('error', (err) => {
                endCall()
            })

            peer.signal(callerSignal);

            socket.current.on('close', () => {
                window.location.reload()
            })
        })
            .catch(() => {
                console.log('audio and video permissions are not granted')
                alert('audio and video permissions are not granted')
            })
    }

    function declineCall() {
        ringtoneSound.unload();
        setCallRejected(true)
        socket.current.emit('rejected', { to: caller })
        window.location.reload()
    }

    function endCall() {
        myPeer.current.destroy()
        socket.current.emit('close', { to: caller })
        window.location.reload()
    }

    function handleAudio() {
        if (stream) {
            setAudioMuted(!audioMuted)
            stream.getAudioTracks()[0].enabled = audioMuted
        }
    }

    function handleVideo() {
        if (stream) {
            setVideoMuted(!videoMuted)
            stream.getVideoTracks()[0].enabled = videoMuted
        }
    }

    return (
        <>
            {authorized ?
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Navbar />
                        </div>

                        <div id="foreground" className="col-md-10"
                            style={{
                                marginTop: '5%',
                                padding: 0,
                            }}>
                            <div
                                className="col-12"
                                style={{
                                    paddingLeft: '4%',
                                    paddingRight: '4%',
                                    paddingBottom: '2%'
                                }}
                            >
                                <Banner formName="Communication" bannerHeight={150} />
                            </div>

                            <div
                                style={{
                                    // borderWidth: 2,
                                    // borderColor: 'green',
                                    // borderStyle: 'double',
                                    marginInline: '4%',
                                    marginBottom: 40,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div style={styles.containerDiv} >
                                    {stream && !callAccepted && (
                                        <div style={styles.videoPlayerDiv}>
                                            <h5 style={styles.h5}>Calling ....</h5>
                                            <video playsInline muted ref={myVideo} autoPlay />
                                            <div style={styles.iconDivContainer} >
                                                <div style={styles.iconDiv} onClick={endCall}>
                                                    <CallEndIcon style={{ ...styles.incallIcon, color: 'red' }} />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {callAccepted && (
                                        <div style={styles.videoPlayerDiv}>
                                            <h5 style={styles.h5}>{callerName}</h5>
                                            <video style={styles.myVideo} playsInline muted ref={myVideo} autoPlay />
                                            <video style={{ borderRadius: 10 }} playsInline muted ref={partnerVideo} autoPlay />
                                            <div style={styles.iconDivContainer} >
                                                <div style={styles.iconDiv} onClick={handleAudio}>
                                                    {audioMuted ?
                                                        <MicOffIcon style={styles.incallIcon} />
                                                        :
                                                        <MicIcon style={styles.incallIcon} />
                                                    }
                                                </div>

                                                <div style={styles.iconDiv} onClick={handleVideo}>
                                                    {videoMuted ?
                                                        <VideocamOffIcon style={styles.incallIcon} />
                                                        :
                                                        <VideocamIcon style={styles.incallIcon} />
                                                    }
                                                </div>

                                                <div style={styles.iconDiv} onClick={endCall}>
                                                    <CallEndIcon style={{ ...styles.incallIcon, color: 'red' }} />
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div style={styles.contactsDivContainer}>
                                    <h5 style={styles.contactsH5}>Active Users</h5>
                                    <div style={styles.contactsSection}>
                                        {
                                            connectedUsers && (connectedUsers.map((user, index) => {
                                                if (user.userID !== myID) {
                                                    return (
                                                        <div key={index} style={styles.contactDiv}>
                                                            <div style={styles.contactName}>{user.name}</div>
                                                            <div onClick={() => makeCall(user.userID)}>
                                                                <VideoCallOutlined
                                                                    key={user.userName}
                                                                    style={styles.icon}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                :
                <p>You Must Be Logged In With An Authorized Account!!</p>
            }
            <CallNotification
                open={isReceivingCall && !callAccepted && !callRejected}
                handleClose={declineCall}
                title="Incoming Call"
                content={`${callerName} is calling`}
                leftButtonName="decline"
                rightButtonName="Accept"
                handleAccept={acceptCall}
            />

        </>
    );
}

export default Communication;

const styles = {
    containerDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '70%',
        // borderStyle: 'dashed',
        // borderWidth: 2,
        // borderColor: 'blue'
    },
    h5: {
        textAlign: 'center',
        backgroundColor: '#4169e1',
        fontSize: 24,
        color: '#ffffff',
        paddingBlock: 5,
        fontFamily: 'sans-serif',
        borderRadius: 10
    },
    myVideo: {
        width: '18%',
        height: '20%',
        position: 'absolute',
        zIndex: 1,
        top: '23.5%',
        left: 50,
        backgroundColor: '#000000',
        borderRadius: 10
        // borderStyle: 'dashed',
        // borderWidth: 2,
        // borderColor: 'blue'
    },
    videoPlayerDiv: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    iconDivContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#4169e1',
        paddingBlock: 3,
        marginTop: 10,
        borderRadius: 10
    },
    incallIcon: {
        color: '#4169e1',
        fontSize: 30
    },
    iconDiv: {
        backgroundColor: '#ffffff',
        width: 40,
        height: 40,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40
    },
    contactsDivContainer: {
        width: '25%',
        height: '',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // borderStyle: 'dashed',
        // borderWidth: 2,
        // borderColor: 'green'
    },
    contactsH5: {
        textAlign: 'center',
        fontFamily: 'sans-serif',
        color: '#ffffff',
        backgroundColor: '#4169e1',
        paddingBlock: 5,
        borderRadius: 5
    },
    contactsSection: {
        display: 'flex',
        flexDirection: 'column',
        // borderStyle: 'dashed',
        // borderWidth: 2,
        // borderColor: 'green'
    },
    contactDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingInline: 15,
        alignItems: 'center',
        marginBottom: 5
    },
    contactName: {
        fontSize: 20,
        color: '#4169e1',
        fontFamily: 'sans-serif',
        textTransfrom: 'capitalize',
        fontWeight: 'bold'
    },
    icon: {
        fontSize: 40,
        color: '#4169e1'
    }
}

// const styles = {
//     contactsDivContainer: {
//         width: '25%',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         // borderStyle: 'dashed',
//         // borderWidth: 2,
//         // borderColor: 'green'
//     },
//     contactsH5: {
//         textAlign: 'center',
//         fontFamily: 'sans-serif',
//         color: '#ffffff',
//         backgroundColor: '#4169e1',
//         paddingBlock: 5
//     },
//     contactsSection: {
//         display: 'flex',
//         flexDirection: 'column',
//         rderStyle: 'dashed',
//         borderWidth: 2,
//         borderColor: 'green'
//     },
//     contactDiv: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingInline: 15,
//         alignItems: 'center',
//         marginBottom: 5
//     },
//     contactName: {
//         fontSize: 20,
//         color: '#4169e1',
//         fontFamily: 'sans-serif',
//         textTransfrom: 'capitalize',
//         fontWeight: 'bold'
//     },
//     icon: {
//         fontSize: 40,
//         color: '#4169e1'
//     }
// }