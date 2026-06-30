import { Component } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
})
export class CartDetailsComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.listCartDetails();
  }

  private listCartDetails(): void {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      (data: number) => (this.totalPrice = data),
    );
    this.cartService.totalQuantity.subscribe(
      (data: number) => (this.totalQuantity = data),
    );
    this.cartService.updateCartTotals();
  }

  increment(cartItem: CartItem): void {
    this.cartService.addToCart(cartItem);
  }

  decrement(cartItem: CartItem): void {
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem);
  }
}
