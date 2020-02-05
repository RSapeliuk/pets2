import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Greeting} from '../../models/Greeting';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {ApiService} from '../../services/api.service';
import {WebSocketApiService} from '../../services/web-socket-api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-chat-messages.component',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
})
export class ChatMessagesComponent implements OnInit {
  webSocketEndPoint = this.apiService.apiUrl + '/ws';
  topic = '/topic';
  isLoaded = false;
  stompClient: any;
  greeting: Greeting = new Greeting();
  messages: Greeting[] = [];
  name: string;
  user: User;
  users: User[];
  recievedMessages: any[];

  constructor(public authService: AuthService,
              public apiService: ApiService,
              public webApiService: WebSocketApiService,
              public ref: ChangeDetectorRef,
              public toastr: ToastrService) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(value => {
      this.greeting.fromId = value.username;
      this.user = value;
    });
    this.authService.getUsers().subscribe(value => {
      this.users = value;
      for (const u of this.users) {
        if (this.user.id === u.id) {
          this.users.splice(this.users.indexOf(u), 1);
        }
      }
    });
    this.connect();
    this.webApiService.getMessages().subscribe(value => {
      this.recievedMessages = value;
    });

  }


  connect() {
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    // tslint:disable-next-line:variable-name
    const _this = this;
    _this.stompClient.connect({}, (frame) => {
      this.isLoaded = true;
      this._openSocket();
      this.openCustomSocket(this.greeting);
    }, this.errorCallBack);
  }

  _openSocket() {
    this.stompClient.subscribe(this.topic, (message) => {
    });
  }


  openCustomSocket(user?: Greeting) {
    if (this.isLoaded === true) {
      this.stompClient.subscribe(this.topic + '/' + user.fromId, (message) => {
        this.handleMessage(message);
      });
    }
  }

  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  sendMessage(message) {
    this.stompClient.send('/app/hello', {}, JSON.stringify(message));
    this.sendMessageUsingRest();
  }

  handleMessage(message) {
    if (message.body) {
      const messageResult: Greeting = JSON.parse(message.body);
      this.messages = [...this.messages, messageResult];
      this.ref.detectChanges();
      this.toastr.success('You have new message', messageResult.fromId, {timeOut: 3000});
    }
  }

  sendMessageUsingRest() {
    this.webApiService.post(this.greeting).subscribe(res => {
    });
  }

  randomColor() {
    // tslint:disable-next-line:no-bitwise
    const randomColor = '#' + ((1 << 24) * Math.random() | 0).toString(16);
    // tslint:disable-next-line:no-bitwise
    const randomColor2 = '#' + ((1 << 24) * Math.random() | 0).toString(16);
    document.documentElement.style.setProperty('--main-bg-color', randomColor);
    document.documentElement.style.setProperty('--main-bg-color2', randomColor2);
  }
}
