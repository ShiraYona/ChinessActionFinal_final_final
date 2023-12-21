
import { Donor } from '../../models/donor.model';
import { DonorsService } from '../../services/donors.service';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-donor-edit',
  templateUrl: './donor-edit.component.html',
  styleUrls: ['./donor-edit.component.css']
})
export class DonorEditComponent implements OnChanges {
  @Input()
  donorId: number = 0;

  constructor(private donorsService: DonorsService, private messageService: MessageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.donorId>0){
          this.donorsService.getDonorById(this.donorId).subscribe(d=> this.donor = d);

    }
  }

  donor: Donor = new Donor();
  
  submitted: boolean = false;
  @Input()
  donorDialog: boolean = true;
  @Output()
  donorDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  hideDialog() {
    this.donorDialog = false;
    this.donorDialogChange.emit(this.donorDialog);
    this.submitted = false;
  }
  saveDonor() {
    this.submitted = true;
    if (this.donor.name.trim()) {
      if (this.donor.id) {//אם יש לו אי די אז שולחים אותו לעדכון
        this.donorsService.saveDonor(this.donor).subscribe(b => {
          this.donorsService.setReloadDonor();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donor Updated', life: 3000 });
          
        });
      }
      else {//אחרת שולחים להוספה
        this.donor.id=-1;
        this.donorsService.addDonor(this.donor).subscribe(a => {
          this.donorsService.setReloadDonor();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donor Created', life: 3000 });
        });
      this.donorsService.getDonors();
      }

      this.donorDialogChange.emit(this.donorDialog);
      this.donor = new Donor();
      this.donorId=0;
    }  this.hideDialog();
}
}
