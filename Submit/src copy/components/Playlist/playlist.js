import React from 'react';
import './playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component {
  constructor(props){
    super(props);
  }

handleNameChange(event){
  this.props.onNameChange(event.target.value);
  this.handleNameChange = this.handleNameChange.bind(this);
}

  render() {
    return(
      <div className="Playlist">
        <input defaultValue={this.props.playlistName} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks}
         isRemoval={true}
        onRemove={this.props.onRemove}
        onChange={this.handleNameChange}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
