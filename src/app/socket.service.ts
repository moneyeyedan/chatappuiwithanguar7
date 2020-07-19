import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  //client host is provide here
  socket = io('ws://https://calm-shore-46936.herokuapp.com');
  constructor() { }
  socketConnect(value) {
    this.socket.emit('adduser', value);
  }
  onNewMessage() {
    return Observable.create(observer => {
      this.socket.on('updatechat', (username, msg) => {
        observer.next({ username, msg });
      });
    });
  }
  updatedRoom() {
    return Observable.create(observer => {
      this.socket.on('updaterooms', (rooms, currentRoom) => {
        observer.next({ rooms, currentRoom });
      });
    });
  }
  switchRoom(room) {
    this.socket.emit('switchRoom', room);
  }
  sendMessage(message) {
    this.socket.emit('sendchat', message);
  }
  updateUserConnection() {
    return Observable.create(observer => {
      this.socket.on('updateusers', (users) => {
        observer.next(users);
      });
    });
  }
}
