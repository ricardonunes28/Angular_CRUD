import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { delay, tap } from 'rxjs/operators';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  readonly url = 'http://localhost:3000/produtos'

  private produtoSubject$: BehaviorSubject<Produto[]> = new BehaviorSubject<Produto[]>(null)

  private carregando: boolean = false;


  constructor(private http: HttpClient) { }

  get(): Observable<Produto[]>{
    if(!this.carregando){
      this.http.get<Produto[]>(this.url)
      .pipe(
        tap((prods)=> console.log(prods)), 
        delay(1000)
      )
      .subscribe(this.produtoSubject$);
      this.carregando = true;
    }
    return this.produtoSubject$.asObservable();
  }

  add(p: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.url, p)
    .pipe(
      tap((prod: Produto)=> this.produtoSubject$.getValue().push(prod))
    )
  }

  del(prod: Produto): Observable<any> {
    return this.http.delete(`${this.url}/${prod._id}`)
    .pipe(
      tap(()=>{
        let produtos = this.produtoSubject$.getValue();
        let i = produtos.findIndex(p => p._id === prod._id);
        if(i>=0)
          produtos.splice(i,1)
      })
    )
  }

  update(prod: Produto): Observable<Produto>{
    return this.http.patch<Produto>(`${this.url}/${prod._id}`, prod) // patch - correção
    .pipe(
      tap((p)=>{
        let produtos = this.produtoSubject$.getValue();
        let i = produtos.findIndex(p => p._id === prod._id);
        if(i>=0)
        produtos[i].name = p.name;
      })
    )
    }







}
  









