import { Stranger } from '../../../../conversation/enums/stranger.enum';

export interface IStrangerEventPayload {
  notifier: Stranger | null;
}
