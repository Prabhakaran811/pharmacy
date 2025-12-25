import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent} from './about-us/about-us.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactAsComponent } from './contact-as/contact-as.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactAsComponent },

  { path: '**', redirectTo: 'home' } // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
