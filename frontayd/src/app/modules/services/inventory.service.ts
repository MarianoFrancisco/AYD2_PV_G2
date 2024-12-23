import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory, CapitalTotal } from '../../interfaces/inventory';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private readonly API_URL = 'http://localhost:5000/api/inventory';

  constructor(private http: HttpClient) {}

  getCapitalTotal(): Observable<CapitalTotal> {
    return this.http.get<CapitalTotal>(`${this.API_URL}/capital-total`);
  }

  getEntriesAndExits(): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.API_URL}/entradas-salidas`);
  }

}
