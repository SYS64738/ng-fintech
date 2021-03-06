import {Directive, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: 'div[resizable]'
})
export class ResizableDirective implements OnInit {

  @Input() offset: number = 115;

  @HostBinding('style.height.px') height: number | undefined;
  @HostBinding('style.margin') margin: string = 'auto';
  @HostBinding('style.width') width: string = '100%';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = event.target.innerHeight - this.offset;
    // console.log('resize', this.height);
  }

  ngOnInit(): void {
    this.height = window.innerHeight - this.offset;
    // console.log('init', this.height);
  }

}
