from sqlalchemy import create_engine, inspect
from app.database import DATABASE_URL
engine = create_engine(DATABASE_URL)
inspect_obj = inspect(engine)
print('tables:', inspect_obj.get_table_names())
if 'spots' in inspect_obj.get_table_names():
    cols = inspect_obj.get_columns('spots')
    for col in cols:
        print(col['name'], col['type'], col['nullable'], col.get('default'))
else:
    print('spots table missing')
