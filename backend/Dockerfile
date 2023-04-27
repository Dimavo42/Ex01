FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9
COPY ./requirements.txt /backend/requirements.txt
RUN pip install -r /backend/requirements.txt
COPY . /backend
WORKDIR /backend
RUN python pulldata.py
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]