import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule, DecimalPipe } from '@angular/common'

import { CurrencyExchangeRateInterface } from '../../interfaces/CurrencyExchangeRateInterface'

import { CurrencyService } from '../../services/currency/currency.service'

@Component({
    selector: 'app-currency-converter',
    templateUrl: './currency-converter.component.html',
    imports: [FormsModule, DecimalPipe, CommonModule],
    standalone: true,
    styleUrls: ['./currency-converter.component.scss']
})

export class CurrencyConverterComponent implements OnInit {
    currencies: CurrencyExchangeRateInterface[] = []
    fromCurrency: string = ''
    toCurrency: string = ''
    amount1: number = 1
    amount2: number = 1
    errorMessage: string | null = null

    constructor(private currencyService: CurrencyService) {}

    ngOnInit() {
        this.currencyService.getCurrencies().subscribe(data => {
            this.currencies = data

            const uahCurrency = { cc: 'UAH', txt: 'Українська гривня', rate: 1 }

            if (!this.currencies.find(currency => currency.cc === 'UAH')) {
                this.currencies.push(uahCurrency)
            }

            this.fromCurrency = this.currencies[0].cc
            this.toCurrency = this.currencies[1].cc
            this.convert('amount1')
        })
    }

    convert(source: string) {
        if (
            (this.amount1 === 0 && source === 'amount1') ||
            (this.amount2 === 0 && source === 'amount2')
        ) {
            this.errorMessage = 'Сума не може бути рівною 0'
            return
        } else {
            this.errorMessage = null
        }

        const fromRate =
            this.currencies.find(currency => currency.cc === this.fromCurrency)
                ?.rate || 1
        const toRate =
            this.currencies.find(currency => currency.cc === this.toCurrency)
                ?.rate || 1

        if (source === 'amount1') {
            this.amount2 = (this.amount1 * fromRate) / toRate
        } else {
            this.amount1 = (this.amount2 * toRate) / fromRate
        }
    }

    swapCurrencies() {
        ;[this.fromCurrency, this.toCurrency] = [
            this.toCurrency,
            this.fromCurrency
        ]
        this.convert('amount1')
    }

    onlyNumbers(event: KeyboardEvent) {
        const pattern = /^(\d+(\.\d{0,10})?)?$/
        const currentInput =
            (event.target as HTMLInputElement).value + event.key

        if (
            !pattern.test(currentInput) ||
            (event.key === '.' &&
                (event.target as HTMLInputElement).value.includes('.'))
        ) {
            event.preventDefault()
        }
    }
}
