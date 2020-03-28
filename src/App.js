import FadeIn from 'react-fade-in';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import TextEditable from './TextEditable.js';
import TextItem from './TextItem.js';

function App () {
  const [album, setAlbum] = useState('Temporary Thrillz'); 
  const [artist, setArtist] = useState('Space Dimension Controller'); 
  const [song, setSong] = useState(null);
  return (
    <Router>
      <Switch>
        <Route exact path="/control" render={() => (
          <main style={{ padding: 60 }}>
            <TextEditable
              placeholder="Artist"
              style={{
                display: 'block',
                fontWeight: 800,
                fontSize: '2rem',
                textTransform: 'uppercase'
              }}
              text={artist}
            />
            <TextEditable
              placeholder="Album"
              style={{
                display: 'block',
                fontWeight: 800,
                fontSize: '1.5rem',
                textTransform: 'uppercase'
              }}
              text={album}
            />
          </main>
        )} />
        <Route exact path="/" render={() => (
          <main className="fill">
            <div className="absolute" style={{ bottom: 60, left: 60 }}>
              <FadeIn>
                <TextItem
                  style={{ color: 'white', fontSize: '3rem' }}
                  text={artist}
                />
                <TextItem
                  style={{ color: 'white', fontSize: '2.5rem' }}
                  text={album}
                />
              </FadeIn>
            </div>
          </main>
        )} />
      </Switch>
    </Router>
  );
}

export default App;
