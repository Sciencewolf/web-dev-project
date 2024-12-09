from datetime import datetime, timedelta

from postgrest import APIResponse
from supabase import Client


class Borrow:
    def __init__(self, supabase_db: Client):
        self.supabase_db = supabase_db

    def __str__(self):
        pass

    def get_all_borrow(self, user_id: str) -> list:
        response: APIResponse = self.supabase_db.table('borrow').select('*').eq('user_id', user_id).execute()

        return response.data

    def add_borrow(self, book_id: int, book_title: str, book_author: str, book_publisher: str, book_image: str, user_id: str) -> list:
        response: APIResponse = self.supabase_db.table('borrow').insert({
            'book_id': book_id,
            'user_id': user_id,
            'book_title': book_title,
            'book_author': book_author,
            'book_publisher': book_publisher,
            'book_image': book_image,
            'loan_date': datetime.today().__str__(),
            'return_deadline': (datetime.today() + timedelta(days=10)).__str__(),
        }).execute()

        return response.data

    def delete_borrow(self, borrow_id: int, book_id: int, user_id: str) -> list:
        response: APIResponse = (self.supabase_db.table('borrow').delete()
                                 .eq('id', borrow_id).eq('user_id', user_id).eq('book_id', book_id).execute())

        return response.data
