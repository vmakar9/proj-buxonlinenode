python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput
chown -R 1000:1000 /usr/src/django_back/static
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --timeout 120
