FROM python:3.9

EXPOSE 8000

ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

WORKDIR /

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r /requirements.txt

COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]