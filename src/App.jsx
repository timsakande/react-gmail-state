import { useState } from 'react';
import Header from './components/Header';
import initialEmails from './data/emails';
import './styles/App.css';

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  const unreadCount = emails.filter((email) => !email.read).length;
  const starredCount = emails.filter((email) => email.starred).length;

  const toggleRead = (id) => {
    setEmails(emails.map((email) => (email.id === id ? { ...email, read: !email.read } : email)));
  };

  const toggleStar = (id) => {
    setEmails(emails.map((email) => (email.id === id ? { ...email, starred: !email.starred } : email)));
  };

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className="item active">
            <span className="label">Inbox</span>
            <span className="count">{unreadCount}</span>
          </li>
          <li className="item">
            <span className="label">Starred</span>
            <span className="count">{starredCount}</span>
          </li>
          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={(e) => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emails
            .filter((email) => !hideRead || !email.read)
            .map((email) => (
              <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
                <div className="select">
                  <input
                    className="select-checkbox"
                    type="checkbox"
                    checked={email.read}
                    onChange={() => toggleRead(email.id)}
                  />
                </div>
                <div className="star">
                  <input
                    className="star-checkbox"
                    type="checkbox"
                    checked={email.starred}
                    onChange={() => toggleStar(email.id)}
                  />
                </div>
                <div className="sender">{email.sender}</div>
                <div className="title">{email.title}</div>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}

export default App;