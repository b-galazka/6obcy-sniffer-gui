import { IBaseStrangerInputEventPayload } from './base-stranger-input-event-payload.interface';

export interface IStrangerMessageInputEventPayload extends IBaseStrangerInputEventPayload {
  message: string;
}
