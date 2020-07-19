import { Component, OnInit } from '@angular/core';
import { SocketService } from '../app/socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularSocket';
  peo: any;
  groups: any;
  currentGroup: any;
  message: any;
  users: any[] = [];
  messages: any[] = [];
  constructor(private socket: SocketService) {

  }
  ngOnInit() {
    // for(let i=0;i<1000;i++){
    //   this.messages.push(i);
    // }
    this.chatConnection();
    this.chatNewMessage();
    this.updatedRoom();
    this.updateUserConnection();

  }

  chatConnection() {
    this.peo = prompt("What's your name?");
    this.socket.socketConnect(this.peo);
  }
  chatNewMessage() {
    this.socket.onNewMessage().subscribe((data) => {
      this.messages.push(data.username+data.msg)
      console.log('new user is connected' + JSON.stringify(data));
    });
  }
  updatedRoom() {
    this.socket.updatedRoom().subscribe(data => {
      this.groups = data.rooms;
      this.currentGroup = data.currentRoom;
    });
  }
  switchRoom(room) {
    this.socket.switchRoom(room);
  }
  sendMessage(message) {
    this.socket.sendMessage(message);
  }
  updateUserConnection() {
    this.socket.updateUserConnection().subscribe(data => {
      console.log(data);
      this.users = [] ;
      for (let use in data) {
        this.users.push(data[use]);
      }
      console.log(this.users);
    });
  }
}
