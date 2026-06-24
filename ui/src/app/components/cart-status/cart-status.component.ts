import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  standalone: false,
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css',
})
export class CartStatusComponent {
  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.totalPrice.subscribe(
      (data: number) => (this.totalPrice = data),
    );
    this.cartService.totalQuantity.subscribe(
      (data: number) => (this.totalQuantity = data),
    );
  }
}
