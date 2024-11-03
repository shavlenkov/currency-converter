import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CurrencyConverterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent {}
