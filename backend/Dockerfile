FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9


COPY ./requirements.txt /backend/requirements.txt

COPY ./scripts/pulldata.py /backend/scripts/pulldata.py
COPY . /backend
#Install requirments
RUN pip install -r /backend/requirements.txt

WORKDIR /backend

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

