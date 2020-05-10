import { IInitializationOutputEvent } from '../internal-events/events/initialization-output-event.interface';
import { IPingOutputEvent } from '../internal-events/events/ping-output-event.interface';

export type ConversationInternalOutputEventUnion = IInitializationOutputEvent | IPingOutputEvent;
