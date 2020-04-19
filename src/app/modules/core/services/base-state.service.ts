import { BehaviorSubject, Observable } from 'rxjs';

export abstract class BaseStateService<T> {
  readonly state$: Observable<T>;

  // tslint:disable-next-line:variable-name
  private readonly _state: BehaviorSubject<T>;

  get state(): T {
    return this._state.value;
  }

  constructor(initialState: T) {
    this._state = new BehaviorSubject<T>(initialState);
    this.state$ = this._state.asObservable();
  }

  protected setState(state: Partial<T>): void {
    this._state.next({ ...this._state.value, ...state });
  }
}
