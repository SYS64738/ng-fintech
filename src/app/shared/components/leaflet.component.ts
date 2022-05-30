import {ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges,
  ViewChild
} from "@angular/core";
import * as L from 'leaflet';

@Component({
  selector: 'ng-leaflet',
  template: `
    <div #host style="width: 100%" [style.height.px]="height" (window:resize)="onResize()"></div>
  `
})
export class LeafletComponent implements OnChanges {

  @ViewChild('host', {static: true}) host!: ElementRef<HTMLDivElement>;

  @Input() location: string | null = null;
  @Input() coords: number[] | null = null;
  @Input() zoom: number = 17;
  @Input() height: number = 300;

  map!: L.Map;
  marker!: L.Marker;
  popup!: L.Popup;

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['coords'] && changes['coords'].firstChange) {

      const coords: L.LatLngExpression = this.coords as L.LatLngExpression;
      this.map = L.map(this.host.nativeElement).setView(coords, this.zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(this.map);

      this.popup = L.popup({
        closeButton: false,
        closeOnClick: false,
        closeOnEscapeKey: false,
        autoClose: false
      });

      this.marker = L.marker(coords)
        .addTo(this.map)
        .bindPopup(this.popup)
        .openPopup();

    }

    if (changes['coords'] && !changes['coords'].firstChange) {
      const coords: L.LatLngExpression = this.coords as L.LatLngExpression;
      this.map.setView(coords);
      this.marker.setLatLng(coords);
    }

    if (changes['location']) {
      // workaround per far si che il popup venga posizionato a dovere...
      const offsetX = changes['location'].firstChange ? -49 : 0;
      this.popup.options.offset = [offsetX, -5];
      this.popup.setContent(this.location ? this.location : '');
    }

    if (changes['zoom']) {
      this.map.setZoom(changes['zoom'].currentValue);
    }

    // workaround per far si che la mappa venga renderizzata a dovere (cfr. onResize)...
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);

  }

  onResize() {
    this.map.invalidateSize();
  }

}
