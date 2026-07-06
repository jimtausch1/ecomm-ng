import { Component, Input } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ValidationMessages } from './validation-messages';

@Component({
  selector: 'app-control-errors',
  standalone: false,
  templateUrl: './control-errors.component.html',
  styleUrl: './control-errors.component.css',
})
export class ControlErrorsComponent {
  @Input() controlName: string = '';
  control: AbstractControl | null = null;

  private destroy$ = new Subject<void>();
  errorMessage: string = '';

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.control = this.controlContainer.control?.get(this.controlName) || null;

    this.control?.events?.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setErrorMessage();
    });
  }

  setErrorMessage(): void {
    if (
      this.control &&
      this.control.errors &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty)
    ) {
      const errors = this.control.errors;
      if (errors) {
        const firstErrorKey = Object.keys(errors)[0];
        const firstErrorValue = errors[firstErrorKey];

        const messageFn = ValidationMessages[firstErrorKey];
        this.errorMessage = messageFn
          ? messageFn(firstErrorValue)
          : 'Invalid input.';
      }
    } else {
      this.errorMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
