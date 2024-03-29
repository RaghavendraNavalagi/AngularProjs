import { Component,OnInit ,OnDestroy} from '@angular/core';
import { DataService } from '../data.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Product } from '../product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  //public products:any[]=[];
  public products: Product[]=[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data:any[])=>{
    //   console.log(data);
    //   this.products = data;
    // });
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>)=>{
      console.log(res);
      this.products = res.body as Product[];
    });
    }
    public firstPage() {
      this.products = [];
      this.dataService.sendGetRequestToUrl(this.dataService.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
        console.log(res);
        this.products = res.body as Product[];
      })
    }
    public previousPage(){

      if (this.dataService.prev !== undefined && this.dataService.prev !== '') {
        this.products = [];
        this.dataService.sendGetRequestToUrl(this.dataService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
          console.log(res);
          this.products = res.body as Product[];
        })
      }
  
    }
    public nextPage() {
      if (this.dataService.next !== undefined && this.dataService.next !== '') {
        this.products = [];
        this.dataService.sendGetRequestToUrl(this.dataService.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
          console.log(res);
          this.products = res.body as Product[];
        })
      }
    }
    public lastPage() {
      this.products = [];
      this.dataService.sendGetRequestToUrl(this.dataService.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }
    ngOnDestroy() {
      this.destroy$.next(true);
      // Unsubscribe from the subject
      this.destroy$.unsubscribe();
    }
}
