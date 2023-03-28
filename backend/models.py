# to define mapped classes in terms of the base class
import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash # for password hashing (contains all the password hash algorithms)
from typing import Set

import database as _database # database created

# class to which the users table is mapped
class User(_database.Base):
    __tablename__ = "users"

    # columns
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String)
    email = _sql.Column(_sql.String, unique=True, index=True)
    hashed_password = _sql.Column(_sql.String)
    company_position = _sql.Column(_sql.String)
    skills = _sql.Column(_sql.String)
    
    # foreign key relationship, back_populates to the field in the other table
    #skills: _orm.Mapped[Set["Skill"]] = _orm.relationship("Skill", back_populates="user")
    #skills = _orm.relationship("Skill", back_populates="user")

    # function to verify the password
    def verify_password(self, password: str):
        # checks the password sent for authentication vs the actual hashed password of the user and makes sure they match
        return _hash.bcrypt.verify(password, self.hashed_password) 

# class to which the skills table is mapped
#class Skill(_database.Base):
#    __tablename__ = "skills"
#
#    # columns
#    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
#    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
#    name = _sql.Column(_sql.String, unique=True, index=True)
#    level = _sql.Column(_sql.Integer)
#    
#
#    user = _orm.relationship("User", back_populates="skills")
#    # foreign key relationship
