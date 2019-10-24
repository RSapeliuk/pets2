import {Component, OnInit} from '@angular/core';
import {WebSocketAPIService} from 'src/app/services/web-socket-api.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent {
  // webSocketAPI: WebSocketAPIService;
  // greeting: any;
  // name: string;
  // ngOnInit() {
  //   this.webSocketAPI = new WebSocketAPIService(new ChatMessagesComponent());
  // }

  // connect(){
  //   this.webSocketAPI._connect();
  // }

  // disconnect(){
  //   this.webSocketAPI._disconnect();
  // }

  // sendMessage(){
  //   this.webSocketAPI._send(this.name);
  // }

  // handleMessage(message){
  //   this.greeting = message;
  // }
}
