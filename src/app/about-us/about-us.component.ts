import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
  HostListener, OnInit, OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: false,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements AfterViewInit, OnInit, OnDestroy {

  testimonials = [
    {
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      text: 'MediCare Pharmacy saved me during a difficult time. Their pharmacists took the time to explain my medications and even helped me find discount programs.',
      author: 'James Wilson'
    },
    {
      img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786',
      text: 'As a senior with multiple prescriptions, I appreciate how MediCare coordinates all my medications and delivers them to my home.',
      author: 'Margaret Thompson'
    },
    {
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      text: 'The wellness classes at MediCare have transformed my health. This is more than a pharmacy!',
      author: 'Robert Chen'
    }
  ];


  @ViewChild('animatedTitle') animatedTitle!: ElementRef;
  @ViewChild('animatedSubtitle') animatedSubtitle!: ElementRef;

  @ViewChildren('animateItem') animateItems!: QueryList<ElementRef>;

  pills = Array(4);
  
  stats = [
    { label: 'Years of Service', target: 25, value: 0 },
    { label: 'Happy Customers', target: 50000, value: 0 },
    { label: 'Expert Staff', target: 15, value: 0 }
  ];



  currentSlide = 0;
  intervalId!: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  next() {
    this.currentSlide =
      (this.currentSlide + 1) % this.testimonials.length;
  }

  prev() {
    this.currentSlide =
      (this.currentSlide - 1 + this.testimonials.length) %
      this.testimonials.length;
  }

  goTo(index: number) {
    this.currentSlide = index;
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000);
  }

  ngAfterViewInit(): void {
    this.animateHero();
    this.animateCounters();
    this.checkScroll();
  }

private animateHero() {
  setTimeout(() => {
    this.animatedTitle.nativeElement.style.opacity = '1';
    this.animatedTitle.nativeElement.style.transform = 'translateY(0)';
  }, 300);

  setTimeout(() => {
    this.animatedSubtitle.nativeElement.style.opacity = '1';
    this.animatedSubtitle.nativeElement.style.transform = 'translateY(0)';
  }, 800);

  // 🔥 FIX FOR STATS VISIBILITY
  setTimeout(() => {
    this.animateItems.forEach(el => {
      el.nativeElement.classList.add('visible');
    });
  }, 1200);
}


  /* 🔢 COUNTER ANIMATION */
  private animateCounters() {
  this.stats.forEach(stat => {
    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      stat.value = Math.floor(progress * stat.target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        stat.value = stat.target; // exact final value
      }
    };

    requestAnimationFrame(animate);
  });
}


  /* 👀 SCROLL ANIMATION */
  @HostListener('window:scroll')
  checkScroll() {
    this.animateItems.forEach(el => {
      const rect = el.nativeElement.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        el.nativeElement.classList.add('visible');
      }
    });
  }
}