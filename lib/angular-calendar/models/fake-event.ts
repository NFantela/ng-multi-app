export class FakeEvent {
    constructor(
        public eventName:string,
        public eventDate:Date | string,
        public eventDescription?:string,
        public eventImg?:string
    ){}
}