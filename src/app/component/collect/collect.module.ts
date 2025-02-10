import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { CollectRoutingModule } from './collect-routing.module';
import {CollectionAddComponent} from './collection-add/collection-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CollectService} from '../../service/collect.service';
import {collectReducer} from '../../store/collect/collect.reducer';
import {StoreModule} from '@ngrx/store';
import {CollectListComponent} from './collect-list/collect-list.component';
import {CityCollectComponent} from './city-collect/city-collect.component';
import {DateFormatPipe} from '../../pipe/date-format.pipe';


@NgModule({
  declarations: [
    CollectionAddComponent,
    CollectListComponent,
    CityCollectComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    CollectRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('collect', collectReducer)
  ],
  providers: [CollectService,DatePipe ],
  exports: [CollectionAddComponent,CollectListComponent ]
})
export class CollectModule { }
