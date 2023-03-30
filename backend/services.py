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
        company_position=user.company_position
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

# to get the user that is authenticated
async def get_current_user( db: _orm.Session = _fastapi.Depends(get_db), token: str = _fastapi.Depends(oauth2schema)):
    try:
        # algorithm that it uses to encode
        payload = _jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(_models.User).get(payload["id"])
    except:
        _fastapi.HTTPException(status_code=401, detail="Invalid Email or Password")

    return _schemas.User.from_orm(user)

# to create a new skill to an user
async def create_skill(user: _schemas.User, db: _orm.Session, skill: _schemas.SkillCreate):
    skill = _models.Skill(**skill.dict(), user_id=user.id)
    db.add(skill)
    db.commit()
    db.refresh(skill)

    return _schemas.Skill.from_orm(skill)

# to retrieve all skills for a user
async def get_skills(user: _schemas.User, db: _orm.Session):
    skills = db.query(_models.Skill).filter_by(user_id=user.id)

    # loop through each skill (as an object) and add it to a list
    return list(map(_schemas.Skill.from_orm, skills))

# to select a specific skill according to its id
async def _skill_selector(skill_id: int, user: _schemas.User, db: _orm.Session):
    skill = (
        db.query(_models.Skill).filter_by(user_id=user.id).filter(_models.Skill.id == skill_id).first()
    )

    if skill is None:
        raise _fastapi.HTTPException(status_code=404, detail="Skill does not exist")
    
    return skill

# to update a specific skill for a user
async def update_skill(skill_id: int, skill: _schemas.SkillCreate, db: _orm.Session, user: _schemas.User):
    skill_db = await _skill_selector(skill_id, user, db)

    skill_db.name = skill.name
    skill_db.level = skill.level

    db.commit()
    db.refresh(skill_db)

    return _schemas.Skill.from_orm(skill_db)