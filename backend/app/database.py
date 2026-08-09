from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# This URL tells SQLAlchemy where your database lives
# Format: postgresql://username:password@host:port/database_name
DATABASE_URL = "postgresql://spotuser:spotpass123@localhost:5432/spotdb"

# The engine is the core connection — think of it as the phone line to PostgreSQL
engine = create_engine(DATABASE_URL)

# SessionLocal is a factory that creates database sessions
# Each session = one conversation with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base is the foundation for all your database tables
# Every table you create will inherit from this
Base = declarative_base()

# This function gives you a database session and closes it when done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
