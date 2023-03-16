import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient, private messageService : MessageService) { }

  getHeroes(): Observable<Hero[]> {
    //const heroes = of(HEROES)
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')), 
      catchError(this.handleError<Hero[]>('getHeroes', []))
      )
    //this.messageService.add('HeroService: fetched heroes')
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // getHero(id: number): Observable<Hero> {
  //   const hero = HEROES.find(h => h.id === id)!;
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(hero);
  // }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // * important handle errors function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      //TODO: send better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      //Let the app keep running by returning an empty result
      return of(result as T);
    }
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
