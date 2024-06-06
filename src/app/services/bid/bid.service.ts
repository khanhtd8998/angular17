import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BidForm } from '../../interfaces/Bid';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  // API = "https://nodejs-project-8998.vercel.app/categories"
  API = "http://localhost:8000/bids"
  http = inject(HttpClient)
  constructor() { }
  createBid(data: BidForm) {
    return this.http.post<BidForm>(this.API, data)
  }

}
