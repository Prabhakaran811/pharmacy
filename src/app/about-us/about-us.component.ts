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


  doctor = {
  name: 'Dr. Sarah Chen, PharmD',
  title: 'Doctor of Pharmacy | Board Certified Pharmacist',
  image:
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
  badge: 'Medical Director',
  experience: 15,

  description: `
    With over 15 years of clinical experience, Dr. Chen leads our pharmacy
    team with unwavering dedication to patient care.
  `,

  details: [
    {
      icon: 'fas fa-graduation-cap',
      title: 'Education',
      text: `
        • Doctor of Pharmacy, Harvard University<br>
        • Residency: Johns Hopkins Hospital<br>
        • Fellowship: Clinical Pharmacology
      `
    },
    {
      icon: 'fas fa-stethoscope',
      title: 'Expertise',
      text: `
        • Medication Therapy Management<br>
        • Chronic Disease Management<br>
        • Geriatric Care
      `
    },
    {
      icon: 'fas fa-handshake',
      title: 'Philosophy',
      text: `
        "Every patient deserves personalized care."
      `
    }
  ],

  specializations: [
    { icon: 'fas fa-heartbeat', label: 'Cardiovascular Health' },
    { icon: 'fas fa-brain', label: 'Neurology' },
    { icon: 'fas fa-lungs', label: 'Respiratory Care' },
    { icon: 'fas fa-capsules', label: 'Polypharmacy Management' }
  ]
};


  
  services = [
  {
    id: 1,
    title: 'Medication Management',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
    text: 'Our expert pharmacists provide comprehensive medication therapy management...',
    features: ['Medication Reviews', 'Interaction Checks', 'Personalized Plans']
  },
  {
    id: 2,
    title: 'Immunization Services',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88',
    text: 'Stay protected with our comprehensive immunization services...',
    features: ['Flu Vaccines', 'Travel Vaccines', 'Routine Immunizations']
  },
  {
    id: 3,
    title: 'Health Screenings',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118',
    text: 'Early detection saves lives with regular health screenings...',
    features: ['Blood Pressure', 'Cholesterol', 'Diabetes']
  }
];



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



  nextSlide() {
  this.currentSlide =
    (this.currentSlide + 1) % this.services.length;
}

prevSlide() {
  this.currentSlide =
    (this.currentSlide - 1 + this.services.length) %
    this.services.length;
}

goToSlide(index: number) {
  this.currentSlide = index;
}


scheduleConsultation() {
  alert(
    'Available slots:\nMon–Fri: 9am–5pm\nSat: 10am–2pm\nCall (555) 123-HEALTH'
  );
}

contactDoctor() {
  const msg = prompt('Enter your message for Dr. Chen');
  if (msg) {
    alert('Message sent successfully!');
  }
}

}