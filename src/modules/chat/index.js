import React from 'react';
import io from 'socket.io-client';


class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: null,
            messageList: []
        }
    }

    onMessageSend = (event) => {
        if (event.key === 'Enter') {
            this.state.socket.emit('onMessage', {message: event.target.value});
            this.setState({[event.target.id]: ''})
        }
    };

    async componentDidMount() {
        let socket = await io.connect('http://localhost:3010');
        socket.on('messageList', (data) => {
            console.log('Class: Chat, Function:  ==', data);
            this.setState({messageList: data})
        });
        console.log('Class: Chat, Function: componentDidMount ==', socket);
        this.setState({socket});

    }

    onTextChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    messageList = () => {
        return this.state.messageList.map(((data, key) =>
                <div key={key} style={{
                    color: 'black',
                    margin: '10px',
                    whiteSpace: 'nowrap',
                    width: '50%',
                    flexWrap: 'nowrap',
                    flexDirection: 'column',
                    float: data.senderId === this.state.socket.id ? 'right' : 'left',
                    textAlign: data.senderId === this.state.socket.id ? 'right' : 'left',

                }}>
                    <div style={{
                        width: '90%', padding: '10px',
                        borderRadius: '12px',
                        float: data.senderId === this.state.socket.id ? 'right' : 'left',
                        backgroundColor: '#F9E79F'
                    }}>
                        <div style={{color: 'Grey', marginBottom: '5px'}}>
                            {data.senderId === this.state.socket.id ? 'You' : 'Anonymous'}
                        </div>
                        {data.message}
                    </div>
                </div>
        ))
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#E74C3C',
                textAlign: 'center'
            }}>
                <p style={{width: '100%', fontSize: '20px', textAlign: 'center', color: 'white',}}>MY CHAT APP</p>
                <div style={{
                    margin: '20px',
                    padding: '10px',
                    height: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'tan'
                }}>
                    <div id='chat-list'
                         style={{
                             overflowY: 'auto',
                             backgroundColor: '#FEF9E7',
                             height: '90%',
                             width: '100%',
                             margin: 'auto'
                         }}>
                        {this.messageList()}
                    </div>
                    <input value={this.state.messageInput} id='messageInput' onChange={this.onTextChange}
                           onKeyPress={this.onMessageSend} type="text"
                           placeholder="Type a message"
                           style={{padding: '10px', outline: 'none'}}/>
                </div>
            </div>
        );

    }

}

export default Chat;
