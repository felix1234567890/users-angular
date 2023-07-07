import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
const countryCodes = {
  "Netherlands": "NL",
  "Ireland": "IE",
  "Iran": "IR",
  "Brazil": "BR",
  "Switzerland": "CH",
  "Denmark": "DK",
  "France": "FR",
  "Spain": "ES",
  "Australia": "AU",
  "Finland": "FI",
  "Germany": "DE",
  "Turkey": "TR",
  "New Zealand": "NZ",
  "Canada": "CA",
  "United Kingdom": "GB",
  "United States": "US",
  "Norway":"NO"
}

@Directive({
  selector: '[appAddFlag]',
  standalone: true
})
export class AddFlagDirective implements OnInit {
  @Input() country!: string | undefined

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if(!this.country) return
    const imageUrl = `https://flagsapi.com/${countryCodes[this.country as keyof typeof countryCodes]}/flat/24.png`;
    const imgElement = this.renderer.createElement('img');
    this.renderer.setAttribute(imgElement, 'src', imageUrl);
    this.renderer.addClass(this.elementRef.nativeElement, 'flag')
    this.renderer.setStyle(imgElement, 'margin-left', "0.5rem")
    this.renderer.appendChild(this.elementRef.nativeElement, imgElement);
  }
}
