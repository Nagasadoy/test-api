import { Order } from "src/constatnts";
export declare class PageOptionsDto {
    readonly sortByOrder?: Order;
    readonly sortByName?: Order;
    readonly page?: number;
    readonly pageSize?: number;
    get skip(): number;
}
