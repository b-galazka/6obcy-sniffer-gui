import { Stranger } from 'src/app/modules/conversation/enums/stranger.enum';

export interface IBaseStrangerInputEventPayload {
  notifier: Stranger | null;
}
