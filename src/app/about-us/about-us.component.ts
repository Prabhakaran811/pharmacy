import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: false,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements AfterViewInit {

  @ViewChild('hero') hero!: ElementRef<HTMLElement>;

  @ViewChildren('section') sections!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('image') images!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    // Initial check (page load)
    setTimeout(() => {
      this.handleScroll();
    }, 100);
  }

  /* 🔹 Listen to window scroll */
  @HostListener('window:scroll')
  handleScroll(): void {

    // HERO
    if (this.hero && this.isInViewport(this.hero.nativeElement, 150)) {
      this.hero.nativeElement.classList.add('visible');
    }

    // SECTIONS
    this.sections.forEach(section => {
      if (this.isInViewport(section.nativeElement, 150)) {
        section.nativeElement.classList.add('visible');
      }
    });

    // IMAGES
    this.images.forEach(img => {
      if (this.isInViewport(img.nativeElement, 150)) {
        img.nativeElement.classList.add('visible');
      }
    });
  }

  /* 🔹 Viewport checker */
  private isInViewport(element: HTMLElement, offset = 100): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight - offset &&
      rect.bottom >= 0
    );
  }
}
