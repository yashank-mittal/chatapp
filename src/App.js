import {ChatEngine} from 'react-chat-engine';
import ChatFeed from './components/Chatfeed';
import Loginform from './components/Loginform';
import './App.css';

const App = () =>{
  if(!localStorage.getItem('username')) return <Loginform />
  return(
    <ChatEngine
      height="100vh"
      projectID= {process.env.REACT_APP_PROJECTID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps)=><ChatFeed {...chatAppProps} />}
    />
  );
}

export default App;