from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi.security import HTTPBearer


SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"


security = HTTPBearer()


def create_token(data: dict):

    token_data = data.copy()

    token_data["exp"] = datetime.utcnow() + timedelta(
        minutes=60
    )

    return jwt.encode(
        token_data,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def verify_token(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("user_id")

        return user_id

    except JWTError:
        return None