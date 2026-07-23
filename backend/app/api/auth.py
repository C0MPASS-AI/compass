from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.security import security, verify_token
from app.database.database import SessionLocal
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.services.auth import hash_password, verify_password
from app.core.security import create_token
from fastapi import Header
from app.core.security import verify_token


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.get("/profile")
def profile(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    user_id = verify_token(credentials.credentials)

    if not user_id:
        return {
            "error": "Invalid token"
        }

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email
    }
@router.post("/signup")
def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    hashed = hash_password(
        user.password
    )

    new_user = User(
    username=user.username,
    email=user.email,
    hashed_password=hashed
)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created",
        "id": new_user.id
    }



@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    existing = db.query(User).filter(
        User.email == user.email
    ).first()


    if not existing:
        return {
            "error": "User not found"
        }


    if not verify_password(
        user.password,
        existing.hashed_password
    ):
        return {
            "error": "Wrong password"
        }


    token = create_token({
        "user_id": existing.id
    })


    return {
        "access_token": token,
        "token_type": "bearer"
    }