namespace CinemaCalc.WebApi.Middlewares.ErrorHandling;

public class ErrorModel
{
    public string? Message { get; set; }
    public string? Code { get; set; }

    public static ErrorModel Create(string message, string code)
    {
        return new ErrorModel
        {
            Message = message,
            Code = code
        };
    }
}