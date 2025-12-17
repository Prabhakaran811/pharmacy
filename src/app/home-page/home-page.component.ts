import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  intervalId!: any;

  slides = [
    {
      image: 'assets/slide1.jpg',
      title: 'Trusted Veterinary Wholesale Supplier',
      desc: 'Licensed veterinary medicines at competitive wholesale prices'
    },
    {
      image: 'assets/slide2.jpg',
      title: 'Quality Medicines, Fast Delivery',
      desc: 'Same-day dispatch and WhatsApp ordering support'
    },
    {
      image: 'assets/slide3.jpg',
      title: 'Serving Clinics & Farms',
      desc: 'Reliable pharmaceutical partner across Tamil Nadu'
    }
  ];

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000); // 5 seconds
  }

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.slides.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  ngAfterViewInit(): void {

    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.section-badge, h2, .desc', {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.facility-container',
        start: 'top 80%'
      }
    });

    gsap.from('.central-image, .feature-item, .mobile-features .card', {
      scale: 0.8,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.facility',
        start: 'top 85%'
      }
    });

    gsap.from('.cta-btn', {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: '.cta-btn',
        start: 'top 90%'
      }
    });

  }
}
