import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  prodName: string = '';
  produtos: Produto[] = [];
  prodEdit: Produto = null;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private produtoService: ProdutoService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.produtoService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((prods) => this.produtos = prods)
  }

  save() {
    if (this.prodEdit) {
      this.produtoService.update(
        { name: this.prodName, _id: this.prodEdit._id}
      ).subscribe(
        (prod) => {
          this.notify('UPDATED')
        },
        (err) => {
          this.notify('ERROR');
          console.error(err)
        }
      )
    }
    else {
      if (this.prodName.length == 0) {
        this.cancel();
      }
      else {
        this.produtoService.add({ name: this.prodName })
          .subscribe(
            (prod) => {
              console.log(prod);
              this.notify('INSERTED!');
            },
            (err) => {
              console.error(err);
            }
          )
      }
    }
    this.clearFields();
  }

  edit(prod: Produto) {
    this.prodName = prod.name;
    this.prodEdit = prod;
  }

  delete(prod: Produto) {
    this.produtoService.del(prod)
      .subscribe(
        () => this.notify('REMOVED!'),
        (err) => this.notify(err.error.msg)
      )
  }

  clearFields() {
    this.prodName = '';
    this.prodEdit = null;
  }

  cancel() {
    this.clearFields();
  }

  notify(msg: string) {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }


}
