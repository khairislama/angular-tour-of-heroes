import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent {
  hero?: Hero;
  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) {}

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero: Hero) => this.hero = hero);
  }

  ngOnInit() {
    this.getHero();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void{
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(()=> this.goBack())
    }
  }
  
}
