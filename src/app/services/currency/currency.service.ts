import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { CurrencyExchangeRateInterface } from '../../interfaces/CurrencyExchangeRateInterface'

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    private apiUrl =
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

    constructor(private http: HttpClient) {}

    getCurrencies(): Observable<CurrencyExchangeRateInterface[]> {
        return this.http.get<CurrencyExchangeRateInterface[]>(this.apiUrl)
    }
}
