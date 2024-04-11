import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Products:any=[]

  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.AllProducts()
  }

  AllProducts = () => {
    this.api.getProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.Products = res;
        // Initialize quantity and total properties for each product
        this.Products.forEach((product: { quantity: number; }) => {
          product.quantity = 1; // Set default quantity to 1
          this.calculateTotal(product); // Calculate total for each product
        });
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  incrementQuantity(product: any) {
    product.quantity++;
    this.calculateTotal(product);
  }

  decrementQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      this.calculateTotal(product);
    }
  }

  calculateTotal(product: any) {
    // Calculate the total price based on quantity and M.R.P
    product.total = product.quantity * product.MRP;
  }

  calculateSubtotal() {
    return this.Products.reduce((acc: any, curr: { total: any; }) => acc + curr.total, 0);
  }

  calculateTotalWithShipping() {
    return this.calculateSubtotal() + 40; // Assuming fixed shipping cost
  }

}
