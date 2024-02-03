FROM python:3.8

WORKDIR /app

COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 5000

ENV PYTHONUNBUFFERED=1

CMD ["python", "-u", "app.py"]
