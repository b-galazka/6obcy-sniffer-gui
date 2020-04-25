import { IBaseStrangerInputEventPayload } from './base-stranger-input-event-payload.interface';

export interface IRandomTopicInputEventPayload extends IBaseStrangerInputEventPayload {
  topic: string;
}
