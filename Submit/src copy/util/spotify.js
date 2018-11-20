const clientID="dbbe10a6e9e7463a9370fae6d37bd239"
const RedirectURI="'http://localhost:8888/callback/'"
let accessToken = '';
let expiresIn
let playlistID


let Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${RedirectURI}`;
      window.location = accessUrl;
    }
  },

  search(term) {
        const accessToken = Spotify.getAccessToken();


        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
   }).then(
     jsonResponse => {
       if (jsonResponse.tracks) {
         return jsonResponse.tracks.items.map(track => {
           return {
             id: track.id,
             name: track.name,
             artist: track.artists[0].name,
             album: track.album.name,
             uri: track.uri
           };
         });
       }
       return [];
     }
   );
},
    savePlaylist(name,trackURIs){
        if (!name || !trackURIs.length ===0) {
        return;

        const accessToken = Spotify.getAccessToken();
           const headers = {
               'Authorization': `Bearer ${accessToken}`
           };
           let userID;
           fetch('https://api.spotify.com/v1/me', {headers: headers})
           .then(response => response.json())
           .then(jsonResponse => userID = jsonResponse.id)
           .then(()=>{
             fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
               headers: headers,
               method: 'POST',
               body: JSON.stringify({name: name})
             })
            .then(response => response.json())
            .then(jsonResponse => playlistID = jsonResponse.id)
            .then(() => {
   const createPlayList=`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`

   fetch (createPlayList,{headers: headers, method:'POST', body: JSON.stringify({uris: trackURIs})})
             })
            })
          }
        }
      }

export default Spotify;
