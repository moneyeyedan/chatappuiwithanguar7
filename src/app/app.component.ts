import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, } from '@angular/core';
import { SocketService } from '../app/socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
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
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
}
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
}
  chatConnection() {
    this.peo = prompt("What's your name?");
    this.socket.socketConnect(this.peo);
  }
  chatNewMessage() {
    this.socket.onNewMessage().subscribe((data) => {
      this.messages.push({username:data.username,msg:data.msg})
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
    this.message='';
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
