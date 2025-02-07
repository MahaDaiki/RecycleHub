import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectRoutingModule } from './collect-routing.module';
import {CollectionAddComponent} from './collection-add/collection-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CollectService} from '../../service/collect.service';
import {collectReducer} from '../../store/collect/collect.reducer';
import {StoreModule} from '@ngrx/store';


@NgModule({
  declarations: [
    CollectionAddComponent,
  ],
  imports: [
    CommonModule,
    CollectRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('collect', collectReducer)
  ],
  providers: [CollectService],
  exports: [CollectionAddComponent]
})
export class CollectModule { }
