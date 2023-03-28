# create functions that creates the database
import database as _database, models as _models, schemas as _schemas
import sqlalchemy.orm as _orm
import passlib.hash as _hash
import jwt as _jwt
import fastapi as _fastapi
import fastapi.security as _security

oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token")
JWT_SECRET = "myjwtsecret"

def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)

# retrieves the database session
def get_db():
    db = _database.SessionLocal()

    try:
        yield db
    finally:
        db.close() # so the session is not left open

# to be able to check if a user is already created with the email, it returns the user
async def get_user_by_email(email: str, db: _orm.Session):
    return db.query(_models.User).filter(_models.User.email == email).first()

# to create the user
async def create_user(user: _schemas.UserCreate, db: _orm.Session):
    user_obj = _models.User(
        email=user.email, 
        hashed_password=_hash.bcrypt.hash(user.hashed_password), 
        name=user.name, 
        company_position=user.company_position,
        skills=user.skills
    )

    # add the user to the db
    db.add(user_obj)
    # commit it
    db.commit()
    # refresh attributes on the user
    db.refresh(user_obj)

    return user_obj

# autheticate the user
async def authenticate_user(email: str, password: str, db: _orm.Session):
    user = await get_user_by_email(email, db)

    # if the user doesn't exists
    if not user:
        return False
    
    # if the password is not the one for that user
    if not user.verify_password(password):
        return False
    
    return user

async def create_token(user: _models.User):
    user_obj = _schemas.User.from_orm(user) #maps the model to the schema

    token = _jwt.encode(user_obj.dict(), JWT_SECRET)

    return dict(access_token=token, token_type="bearer")

################# just an example to try to see if the authentication works
#async def profile_page(user: _schemas.UserCreate, db: _orm.Session):
#    return f"Profile from {user.name}"


async def get_current_user( db: _orm.Session = _fastapi.Depends(get_db), token: str = _fastapi.Depends(oauth2schema)):
    try:
        # algorithm that it uses to encode
        payload = _jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(_models.User).get(payload["id"])
    except:
        _fastapi.HTTPException(status_code=401, detail="Invalid Email or Password")

    return _schemas.User.from_orm(user)
