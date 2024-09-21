using System;

namespace CinemaCalc.Domain.Entities;

public class Expense : BaseEntity
{
  public required string Name { get; set; }
  public decimal Price { get; set; }
  public decimal PercentageMarkup { get; set; }
}
