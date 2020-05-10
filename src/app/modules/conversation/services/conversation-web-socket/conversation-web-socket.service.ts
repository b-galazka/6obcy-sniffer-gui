import { Inject, Injectable } from '@angular/core';
import { EMPTY, interval, merge, Observable } from 'rxjs';
import { catchError, filter, finalize, mergeMap, share, take, tap, timeout } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { CONFIG } from 'src/app/modules/core/injection-tokens/config.token';
import { WEB_SOCKET } from 'src/app/modules/core/injection-tokens/web-socket.token';
import { config } from 'src/config';
import { ConversationInputEventUnion } from './input-events/conversation-input-event-union.type';
import { ConversationExternalInputEventUnion } from './input-events/external-events/conversation-external-input-event-union.type';
import { ConversationExternalInputEvent } from './input-events/external-events/conversation-external-input-event.enum';
import { ConversationInternalInputEvent } from './input-events/internal-events/conversation-internal-input-event.enum';
import { ConversationOutputEventUnion } from './output-events/conversation-output-event-union.type';
import { ConversationInternalOutputEvent } from './output-events/internal-events/conversation-internal-output-event.enum';

@Injectable()
export class ConversationWebSocketService {
  private webSocket$: WebSocketSubject<
    ConversationInputEventUnion | ConversationOutputEventUnion
  > | null;

  constructor(
    @Inject(CONFIG) private readonly appConfig: typeof config,
    @Inject(WEB_SOCKET) private readonly webSocketConnector: typeof webSocket
  ) {}

  initConnection(): Observable<ConversationExternalInputEventUnion> | null {
    if (this.webSocket$) {
      return null;
    }

    this.webSocket$ = this.webSocketConnector(this.appConfig.env.wsApiUrl);

    return merge(
      this.handleConnectionSuccess(),
      this.handleServiceUnanvailableExceptionEvent(),
      this.filterExternalInputEvents()
    ).pipe(
      finalize(() => this.makeDisconnectionCleanup()),
      catchError(() => this.handleConnectionError()),
      share()
    );
  }

  private filterExternalInputEvents(): Observable<ConversationExternalInputEventUnion> {
    if (!this.webSocket$) {
      return EMPTY;
    }

    return this.webSocket$.pipe(
      filter(event => this.isExternalInputEvent(event as ConversationInputEventUnion))
    ) as Observable<ConversationExternalInputEventUnion>;
  }

  private isExternalInputEvent({ event }: ConversationInputEventUnion): boolean {
    const externalEvents = Object.values(ConversationExternalInputEvent);

    return externalEvents.includes(event as ConversationExternalInputEvent);
  }

  private handleConnectionSuccess(): Observable<never> {
    if (!this.webSocket$) {
      return EMPTY;
    }

    return this.webSocket$.pipe(
      filter(event => this.isConnectionSuccessEvent(event as ConversationInputEventUnion)),
      tap(() => this.initExternalApiConnection()),
      mergeMap(() => this.initHeartbeat()),
      filter(() => false)
    ) as Observable<never>;
  }

  private isConnectionSuccessEvent({ event }: ConversationInputEventUnion): boolean {
    return event === ConversationInternalInputEvent.connectionSuccess;
  }

  private initExternalApiConnection(): void {
    this.emitConversationEvent({ event: ConversationInternalOutputEvent.initialization });
  }

  private initHeartbeat(): Observable<never> {
    return interval(this.appConfig.wsPingInterval).pipe(
      tap(() => this.ping()),
      mergeMap(() => this.handleNearestPong())
    );
  }

  private ping(): void {
    this.emitConversationEvent({ event: ConversationInternalOutputEvent.ping });
  }

  private handleNearestPong(): Observable<never> {
    if (!this.webSocket$) {
      return EMPTY;
    }

    return this.webSocket$.pipe(
      filter(event => this.isPongEvent(event as ConversationInputEventUnion)),
      take(1),
      timeout(this.appConfig.wsPingTimeout),
      filter(() => false)
    ) as Observable<never>;
  }

  private isPongEvent({ event }: ConversationInputEventUnion): boolean {
    return event === ConversationInternalInputEvent.pong;
  }

  private handleServiceUnanvailableExceptionEvent(): Observable<never> {
    if (!this.webSocket$) {
      return EMPTY;
    }

    return this.webSocket$.pipe(
      filter(event =>
        this.isServiceUnanvailableExceptionEvent(event as ConversationInputEventUnion)
      ),
      tap(() => this.webSocket$?.error(new Error('503'))),
      filter(() => false)
    ) as Observable<never>;
  }

  private isServiceUnanvailableExceptionEvent(event: ConversationInputEventUnion): boolean {
    return event.event === ConversationInternalInputEvent.exception && event.data.code === 503;
  }

  private handleConnectionError(): Observable<never> {
    this.makeDisconnectionCleanup();

    return EMPTY;
  }

  private makeDisconnectionCleanup(): void {
    this.webSocket$ = null;
  }

  emitConversationEvent(event: ConversationOutputEventUnion): void {
    this.webSocket$?.next(event);
  }
}
