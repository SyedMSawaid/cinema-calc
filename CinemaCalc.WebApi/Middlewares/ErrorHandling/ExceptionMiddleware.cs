using CinemaCalc.Application.Exceptions.BaseExceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CinemaCalc.WebApi.Middlewares.ErrorHandling;

public class ApplicationExceptionFilterAttribute : ExceptionFilterAttribute
{
    public override void OnException(ExceptionContext context)
    {
        if (context.Exception is not ApplicationException) return;

        string message;
        int statusCode;
        string code;
        switch (context.Exception)
        {
            case ApplicationOperationException applicationOperationException:
                message = applicationOperationException.Message;
                statusCode = StatusCodes.Status400BadRequest;
                code = "BadOperation";
                break;
            case EntityNotFoundException entityNotFoundException:
                message = entityNotFoundException.Message;
                statusCode = StatusCodes.Status404NotFound;
                code = "NotFound";
                break;
            default:
                message = "Unknown Error";
                statusCode = StatusCodes.Status500InternalServerError;
                code = "UnknownError";
                break;
        }

        context.HttpContext.Response.ContentType = "application/json";
        context.HttpContext.Response.StatusCode = statusCode;
        context.Result = new JsonResult(ErrorModel.Create(message, code));
    }
}