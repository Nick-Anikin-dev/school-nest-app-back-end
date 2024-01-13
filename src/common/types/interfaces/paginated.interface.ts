export interface IPaginated<T> {
    data: T[];
    total: number;
    last_page: number;
    per_page: number;
    page: number;
}
