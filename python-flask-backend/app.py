from flask import Flask, Response, render_template, jsonify, request, make_response
from flask_cors import CORS

import os

import secrets

from supabase import create_client, Client

from author.author_utils import Author
from book.book_utils import Book
from borrow.borrow_utils import Borrow
from account.account_utils import Account

app = Flask(__name__)
CORS(app, supports_credentials=True)
API_KEY: str = secrets.token_urlsafe(32)

db_url: str = os.environ.get('SUPABASE_URL')
db_key: str = os.environ.get('SUPABASE_KEY')
supabase_db: Client = create_client(db_url, db_key)

book_utils: Book = Book(supabase_db)
author_utils: Author = Author(supabase_db)
borrow_utils: Borrow = Borrow(supabase_db)
account_utils: Account = Account(supabase_db)


""" Routes """


@app.route("/")
@app.route('/home')
@app.route('/login')
@app.route("/signup")
@app.route("/books")
@app.route("/authors")
@app.route("/borrowed")
def index():
    return render_template(template_name_or_list='index.html')

@app.errorhandler(404)
def load_no_page(error):
    return render_template(template_name_or_list='index.html'), 404


""" Get api_key """
@app.route("/get-api-key", methods=['GET'])
def get_api_key() -> Response:
    return jsonify({'apiKey': API_KEY})


""" Books """


@app.route("/get-all-books", methods=['GET'])
def get_all_books() -> Response:
    limit: str = request.args.get('limit')

    return jsonify(book_utils.get_all_books(int(limit)))


@app.route("/get-book/<book_id>", methods=['GET'])
def get_book(book_id) -> Response:
    return jsonify(book_utils.get_book(book_id))


@app.route("/add-book", methods=['GET', 'POST'])
def add_book() -> Response:
    title: str = request.args.get('title')
    author: str = request.args.get('author')
    publisher: str = request.args.get('publisher')
    image: str = request.args.get('image')

    response: list = book_utils.add_book(title, author, publisher, image)

    return jsonify({"new_book": response})


@app.route("/modify-book", methods=['GET', 'PUT'])
def modify_book() -> Response:
    book_id: str = request.args.get('id')
    title: str = request.args.get('title')
    author: str = request.args.get('author')
    publisher: str = request.args.get('publisher')
    image: str = request.args.get('image')
    api_key: str = request.headers.get('x-api-key')

    if api_key == API_KEY:
        response: list = book_utils.modify_book(int(book_id), title, author, publisher, image)

        return jsonify({'modified': response})

    return make_response(jsonify({'api_error': 'Invalid API key'}), 403)


@app.route("/delete-book", methods=['GET', 'DELETE'])
def delete_book() -> Response:
    book_id: str = request.args.get('id')
    api_key: str = request.headers.get('x-api-key')

    if api_key == API_KEY:
        response: list = book_utils.remove_book(int(book_id))

        return jsonify({"status": 'deleted', 'deleted': response})

    return make_response(jsonify({'api_error': 'Invalid API key'}), 403)



@app.route("/filter-books", methods=['GET', 'POST'])
def filter_book() -> Response:
    col: str = request.args.get('col')
    val: str = request.args.get('val')

    response: list = book_utils.filter_books(col, val)

    return jsonify({'filtered': response})


""" Authors """


@app.route("/get-all-authors", methods=['GET'])
def get_all_authors() -> Response:
    limit: str = request.args.get('limit')

    return jsonify(author_utils.get_all_authors(int(limit)))


@app.route("/get-authors/<author_id>", methods=['GET'])
def get_author(author_id) -> Response:
    return jsonify(author_utils.get_author(author_id))


@app.route("/add-author", methods=['GET', 'POST'])
def add_author() -> Response:
    firstname: str = request.args.get('firstname')
    lastname: str = request.args.get('lastname')
    birthdate: str = request.args.get('birthdate')
    image: str = request.args.get('image')
    bio: str = request.args.get('bio')

    response: list = author_utils.add_author(firstname, lastname, birthdate, image, bio)

    return jsonify({'added': response})


@app.route("/modify-author", methods=['GET', 'PUT'])
def modify_author() -> Response:
    book_id: str = request.args.get('id')
    firstname: str = request.args.get('firstname')
    lastname: str = request.args.get('lastname')
    birthdate: str = request.args.get('birthdate')
    image: str = request.args.get('image')
    bio: str = request.args.get('bio')
    api_key: str = request.headers.get('x-api-key')

    if api_key == API_KEY:
        response: list = author_utils.modify_author(int(book_id), firstname, lastname, birthdate, image, bio)

        return make_response(
            jsonify({'modified': response}),
            200
        )

    return make_response(jsonify({'api_error': 'Invalid API key'}), 403)



@app.route("/delete-author", methods=['GET', 'DELETE'])
def delete_author() -> Response:
    book_id: str = request.args.get('id')
    api_key: str = request.headers.get('x-api-key')

    if api_key == API_KEY:
        response: list = author_utils.remove_author(int(book_id))

        return make_response(jsonify({"deleted": response}), 200)

    return make_response(jsonify({'api_error': 'Invalid API key'}), 403)


""" Borrow """


@app.route("/get-all-borrow/<user_id>", methods=['GET'])
def get_all_borrow(user_id: str) -> Response:
    """

    :param user_id: user_id(nickname/google username)
    :return: json
    """

    response: list = borrow_utils.get_all_borrow(user_id)

    return jsonify({'borrow': response})


@app.route("/add-borrow", methods=['GET', 'POST'])
def add_borrow() -> Response:
    book_id: str = request.args.get('book_id')
    user_id: str = request.args.get('user_id')
    book_title: str = request.args.get('book_title')
    book_author: str = request.args.get('book_author')
    book_publisher: str = request.args.get('book_publisher')
    book_image: str = request.args.get('book_image')

    response: list = borrow_utils.add_borrow(int(book_id), book_title, book_author, book_publisher, book_image, user_id)

    return jsonify({'added': response})


@app.route("/delete-borrow", methods=['GET', 'DELETE'])
def delete_borrow() -> Response:
    borrow_id: str = request.args.get('id')
    book_id: str = request.args.get('book_id')
    user_id: str = request.args.get('user_id')
    api_key: str = request.headers.get('x-api-key')

    if api_key == API_KEY:
        response: list = borrow_utils.delete_borrow(int(borrow_id), int(book_id), user_id)

        return jsonify({'deleted': response})

    return make_response(jsonify({'api_error': 'Invalid API key'}), 403)

@app.route("/get-endpoints", methods=['GET'])
def get_urls() -> Response:
    lst: list = ["%s" % rule for rule in app.url_map.iter_rules()][1:]

    return jsonify({"endpoints": lst})


""" Account """


@app.route('/get-all-users', methods=['GET'])
def get_all_users() -> Response:
    api_key: str = request.headers.get('x-api-key')

    if api_key == API_KEY:
        response: list = account_utils.get_all_users()

        return make_response(
            jsonify({'users': response}),
            200)

    return make_response(jsonify({'api_error': 'Invalid API key'}), 403)

@app.route("/add-user", methods=['GET', 'POST'])
def add_user() -> Response:
    nickname: str = request.args.get('nickname')
    password: str = request.args.get('password')
    api_key: str = request.headers.get('x-api-key')

    if api_key == API_KEY:
        response: list = account_utils.add_user(nickname, password)

        if response[0] == 'error':
            return make_response(jsonify({'added': response[0]}), 403)

        return make_response(jsonify({'added': response}), 200)


@app.route("/validate-user", methods=['GET', 'POST'])
def validate_user() -> Response:
    nickname: str = request.args.get('nickname')

    response: list = account_utils.validate_user(nickname)

    return jsonify({'response': response})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
