export function cloneDate( date:Date ):Date
export function addDays( date:Date, days:number ):Date
export interface iFlat {
    id: string
    title: string
    details: string
    photos: string[],
    coordinates: number[],
    bookedDates: number[],
    totalPrice: number
  }
export interface iParams {
    city:string
    checkInDate:Date
    checkOutDate:Date
    priceLimit:number | null
  }
export class FlatRentSdk {
  get(id:string):Promise<iFlat|null>
  search(parameters:iParams):Promise<iFlat[]>
  book(flatId, checkInDate:Date, checkOutDate:Date):number
}
