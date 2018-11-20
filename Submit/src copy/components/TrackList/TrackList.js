import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';
//import tracks from './SearchResults/SearchResults.js';

class TrackList extends React.Component{
  createTracks(tracks, onAddFromParent, isRemovalFromParent, onRemoveFromParent) {
    if(tracks) {
      let i = 0;
      return tracks.map(function(track) {
        return <Track key={i++} track={track} onAdd={onAddFromParent} isRemoval={isRemovalFromParent} onRemove={onRemoveFromParent} />
      });
    }
  }


  render() {
    return(
      <div className="TrackList">
        {this.createTracks(this.props.tracks, this.props.onAdd, this.props.isRemoval, this.props.onRemove)}
      </div>
    );
  }
}


export default TrackList;
