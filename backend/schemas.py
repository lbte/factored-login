import pydantic as _pydantic # used for data validation


#class _SkillBase(_pydantic.BaseModel):
#    name: str
#    level: int
#
## for creating a skill only the fields inherited will be sent
#class SkillCreate(_SkillBase):
#    pass
#
## this is not sent when created so only authenticated users can create a skill
#class Skill(_SkillBase):
#    id: int
#    user_id: int
#
#    class Config:
#        orm_mode = True


# parent class to inherit which inherits from BaseModel
class _UserBase(_pydantic.BaseModel):
    name: str
    email: str
    company_position: str
    skills: str

# information that will be sent on POST
class UserCreate(_UserBase):
    hashed_password: str

    class Config:
        orm_mode = True

# when we GET back an user we get this fields
class User(_UserBase):
    id: int
    #skills: _pydantic.conlist(item_type=Skill, min_items=5) = []
    
    class Config:
        orm_mode = True


