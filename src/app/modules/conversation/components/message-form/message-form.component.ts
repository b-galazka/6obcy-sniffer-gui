import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { isArrayValidator } from 'src/app/modules/shared/validators/is-array.validator';
import { Stranger } from '../../services/conversation/enums/stranger.enum';
import { IMessageSubmitPayload } from './message-submit-payload.interface';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageFormComponent implements OnInit {
  readonly Stranger = Stranger;

  @Input() isDisabled: boolean;

  @Output() messageSubmit = new EventEmitter<IMessageSubmitPayload>();
  @Output() conversationEnd = new EventEmitter<void>();

  form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.setInitialFormState();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      messageContent: [null, Validators.required],
      messageReceivers: [null, [Validators.required, Validators.minLength(1), isArrayValidator]]
    });
  }

  private setInitialFormState(): void {
    this.form.patchValue({ messageReceivers: [] });
  }

  @HostListener('document:keyup.alt.f1')
  toggleFirstStranger(): void {
    this.toggleMessageReceiver(Stranger.first);
  }

  @HostListener('document:keyup.alt.f2')
  toggleSecondStranger(): void {
    this.toggleMessageReceiver(Stranger.second);
  }

  private toggleMessageReceiver(messageReceiver: Stranger): void {
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
}
