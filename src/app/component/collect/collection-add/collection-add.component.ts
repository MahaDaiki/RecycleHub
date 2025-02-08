import {Component, OnInit} from '@angular/core';
import {addCollect} from '../../../store/collect/collect.actions';
import {CollectStatus} from '../../../model/enum/collectStatus';
import {CollectModel} from '../../../model/collect.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {WasteType} from '../../../model/enum/wasteType';
import {CollectService} from '../../../service/collect.service';
import {Observable} from 'rxjs';
import {selectError} from '../../../store/collect/collect.selectors';

@Component({
  selector: 'app-collection-add',
  standalone: false,

  templateUrl: './collection-add.component.html',
  styleUrl: './collection-add.component.css'
})
export class CollectionAddComponent implements OnInit {
  collectForm: FormGroup;
  errorMessage$: Observable<string | null>;
  wasteTypes = Object.values(WasteType);
  successPopupVisible = false;
  uploadedImages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private collectService: CollectService

  ) {
    this.errorMessage$ = this.store.select(selectError);

    this.collectForm = this.fb.group({
      wasteTypes: [[], Validators.required],
      weight: [null, [Validators.required, Validators.min(1000)]],
      address: ['', Validators.required],
      collectionDate: ['', Validators.required],
      time: ['', Validators.required],
      notes: [''],
      images: [[]],
    });
  }

  ngOnInit(): void {}

  // Method to handle checkbox changes
  onWasteTypeChange(event: any) {
    const selectedWasteTypes = this.collectForm.get('wasteTypes')?.value || [];
    if (event.target.checked) {
      selectedWasteTypes.push(event.target.value);
    } else {
      const index = selectedWasteTypes.indexOf(event.target.value);
      if (index !== -1) {
        selectedWasteTypes.splice(index, 1);
      }
    }
    this.collectForm.get('wasteTypes')?.setValue(selectedWasteTypes);
  }

  isChecked(wasteType: string): boolean {
    const wasteTypes = this.collectForm.get('wasteTypes')?.value || [];
    return wasteTypes.includes(wasteType);
  }

  onSubmit() {
    if (this.collectForm.valid) {
      const formValue = this.collectForm.value;
      const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

      if (!user?.id) {
        alert('User is not logged in');
        return;
      }

      const newCollect = new CollectModel(
        0,
        user.id,
        formValue.wasteTypes,
        formValue.weight,
        formValue.address,
        new Date(formValue.collectionDate),
        formValue.time,
        formValue.notes,
        CollectStatus.PENDING
      );

      this.collectService.addCollect(newCollect);

      this.successPopupVisible = true;

      this.collectForm.reset();
    } else {
      alert('Please fill in all required fields with valid data.');
    }
  }

  closeSuccessPopup() {
    this.successPopupVisible = false;
  }
  onImageUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.uploadedImages = [];
      Array.from(target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => this.uploadedImages.push(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    }
  }
}
