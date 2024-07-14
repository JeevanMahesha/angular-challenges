import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  templateUrl: 'city-card.component.html',
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);
  city = toSignal(
    this.http.fetchCities$.pipe(
      tap(this.store.addAll.bind(this.store)),
      switchMap(() => this.store.cities$),
    ),
  );
  cardType = CardType.CITY;
}
