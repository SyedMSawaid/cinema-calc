namespace CinemaCalc.Application.Exceptions.BaseExceptions;

public class EntityNotFoundException : ApplicationException
{
    protected EntityNotFoundException(string name, object key, string operation)
        : base($"Entity \"{name}\" ({key}) was not found.")
    {
        Operation = operation;
    }

    public string Operation { get; set; }
}