import sqlalchemy as _sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as _orm

# this creates the dabase file
DATABASE_URL = "sqlite:///./database.db"

# create engine
engine = _sql.create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = _orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)

# base class which maintains a catalog of classes and tables relative to it
Base = _declarative.declarative_base()