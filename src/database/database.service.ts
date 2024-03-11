import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorites } from 'src/favorites/entities/favorites.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DatabaseService {
  private readonly users: User[] = [];
  private readonly tracks: Track[] = [];
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  addUser(user: User) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  updateUser(user: User) {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
  }

  deleteUser(id: string) {
    const index = this.users.findIndex((u) => u.id === id);
    this.users.splice(index, 1);
  }

  addTrack(track: Track) {
    this.tracks.push(track);
  }

  getTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  updateTrack(track: Track) {
    const index = this.tracks.findIndex((t) => t.id === track.id);
    this.tracks[index] = track;
  }

  deleteTrack(id: string) {
    const index = this.tracks.findIndex((t) => t.id === id);
    this.tracks.splice(index, 1);
    this.favorites.tracks = this.favorites.tracks.filter(
      (track) => track !== id,
    );
  }

  addArtist(artist: Artist) {
    this.artists.push(artist);
  }

  getArtists() {
    return this.artists;
  }

  getArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  updateArtist(artist: Artist) {
    const index = this.artists.findIndex((a) => a.id === artist.id);
    this.artists[index] = artist;
  }

  deleteArtist(id: string) {
    const index = this.artists.findIndex((a) => a.id === id);
    this.artists.splice(index, 1);
    this.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
    this.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
    this.favorites.artists = this.favorites.artists.filter(
      (artist) => artist !== id,
    );
  }

  addAlbum(album: Album) {
    this.albums.push(album);
  }

  getAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  updateAlbum(album: Album) {
    const index = this.albums.findIndex((a) => a.id === album.id);
    this.albums[index] = album;
  }

  deleteAlbum(id: string) {
    const index = this.albums.findIndex((a) => a.id === id);
    this.albums.splice(index, 1);
    this.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
    this.favorites.albums = this.favorites.albums.filter(
      (album) => album !== id,
    );
  }

  getFavorites = () => ({
    artists: this.artists.filter((artist) =>
      this.favorites.artists.includes(artist.id),
    ),
    albums: this.albums.filter((album) =>
      this.favorites.albums.includes(album.id),
    ),
    tracks: this.tracks.filter((track) =>
      this.favorites.tracks.includes(track.id),
    ),
  });

  addFavorite(id: string, type: 'artists' | 'albums' | 'tracks') {
    switch (type) {
      case 'artists':
        this.favorites.artists.push(id);
        break;
      case 'albums':
        this.favorites.albums.push(id);
        break;
      case 'tracks':
        this.favorites.tracks.push(id);
        break;
    }
  }

  deleteFavorite(id: string, type: 'artists' | 'albums' | 'tracks') {
    switch (type) {
      case 'artists':
        this.favorites.artists = this.favorites.artists.filter(
          (artist) => artist !== id,
        );
        break;
      case 'albums':
        this.favorites.albums = this.favorites.albums.filter(
          (album) => album !== id,
        );
        break;
      case 'tracks':
        this.favorites.tracks = this.favorites.tracks.filter(
          (track) => track !== id,
        );
        break;
    }
  }

  isExistFavorite(id: string, type: 'artists' | 'albums' | 'tracks') {
    switch (type) {
      case 'artists':
        return this.artists.some((artist) => artist.id === id);
      case 'albums':
        return this.albums.some((album) => album.id === id);
      case 'tracks':
        return this.tracks.some((track) => track.id === id);
    }
  }
}
