FROM ubuntu

RUN apt-get update && apt-get -y install python3-pip
COPY requirements.txt .
RUN pip install -r requirements.txt
WORKDIR /app
COPY ./app .
RUN python3 pulldata.py
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]