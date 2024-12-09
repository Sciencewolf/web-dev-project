from supabase import Client
from postgrest import APIResponse


class Account:
    def __init__(self, supabase_db: Client):
        self.supabase_db = supabase_db

    def __str__(self):
        pass


    def get_all_users(self) -> list:
        response: APIResponse = self.supabase_db.table('users').select('nickname').execute()

        return response.data


    def add_user(self, nickname: str, password: str, token: str) -> list:
        user_in_db: list = self.validate_user(nickname)

        if user_in_db:
            return ["error"]

        response: APIResponse = self.supabase_db.table('users').insert({
            'nickname': nickname,
            'password': password
        }).execute()

        return response.data


    def validate_user(self, nickname: str) -> list:
        response: APIResponse = (self.supabase_db.table('users').select('id, nickname')
                                 .eq('nickname', nickname).execute())

        return response.data
