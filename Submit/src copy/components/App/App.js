import React from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/playlist.js';
import Spotify from '../../util/spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this);
  }

  //add track to playlist
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
return;
}
  }

//remove track from playlist
removeTrack(track){
  let newPlaylist = this.state.playlistTracks.filter(function(obj){
    return obj.id !== track.id;
  });

  this.setState({
    playlistTracks: this.state.playlistTracks.concat([{
      id: track.id,
      name: track.name,
      artist: track.artist,
      album: track.album,
      uri: track.uri
    }])
  });
}

updatePlaylistName(name) {
  this.setState({playlistName: name});
}

savePlaylist(){
  let trackURIs = this.state.playlistTracks.map(track => (
    track.uri
  ));


  Spotify.savePlaylist(this.state.playlistName, trackURIs);

  // clear state
  this.setState({
    playlistName: 'New Playlist',
    searchResults: [],
    playlistTracks: []
  });
}


search(term) {
  Spotify.search(term).then(tracks => {
    this.setState({searchResults: tracks});
  });
}

  render() {
    return (
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
  <SearchBar onSearch={this.search} />
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults}/>
      <Playlist playlistName={this.state.playlistName}
      playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
