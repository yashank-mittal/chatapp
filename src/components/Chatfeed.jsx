import React from 'react'
import Messageform from './Messageform';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage'

export default function Chatfeed(props) {
    const { chats,activeChat,userName,messages } = props;
    const chat = chats && chats[activeChat];
    // console.log(chat,userName,messages);
    const renderReadReceipts = (message,isMyMessage)=>{
        return chat.people.map((person,index)=> person.last_read === message.id && (
            <div 
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage? 'right' : 'left',
                    backgroundImage:`url(${person?.person?.avatar})`
                }}
            />
        ))
    }
    const renderMessages = ()=>{
        const Keys = Object.keys(messages);
        // console.log(Keys);
        return Keys.map((Key,index) => {
            const message = messages[Key];
            const lastMessagekey = index === 0 ? null : Keys[index - 1];
            const isMyMessage = userName === message.sender.username;

            return(
                <div Key={`msg_${index}`} style={{width:'100%'}}>
                    <div className="message-block">
                        {
                            isMyMessage
                            ?<MyMessage message={message}/>
                            : <TheirMessage message={message} lastMessage={messages[lastMessagekey]}/>
                        }
                    </div>
                    <div className="read-receipts" style={{marginRight: isMyMessage?'18px':'0px',marginLeft: isMyMessage?'0px':'68px'}}>
                            {renderReadReceipts(message,isMyMessage)}
                    </div>
                </div>
            )
        })
    }

    
    if(!chat)return'Loading...';
    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((person)=>`${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{height:'100px'}} />
            <div className="message-form-container">
                <Messageform  {...props} chatId={activeChat} />
            </div>
        </div>
    )
}
