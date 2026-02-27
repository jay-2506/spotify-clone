const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    coverImage: String,
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
});

const Playlist = mongoose.model('Playlist', playlistSchema);

async function updatePlaylists() {
    await mongoose.connect('mongodb://localhost:27017/clone');
    console.log('Connected to MongoDB');

    const playlists = await Playlist.find({});

    for (const p of playlists) {
        let imageUrl = '';
        if (p.name.toLowerCase().includes('favorite')) {
            imageUrl = '/images/favorites.png';
        } else if (p.name.toLowerCase().includes('arijit')) {
            imageUrl = '/images/arijit.png';
        } else if (p.name.toLowerCase().includes('romantic')) {
            imageUrl = '/images/romantic.png';
        } else if (p.name.toLowerCase().includes('chill')) {
            imageUrl = '/images/chill.png';
        } else {
            imageUrl = '/images/favorites.png';
        }

        p.image = imageUrl;
        p.coverImage = imageUrl; // Set both to be safe
        await p.save();
        console.log(`Updated playlist "${p.name}" with image: ${imageUrl}`);
    }

    await mongoose.disconnect();
}

updatePlaylists().catch(console.error);
