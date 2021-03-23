import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./Table.template";

export class Table extends ExcelComponent {
    static className = 'excel__table'
        
    toHtml() {
        return createTable()
    }
}