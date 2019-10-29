export class FakeEvent {
    constructor(
        public eventName:string,
        public eventDate:Date,
        public eventDescription?:string,
        public eventImg?:string
    ){}
}