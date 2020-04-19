import { Inject, Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { EMPTY, interval, Observable } from 'rxjs';
import { filter, mapTo, mergeMap, take, tap, timeout } from 'rxjs/operators';
import { WEB_SOCKET } from 'src/app/modules/core/injection-tokens/web-socket.token';
import { config } from 'src/config';
import { CONFIG } from '../../../core/injection-tokens/config.token';
import { BaseStateService } from '../../../core/services/base-state.service';
import { IConversationState } from '../../interfaces/conversation-state.interface';
import { ConversationInputEventUnion } from './input-events/conversation-input-event-union.type';
import { ConversationInputEvent } from './input-events/conversation-input-event.enum';
import { ConversationOutputEventUnion } from './output-events/conversation-output-event-union.type';
import { ConversationOutputEvent } from './output-events/conversation-output-event.enum';

// TODO: move websocket communication to ConversationWebSocketService
@Injectable()
export class ConversationService extends BaseStateService<IConversationState> {
  private webSocket$: WebSocketSubject<object> | null;

  constructor(
    @Inject(CONFIG) private readonly appConfig: typeof config,
    @Inject(WEB_SOCKET) private readonly webSocketConnector: typeof webSocket
  ) {
    super({
      wasConnected: false,
      isConnecting: false,
      isConnected: false,
      isConnectionError: false
    });
  }

  initConnection(): void {
    if (this.webSocket$) {
      return;
    }

    this.webSocket$ = this.webSocketConnector(this.appConfig.env.wsApiUrl);

    this.setState({ isConnecting: true, isConnected: false, isConnectionError: false });

    this.webSocket$.subscribe(
      event => this.handleWebSocketEvent(event as ConversationInputEventUnion),
      () => this.handleWebSocketError(),
      () => this.handleWebSocketDisconnect()
    );
  }

  private handleWebSocketEvent(event: ConversationInputEventUnion): void {
    switch (event.event) {
      case ConversationInputEvent.connectionSuccess:
        this.handleConnectionSuccess();
        break;

      default:
    }

    console.log(event);
  }

  private handleConnectionSuccess(): void {
    this.initHeartbeat();
    this.initExternalApiConnection();
  }

  private initHeartbeat(): void {
    interval(this.appConfig.wsPingInterval)
      .pipe(
        tap(() => this.ping()),
        mergeMap(() => this.handleNearestPong())
      )
      .subscribe({ error: () => this.webSocket$?.complete() });
  }

  private ping(): void {
    this.emitWebSocketEvent({ event: ConversationOutputEvent.ping });
  }

  private handleNearestPong(): Observable<void> {
    if (!this.webSocket$) {
      return EMPTY;
    }

    return this.webSocket$.pipe(
      filter(event => this.isPongEvent(event as ConversationInputEventUnion)),
      take(1),
      timeout(this.appConfig.wsPingTimeout),
      mapTo(undefined)
    );
  }

  private isPongEvent({ event }: ConversationInputEventUnion): boolean {
    return event === ConversationInputEvent.pong;
  }

  private initExternalApiConnection(): void {
    this.emitWebSocketEvent({ event: ConversationOutputEvent.initialization });
  }

  private handleWebSocketError(): void {
    this.webSocket$ = null;
    console.log('error');
  }

  private handleWebSocketDisconnect(): void {
    this.webSocket$ = null;
    console.log('disconnect');
  }

  private emitWebSocketEvent(event: ConversationOutputEventUnion): void {
    this.webSocket$?.next(event);
  }
}
