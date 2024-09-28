namespace CinemaCalc.Application.Exceptions.BaseExceptions;

public class ApplicationOperationException : ApplicationException
{
    protected ApplicationOperationException(object name, object key, string operation)
        : base($"Invalid Operation \"{operation}\" performed on \"{name}\" ({key}).")
    {
        Operation = operation;
    }

    public string Operation { get; set; }
}