from postgrest import APIResponse
from supabase import Client


class Author:
    def __init__(self, supabase_db: Client):
        self.supabase_db = supabase_db

    def __str__(self):
        pass

    def get_all_authors(self, limit: int) -> list:
        if limit != 0:
            response: APIResponse = self.supabase_db.table('authors').select('*').limit(limit).execute()
            return response.data

        response: APIResponse = self.supabase_db.table('authors').select('*').execute()

        return response.data

    def get_author(self, author_id: int) -> list:
        response: APIResponse = self.supabase_db.table('authors').select('*').eq('id', author_id).execute()

        return response.data

    def add_author(self, firstname: str, lastname: str, birthdate: str, image: str, bio: str) -> list:
        response: APIResponse = self.supabase_db.table('authors').insert({
            'firstname': firstname,
            'lastname': lastname,
            'birthdate': birthdate,
            'image': image,
            'bio': bio,
        }).execute()

        return response.data

    def modify_author(self, author_id: int, firstname: str, lastname: str, birthdate: str, image: str, bio: str) -> list:
        response: APIResponse = self.supabase_db.table('authors').update({
            'firstname': firstname,
            'lastname': lastname,
            'birthdate': birthdate,
            'image': image,
            'bio': bio,
        }).eq('id', author_id).execute()

        return response.data

    def remove_author(self, author_id: int) -> list:
        response: APIResponse = self.supabase_db.table('authors').delete().eq('id', author_id).execute()

        return response.data
