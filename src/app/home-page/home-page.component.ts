import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';


@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  intervalId!: any;

   cards = [
    {
      img: 'https://rwedesignbuild.com/wp-content/uploads/2023/07/01_4451ParliamentPl_FusionVetOrthopedics_2001_1920x1280.jpg',
      title: 'Welcoming Reception',
      desc: 'A serene, light-filled space designed to put pets and owners at ease.'
    },
    {
      img: 'https://static.vecteezy.com/system/resources/previews/070/863/767/non_2x/modern-veterinary-surgery-room-medical-equipment-photo.jpg',
      title: 'Surgery Suite',
      desc: 'Equipped with the latest technology for precise procedures.'
    },
    {
      img: 'https://thumbs.dreamstime.com/b/dog-examined-female-vet-standing-horizontal-38864780.jpg',
      title: 'Consultation Rooms',
      desc: 'Private, cozy spaces for detailed discussions.'
    },
    {
      img: 'https://www.westorangeanimalhospital.com/wp-content/uploads/2019/10/In-House-Pharmacy-2.jpg',
      title: 'In-House Pharmacy',
      desc: 'Premium medications for immediate access.'
    },
    {
      img: 'https://cvmbs.source.colostate.edu/wp-content/uploads/sites/7/2020/04/08096_00019.jpg',
      title: 'Diagnostic Lab',
      desc: 'Fast, accurate diagnostics on-site.'
    },
    {
      img: 'https://www.veterinary-practice.com/wp-content/uploads/2024/10/CP-Veterinary-Practice-1-scaled.jpg',
      title: 'Recovery Ward',
      desc: 'Calm monitored environments for healing.'
    }
  ];

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
        ScrollTrigger.getAll().forEach(t => t.kill());

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

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

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

     const entries = gsap.utils.toArray<HTMLElement>('.timeline-entry');

    entries.forEach((entry) => {

      // MAIN ENTRY ANIMATION
      gsap.to(entry, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: entry,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // IMAGE ANIMATION
      const imageBox = entry.querySelector('.image-box');
      if (imageBox) {
        gsap.from(imageBox, {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: entry,
            start: 'top 80%'
          }
        });
      }

      // CONTENT ANIMATION
      const content = entry.querySelector('.content');
      if (content) {
        gsap.from(content, {
          x: entry.classList.contains('left') ? 50 : -50,
          opacity: 0,
          duration: 1,
          delay: 0.6,
          scrollTrigger: {
            trigger: entry,
            start: 'top 80%'
          }
        });
      }

    });

     this.initParticles();
    this.headerAnimation();
    this.cardAnimations();
    this.cardParallax();

  }

    private initParticles(): void {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';

      container.appendChild(particle);

      gsap.to(particle, {
        y: -window.innerHeight,
        duration: 15 + Math.random() * 10,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 10
      });
    }
  }

  /* ---------------- HEADER ---------------- */
  private headerAnimation(): void {
    gsap.to('.section-title', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.facility-section',
        start: 'top 70%'
      }
    });

    gsap.to('.section-subtitle', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      delay: 0.3,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.facility-section',
        start: 'top 70%'
      }
    });
  }

  /* ---------------- CARDS ---------------- */
  private cardAnimations(): void {
    gsap.utils.toArray<HTMLElement>('.facility-card').forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1.5,
        ease: 'back.out(1.7)',
        delay: i * 0.2,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  /* ---------------- PARALLAX ---------------- */
  private cardParallax(): void {
    if (window.innerWidth <= 768) return;

    gsap.utils.toArray<HTMLElement>('.facility-card').forEach(card => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x - rect.width / 2) / 10;
        const rotateX = (rect.height / 2 - y) / 10;

        gsap.to(card, {
          rotationY: rotateY,
          rotationX: rotateX,
          transformPerspective: 1000,
          ease: 'power2.out',
          duration: 0.6
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
    });
  }


}
