const testApi = async () => {
    try {
        console.log("Testing GET http://localhost:3000/api/song");
        const resSong = await fetch("http://localhost:3000/api/song");
        console.log("Song API Status:", resSong.status);
        const songs = await resSong.json();
        console.log("Song API Data length:", songs.length);

        console.log("Testing GET http://localhost:3000/api/playlist");
        const resPlaylist = await fetch("http://localhost:3000/api/playlist");
        console.log("Playlist API Status:", resPlaylist.status);
        const playlists = await resPlaylist.json();
        console.log("Playlist API Data length:", playlists.length);

    } catch (err) {
        console.error("API Test Failed:", err.message);
    }
};

testApi();
