export interface ICurrency {
    CurrencyId: number,
    CurrencyCode: string,
    CurrencyName: string,
    DayCount: string,
    Multiplier: number,
    IsActive: boolean,
    CreatedBy: string,
    CreatedDt: Date,
    ModifiedBy: string,
    ModifiedDt: Date
}