# Back-End/expense/Dockerfile

FROM python:3.10

RUN apt-get update \
	&& apt-get install -y \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app/backend
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

EXPOSE 8000
#CMD ["python", "manage.py", "makemigrations"]
#CMD ["python", "manage.py", "migrate"]
#CMD ["python", "manage.py", "runserver"]
CMD ["sh", "-c", "python manage.py makemigrations && python manage.py makemigrations inventory && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]