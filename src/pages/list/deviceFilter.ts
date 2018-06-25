import { Pipe, PipeTransform } from '@angular/core';
import { deviceDetail } from '../../service/service';

@Pipe({
    name: 'deviceFilter',
    pure: false
})
export class DeviceFilterPipe implements PipeTransform {
    transform(items: deviceDetail[], filter: string): deviceDetail[] {
        if (!items || !filter) {
          return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter((item: deviceDetail) => this.applyFilter(item, filter));
      }
      
      /**
       * Perform the filtering.
       * 
       * @param {Book} device The book to compare to the filter.
       * @param {Book} filter The filter to apply.
       * @return {boolean} True if book satisfies filters, false if not.
       */
      
      // เพิ่มตัวแปรที่ต้องการค้นหาในช่อง Search Bar หน้า List page
      applyFilter(device: deviceDetail, filter: string): boolean {
        if (device.tagUID.toLowerCase().indexOf(filter.toLowerCase()) 
          && device.name.toLowerCase().indexOf(filter.toLowerCase()) 
          && device.serialNumber.toString().indexOf(filter)
          && device.location.toString().indexOf(filter) === -1 ) {          
            return false;
          }
        return true;
      }
}