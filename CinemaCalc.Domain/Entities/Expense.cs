namespace CinemaCalc.Domain.Entities;

public class Expense : BaseEntity
{
    public required string Name { get; set; }
    public decimal Price { get; set; }
    public decimal PercentageMarkup { get; set; }
    public decimal Total { get; set; }

    public static Expense Create(string name, decimal price, decimal percentageMarkup)
    {
        return new Expense
        {
            Name = name,
            Price = price,
            PercentageMarkup = percentageMarkup,
            Total = percentageMarkup / 100 * price + price
        };
    }
}