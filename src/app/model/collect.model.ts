import {WasteType} from './enum/wasteType';
import {CollectStatus} from './enum/collectStatus';

export class CollectModel {
  constructor(
    public id: number,
    public userId: number,
    public wasteTypes: WasteType[],
    public weight: number,
    public address: string,
    public collectionDate: Date,
    public time: string,
    public notes?: string,
    public status: CollectStatus = CollectStatus.PENDING,
    public images?: string[]
  ) {}
}
