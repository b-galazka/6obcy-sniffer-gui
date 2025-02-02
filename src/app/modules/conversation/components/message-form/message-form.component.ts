import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnChange, SimpleChange } from 'property-watch-decorator';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { isArrayValidator } from 'src/app/modules/shared/validators/is-array.validator';
import { Stranger } from '../../services/conversation/enums/stranger.enum';
import { ConversationEndStep } from './conversation-end-step.enum';
import { IMessageSubmitPayload } from './message-submit-payload.interface';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageFormComponent implements OnInit, OnDestroy {
  readonly Stranger = Stranger;
  readonly ConversationEndStep = ConversationEndStep;

  @OnChange('handleFormDisablationChange') @Input() isDisabled: boolean;
  @Output() readonly messageSubmit = new EventEmitter<IMessageSubmitPayload>();
  @Output() readonly conversationEnd = new EventEmitter<void>();

  form: FormGroup;

  readonly conversationEndStep$ = new BehaviorSubject<ConversationEndStep>(
    ConversationEndStep.endConversation
  );

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initConversationEndButtonTimeout();
  }

  private initForm(): void {
    this.buildForm();
    this.setInitialFormState();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      messageContent: [{ value: null, disabled: this.isDisabled }, Validators.required],
      messageReceivers: [null, [Validators.required, Validators.minLength(1), isArrayValidator]]
    });
  }

  private setInitialFormState(): void {
    this.form.patchValue({ messageContent: null, messageReceivers: [] });
  }

  private initConversationEndButtonTimeout(): void {
    this.conversationEndStep$
      .pipe(
        switchMap(() => timer(5000)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.conversationEndStep$.next(ConversationEndStep.endConversation));
  }

  @HostListener('document:keyup.alt.f2')
  toggleFirstStranger(): void {
    this.toggleMessageReceiver(Stranger.first);
  }

  @HostListener('document:keyup.alt.f1')
  toggleSecondStranger(): void {
    this.toggleMessageReceiver(Stranger.second);
  }

  private toggleMessageReceiver(messageReceiver: Stranger): void {
    if (this.isDisabled) {
      return;
    }

    const messageReceiversFormControl = this.form.get('messageReceivers');
    const messageReceivers: Stranger[] = messageReceiversFormControl?.value;
    const isReceiverSelected = messageReceivers.includes(messageReceiver);

    const updatedMessageReceivers = isReceiverSelected
      ? messageReceivers.filter(receiver => receiver !== messageReceiver)
      : [...messageReceivers, messageReceiver];

    messageReceiversFormControl?.setValue(updatedMessageReceivers);
  }

  submitForm(): void {
    if (this.form.invalid || this.isDisabled) {
      return;
    }

    this.messageSubmit.emit(this.form.value);
    this.form.get('messageContent')?.setValue(null);
  }

  @HostListener('document:keyup.esc')
  handleConversationEndButtonClick(): void {
    if (this.isDisabled) {
      return;
    }

    if (this.conversationEndStep$.value === ConversationEndStep.endConversation) {
      this.conversationEndStep$.next(ConversationEndStep.confirmConversationEnd);
      return;
    }

    this.conversationEnd.emit();
    this.conversationEndStep$.next(ConversationEndStep.endConversation);
  }

  handleFormDisablationChange(isDisabled: boolean, { firstChange }: SimpleChange<boolean>): void {
    if (firstChange) {
      return;
    }

    const messageContentFormControl = this.form.get('messageContent');

    if (isDisabled) {
      this.setInitialFormState();
      messageContentFormControl?.disable();
    } else {
      messageContentFormControl?.enable();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
