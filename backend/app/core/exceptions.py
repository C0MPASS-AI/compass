import logging
from fastapi import Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

logger = logging.getLogger(__name__)


class AppException(Exception):
    def __init__(self, message: str, status_code: int = 400, errors: list | None = None):
        self.message = message
        self.status_code = status_code
        self.errors = errors or []


async def app_exception_handler(request: Request, exc: AppException):
    logger.error(f"AppException: {exc.message} | path={request.url.path}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": exc.message, "errors": exc.errors},
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.warning(f"Validation error on {request.url.path}: {exc.errors()}")
    formatted_errors = [
        {
            "field": ".".join(str(loc) for loc in err["loc"] if loc != "body"),
            "message": err["msg"],
        }
        for err in exc.errors()
    ]
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"success": False, "message": "Invalid request data", "errors": formatted_errors},
    )


async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    logger.warning(f"HTTPException {exc.status_code} on {request.url.path}: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": str(exc.detail), "errors": []},
    )


async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception(f"Unhandled exception on {request.url.path}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"success": False, "message": "Internal server error", "errors": []},
    )