import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from "@angular/core";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'ng-highcharts',
  template: `
    <div #host></div>
  `
})
export class HighchartsComponent implements OnInit, OnChanges {

  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;
  @Input() title: string | null = null;
  @Input() type: any;
  @Input() seriesName: string | null = null;
  @Input() categories: string[] = [];
  @Input() data: number[] = [];

  ngOnInit() {

    // workaround per far si che il grafico venga renderizzata a dovere...
    // TODO: sarebbe da capire come evitare sta roba...
    setTimeout(() => window.dispatchEvent(new Event('resize')), 200);

  }

  ngOnChanges() {

    const options: Highcharts.Options = {
      title: {
        text: this.title!
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: this.categories
      },
      yAxis: {
        title: {
          text: this.seriesName
        }
      },
      series: [
        {
          name: this.seriesName!,
          type: this.type,
          data: this.data
        }
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }
        ]
      }
    };
    Highcharts.chart(this.host.nativeElement, options);

  }

}
