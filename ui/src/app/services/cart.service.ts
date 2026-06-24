import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  addToCart(theCartItem: CartItem) {
    const existingCartItem = this.cartItems.find(
      (item) => item.id === theCartItem.id,
    );
    const alreadyExistsInCart = existingCartItem !== undefined;

    if (alreadyExistsInCart) {
      // Increment the quantity
      existingCartItem!.quantity++;
    } else {
      // Add the new item to the cart
      this.cartItems.push(theCartItem);
    }

    // Update the total price and quantity
    this.updateCartTotals();
  }

  updateCartTotals() {
    let totalQuantity = 0;
    let totalPrice = 0;

    for (const item of this.cartItems) {
      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.unitPrice;
    }

    this.totalQuantity.next(totalQuantity);
    this.totalPrice.next(totalPrice);
  }

  logCartData() {
    console.log('Contents of the cart:');
    for (const item of this.cartItems) {
      console.log(item);
    }
    console.log(`Total Quantity: ${this.totalQuantity}`);
    console.log(`Total Price: ${this.totalPrice}`);
  }
}
