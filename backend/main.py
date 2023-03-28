import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
import services as _services, schemas as _schemas

app = _fastapi.FastAPI()

# first endpoint to create user
@app.post("/api/users")
async def create_user(user: _schemas.UserCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    db_user = await _services.get_user_by_email(user.email, db)

    # if the user does exist
    if db_user:
        raise _fastapi.HTTPException(status_code=400, detail="Email already in use")
    
    return await _services.create_user(user, db)

# authentication when logging into the app
#@app.post("/api/login")
#async def login(user: _schemas.User, db: _orm.Session = _fastapi.Depends(_services.get_db)):
#    user = await _services.authenticate_user(user.email, user.password, db)
#
#    # if the user doesn't exist
#    if not user:
#        raise _fastapi.HTTPException(status_code=401, detail="Invalid credentials")
#    
#    return await _services.profile_page(user, db)


# to get a token when the user authenticates
@app.post("/api/token")
async def generate_token(form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(), db: _orm.Session = _fastapi.Depends(_services.get_db)):
    user = await _services.authenticate_user(form_data.username, form_data.password, db)

    # if the user doesn't exist
    if not user:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid credentials")
    
    return await _services.create_token(user)

# get the current user
@app.get("/api/users/me", response_model=_schemas.User)
async def get_user(user: _schemas.User = _fastapi.Depends(_services.get_current_user)):
    return user