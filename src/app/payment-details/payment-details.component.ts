import { Component,OnInit } from '@angular/core';
import { PaymentDetailFormComponent } from "./payment-detail-form/payment-detail-form.component";
import { PaymentDetailService } from '../shared/payment-detail.service';
import { NgFor } from '@angular/common';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [PaymentDetailFormComponent,NgFor],
  templateUrl: './payment-details.component.html',
  styles: ``
})
export class PaymentDetailsComponent implements OnInit{

  constructor(public service: PaymentDetailService, private toastr: ToastrService){ }
  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectorRecord:PaymentDetail){
    this.service.formData = Object.assign({},selectorRecord); //* kopyasını olulturup formData ya atıyor.
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete this record')){
      this.service.deletePaymentDetail(id)
    .subscribe({
      next:res=>{
        this.service.list = res as PaymentDetail[]; 
        this.toastr.error('Delete successfully' , 'Payment Detail Register')
        
      },
      error:err=>{console.log(err)}
    })
    }
    
  }

}
