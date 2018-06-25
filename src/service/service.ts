//******(ถ้ารูปแบบชุดข้อมูลมีการเปลี่ยนแปลงต้องแก้ไขส่วนนี้ด้วย) รูปแบบชุดข้อมูลหลัก ซึ่งส่งมีกการนำไปใช้ในระบบทั้งหมด
//****** ต้องสัมพันธ์ กันทั้ง Mobile และ Web App */
export interface deviceDetail {
    number?: number;
    serialNumber?: number;
    date?: string;
    name?: string;
    detail?: string;
    location?: number;
    pricePerUnit?: string;
    transferStatus?: string;
    oldSerialNumber? : number;
    remark?:string;
    imgurl? : any;
    key?:string;
    file?: any;
    tagUID?:string;
    status?:any;
    lastUpdate?:string;
}
/////////////////////////////////////////
//รูปแบบชุดข้อมูลของ Post ในหน้า HomePage
export interface dataBroadcast {
    text : string;
    date : any;
    user : string;
    key : string;
    avatar?:string;
}