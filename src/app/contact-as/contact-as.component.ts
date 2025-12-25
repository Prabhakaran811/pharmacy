import {
  Component,
  AfterViewInit,
  HostListener,
  ElementRef,
  ViewChild
} from '@angular/core';
@Component({
  selector: 'app-contact-as',
  standalone: false,
  templateUrl: './contact-as.component.html',
  styleUrl: './contact-as.component.scss'
})
export class ContactAsComponent implements AfterViewInit {

  @ViewChild('hero', { static: true }) hero!: ElementRef;
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef;
  @ViewChild('interiorImg', { static: true }) interiorImg!: ElementRef;

  ngAfterViewInit(): void {
    this.initParticles();
    this.handleScroll();
  }

  /* 🔹 Desktop-only particles */
  private initParticles(): void {
    if (window.innerWidth <= 768) return;

    for (let i = 0; i < 15; i++) {
      setTimeout(() => this.createParticle(), i * 1200);
    }
  }

  private createParticle(): void {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${Math.random() * 20 + 15}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;

    this.hero.nativeElement.appendChild(particle);

    setTimeout(() => particle.remove(), 35000);
  }

@HostListener('window:scroll')
handleScroll(): void {

  if (this.contactSection &&
      this.isInViewport(this.contactSection.nativeElement)) {
    this.contactSection.nativeElement.classList.add('visible');
  }

  if (this.interiorImg &&
      this.isInViewport(this.interiorImg.nativeElement)) {
    this.interiorImg.nativeElement.classList.add('visible');
  }
}

  private isInViewport(element: HTMLElement, offset = 100): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight - offset &&
      rect.bottom >= 0
    );
  }
}