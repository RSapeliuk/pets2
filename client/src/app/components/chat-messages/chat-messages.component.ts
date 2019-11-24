import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {ToastrService} from 'ngx-toastr';
import {Message} from '../../models/message';
import {WebSocketApiService} from '../../services/web-socket-api.service';

@Component({
  selector: 'app-chat-messages.component',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  private serverUrl = 'http://localhost:8080/socket';
  isLoaded = false;
  isCustomSocketOpened = false;
  stompClient;
  form: FormGroup;
  userForm: FormGroup;
  messages: Message[] = [];

  constructor(private socketService: WebSocketApiService, private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });
    this.userForm = new FormGroup({
      fromId: new FormControl(null, [Validators.required]),
      toId: new FormControl(null)
    });
    this.initializeWebSocketConnection();
  }

  sendMessageUsingSocket() {
    if (this.form.valid) {
      let message: Message = {message: this.form.value.message, fromId: this.userForm.value.fromId, toId: this.userForm.value.toId};
      this.stompClient.send('/socket-subscriber/send/message', {}, JSON.stringify(message));
    }
  }

  sendMessageUsingRest() {
    if (this.form.valid) {
      let message: Message = {message: this.form.value.message, fromId: this.userForm.value.fromId, toId: this.userForm.value.toId};
      this.socketService.post(message).subscribe(res => {
        console.log(res);
      });
    }
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, (frame) => {
      that.isLoaded = true;
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe('/socket-publisher', (message) => {
      this.handleResult(message);
    });
  }

  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe('/socket-publisher/' + this.userForm.value.fromId, (message) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
      this.toastr.success('new message recieved', null, {
        'timeOut': 3000
      });
    }
  }

}
