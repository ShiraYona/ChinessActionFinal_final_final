import { Component, OnInit } from '@angular/core';
import { Donor } from '../../models/donor.model';
import { DonorsService } from '../../services/donors.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-donors-list',
  templateUrl: './donors-list.component.html',
  styleUrls: ['./donors-list.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class DonorsListComponent implements OnInit{
  
  donorDialog: boolean = false;

  donors: Donor[] = [];

  donor: Donor = new Donor();

  selectedDonor!: Donor[];

  submitted!: boolean;

  constructor(public donorsService: DonorsService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.donorsService.reloadDonors$.subscribe(x => {
        this.donorsService.getDonors().subscribe(data => this.donors = data);
        console.log(this.donors);
        
    });
  }

  openNew() {
    this.donor = new Donor();
    this.submitted = false;
    this.donorDialog = true;
  }
  
  deleteDonor(donor: Donor) {
    let id=donor.id;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + donor.name + '?',
       header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.donors = this.donors.filter(val => val.id !== donor.id);
        // this.donorsService.deleteDonor(id).subscribe();
        this.donor = new Donor();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Deleted', life: 3000 });
       }
    });
    // this.giftService.delete(gift.id);????????????
   }


  editDonor(donor: Donor) {
    this.donor = { ...donor };
    this.donorDialog = true;
  }
  

}
