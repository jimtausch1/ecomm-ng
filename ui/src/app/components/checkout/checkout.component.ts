import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { CartService } from '../../services/cart.service';
import { ShopformService } from '../../services/shopform.service';
import { ShopValidators } from '../../validators/shop-validators';

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
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.notOnlyWhitespace,
          ],
        }),
        lastName: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.notOnlyWhitespace,
          ],
        }),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
        }),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.notOnlyWhitespace,
          ],
        }),
        city: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.notOnlyWhitespace,
          ],
        }),
        state: new FormControl('', { validators: [Validators.required] }),
        country: new FormControl('', { validators: [Validators.required] }),
        zipCode: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(10),
            ShopValidators.notOnlyWhitespace,
          ],
        }),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.notOnlyWhitespace,
          ],
        }),
        city: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.notOnlyWhitespace,
          ],
        }),
        state: new FormControl('', { validators: [Validators.required] }),
        country: new FormControl('', { validators: [Validators.required] }),
        zipCode: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(10),
            ShopValidators.notOnlyWhitespace,
          ],
        }),
      }),
      creditCard: this.formBuilder.group({
        cvv: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4),
            ShopValidators.notOnlyWhitespace,
          ],
        }),
        cardType: new FormControl('', { validators: [Validators.required] }),
        nameOnCard: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.notOnlyWhitespace,
          ],
        }),
        cardNumber: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern('^[0-9]{13,19}$'),
          ],
        }),
        securityCode: new FormControl('', {
          validators: [Validators.required, Validators.pattern('^[0-9]{3,4}$')],
        }),
        expirationMonth: new FormControl('', {
          validators: [Validators.required],
        }),
        expirationYear: new FormControl('', {
          validators: [Validators.required],
        }),
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

  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe((totalQuantity) => {
      this.totalQuantity = totalQuantity;
    });
    this.cartService.totalPrice.subscribe((totalPrice) => {
      this.totalPrice = totalPrice;
    });
  }

  onSubmit(): void {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup?.value);

    if (this.checkoutFormGroup?.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
  }

  get firstName() {
    return this.checkoutFormGroup?.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup?.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup?.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup?.get('shippingAddress.street');
  }

  get shippingAddressCity() {
    return this.checkoutFormGroup?.get('shippingAddress.city');
  }

  get shippingAddressState() {
    return this.checkoutFormGroup?.get('shippingAddress.state');
  }

  get shippingAddressCountry() {
    return this.checkoutFormGroup?.get('shippingAddress.country');
  }

  get shippingAddressZipCode() {
    return this.checkoutFormGroup?.get('shippingAddress.zipCode');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup?.get('billingAddress.street');
  }

  get billingAddressCity() {
    return this.checkoutFormGroup?.get('billingAddress.city');
  }

  get billingAddressState() {
    return this.checkoutFormGroup?.get('billingAddress.state');
  }

  get billingAddressCountry() {
    return this.checkoutFormGroup?.get('billingAddress.country');
  }

  get billingAddressZipCode() {
    return this.checkoutFormGroup?.get('billingAddress.zipCode');
  }

  get creditCardType() {
    return this.checkoutFormGroup?.get('creditCard.cardType');
  }

  get creditCardNameOnCard() {
    return this.checkoutFormGroup?.get('creditCard.nameOnCard');
  }

  get creditCardNumber() {
    return this.checkoutFormGroup?.get('creditCard.cardNumber');
  }

  get creditCardSecurityCode() {
    return this.checkoutFormGroup?.get('creditCard.securityCode');
  }

  get creditCardExpirationMonth() {
    return this.checkoutFormGroup?.get('creditCard.expirationMonth');
  }

  get creditCardExpirationYear() {
    return this.checkoutFormGroup?.get('creditCard.expirationYear');
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
