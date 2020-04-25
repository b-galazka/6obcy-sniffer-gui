import { IConnectionSuccessInputEvent } from './events/connection-success-input-event.interface';
import { IExceptionInputEvent } from './events/exception-input-event.interface';
import { IPongInputEvent } from './events/pong-input-event.interface';

export type ConversationInternalInputEventUnion =
  | IConnectionSuccessInputEvent
  | IExceptionInputEvent
  | IPongInputEvent;
