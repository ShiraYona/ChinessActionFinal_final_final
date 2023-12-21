import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GiftsService } from '../../services/gifts.service';
import { Gift } from '../../models/gift.model';
import { Donor } from '../../models/donor.model';
import { DonorsService } from '../../services/donors.service';

@Component({
  selector: 'app-gift-edit',
  templateUrl: './gift-edit.component.html',
  styleUrls: ['./gift-edit.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class GiftEditComponent implements OnChanges {
  @Input()
  giftId: number = 0;

  constructor(private giftService: GiftsService,private donorsService: DonorsService, private messageService: MessageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.giftId>0){
      this.giftService.getGiftById(this.giftId).subscribe(gift => this.gift = gift);
    }
    this.donorsService.getDonors().subscribe(don=>this.donors=don)
  }

  gift: Gift = new Gift();
  donors:Donor[]=[];
  submitted: boolean = false;
  @Input()
  giftDialog: boolean = true;
  @Output()
  giftDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();



  hideDialog() {
    this.giftDialog = false;
    this.giftDialogChange.emit(this.giftDialog);
    this.submitted = false;
  }
  saveGift() {
    this.submitted = true;
    if (this.gift.name.trim()) {
      if (this.gift.id) {//אם יש לו אי די אז שולחים אותו לעדכון
        this.giftService.saveGift(this.gift).subscribe(b => {
          this.giftService.setReloadGift();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Updated', life: 3000 });
          
        });
      }
      else {//אחרת שולחים להוספה
        this.gift.id=-1
        this.giftService.addGift(this.gift).subscribe(a => {
          this.giftService.setReloadGift();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Created', life: 3000 });
        });
      this.giftService.getGifts();
      }

      this.giftDialogChange.emit(this.giftDialog);
      this.giftId=0;
      this.gift = new Gift();
    }  this.hideDialog();
  }


}
