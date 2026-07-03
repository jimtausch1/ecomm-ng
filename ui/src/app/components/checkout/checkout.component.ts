import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { ShopformService } from '../../services/shopform.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  checkoutFormGroup: FormGroup | undefined;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Observable<Country[]> = new Observable<Country[]>();
  shippingAddressStates: Observable<State[]> = new Observable<State[]>();
  billingAddressStates: Observable<State[]> = new Observable<State[]>();

  constructor(
    private formBuilder: FormBuilder,
    private shopformService: ShopformService,
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cvv: [''],
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    const startMonth: number = new Date().getMonth() + 1;
    this.shopformService.getCreditCardMonths(startMonth).subscribe((data) => {
      this.creditCardMonths = data;
    });

    this.shopformService.getCreditCardYears().subscribe((data) => {
      this.creditCardYears = data;
    });

    this.countries = this.shopformService.getCountries();
  }

  onSubmit(): void {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup?.value);
  }

  copyShippingToBillingAddress(event: any): void {
    if (event.target.checked) {
      this.checkoutFormGroup
        ?.get('billingAddress')
        ?.setValue(this.checkoutFormGroup?.get('shippingAddress')?.value);

      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup?.get('billingAddress')?.reset();

      this.billingAddressStates = new Observable<State[]>();
    }
  }

  handleMonthsAndYears(): void {
    const creditCardFormGroup = this.checkoutFormGroup?.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear,
    );
    let startMonth: number;
    if (selectedYear === currentYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.shopformService.getCreditCardMonths(startMonth).subscribe((data) => {
      this.creditCardMonths = data;
    });
  }

  getStates(formGroupName: string): void {
    const formGroup = this.checkoutFormGroup?.get(formGroupName);
    const countryCode = formGroup?.value.country;

    if (formGroupName === 'shippingAddress') {
      this.shippingAddressStates = this.shopformService.getStates(countryCode);
    } else if (formGroupName === 'billingAddress') {
      this.billingAddressStates = this.shopformService.getStates(countryCode);
    }

    // formGroup?.get('state')?.setValue(data[0]);
  }
}
