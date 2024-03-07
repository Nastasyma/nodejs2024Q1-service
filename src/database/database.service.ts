import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DatabaseService {
  private readonly users: User[] = [];
  private readonly tracks: Track[] = [];
  private readonly artists: Artist[] = [];

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
  }
}
