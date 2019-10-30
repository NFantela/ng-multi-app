export interface AngularCalendarDataItem<P> {
    item : P,
    dateForItem:Date;
}


export class AngularCalendarData<T> {

    constructor(data:T[], datepropName:string){
        if(!Array.isArray(data) || !datepropName.length){
            throw new Error("Invalid arguments for Angular Calendar Data please provide an array and correct date property name on the data model!")
        }
        if(data.length){
            for(let i = 0; i < data.length; i++){
                const dataItem : AngularCalendarDataItem<T>= {
                    item: data[i],
                    dateForItem:  isNaN(Date.parse(data[i][datepropName]))  ? null  : new Date(data[i][datepropName])
                }
                this.calendarData.push(dataItem);
            }
        }
    }

    calendarData:AngularCalendarDataItem<T>[] = [];

}