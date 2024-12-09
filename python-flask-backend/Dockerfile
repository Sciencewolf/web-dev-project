FROM python:3.11
LABEL authors="Márton Áron"

WORKDIR /python-flask-backend

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

# open http://localhost:5000 or http://your_ip_address:5000
CMD ["python", "-m", "flask", "run",  "--host=0.0.0.0", "--port=5000"]