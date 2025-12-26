import {
  Component,
  AfterViewInit,
  OnInit,
  ViewChild
} from '@angular/core';
@Component({
  selector: 'app-contact-as',
  standalone: false,
  templateUrl: './contact-as.component.html',
  styleUrl: './contact-as.component.scss'
})
export class ContactAsComponent implements OnInit, AfterViewInit {

  phone = '(555) 123-HEALTH';
  whatsapp = '15551234567';
  email = 'info@medicarepharmacy.com';

  ngOnInit() {
    // this.updateStatus();
    // this.createParticles();
  }

  ngAfterViewInit() {
  }

  makeCall() {
    alert(`Calling ${this.phone}`);
    // window.location.href = `tel:${this.phone}`;
  }

  openWhatsApp() {
    const msg = encodeURIComponent('Hello MediCare Pharmacy!');
    window.open(`https://wa.me/${this.whatsapp}?text=${msg}`, '_blank');
  }

  sendEmail() {
    window.location.href =
      `mailto:${this.email}?subject=Inquiry&body=Hello MediCare Team`;
  }

  scrollToForm() {
    document.getElementById('contactForm')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
