# Import create_engine → used to connect Python with database
from sqlalchemy import create_engine

# Import sessionmaker + declarative_base
from sqlalchemy.orm import sessionmaker, declarative_base


# Database connection URL
DATABASE_URL = "mysql+pymysql://root:sahil4484@localhost:3306/water_db"


# Create engine (connect to MySQL)
engine = create_engine(DATABASE_URL)


# Create session (DB communication)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# 🔥 THIS WAS MISSING (VERY IMPORTANT)
Base = declarative_base()