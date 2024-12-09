from postgrest import APIResponse
from supabase import Client


class Book:
    def __init__(self, supabase_db: Client):
        self.supabase_db = supabase_db

    def __str__(self):
        pass

    def get_all_books(self, limit: int) -> list:
        if limit != 0:
            response: APIResponse = self.supabase_db.table("books").select('*').limit(limit).execute()

            return response.data

        response: APIResponse = self.supabase_db.table("books").select('*').execute()

        return response.data

    def get_book(self, book_id: int) -> list:
        response: APIResponse = self.supabase_db.table("books").select('*').eq('id', book_id).execute()

        return response.data

    def add_book(self, title: str, author: str, publisher: str, image: str) -> list:
        response: APIResponse = self.supabase_db.table('books').insert({
            'title': title,
            'author': author,
            'publisher': publisher,
            'image': image,
        }).execute()

        return response.data

    def modify_book(self, book_id: int, title: str, author: str, publisher: str, image: str) -> list:
        response: APIResponse = self.supabase_db.table('books').update({
            'title': title,
            'author': author,
            'publisher': publisher,
            'image': image,
        }).eq('id', book_id).execute()

        return response.data

    def remove_book(self, book_id: int) -> list:
        response: APIResponse = self.supabase_db.table('books').delete().eq('id', book_id).execute()

        return response.data


    def filter_books(self, col: str, val: str) -> list:
        response: APIResponse = self.supabase_db.table('books').select('*').in_(col, [val]).execute()

        return response.data