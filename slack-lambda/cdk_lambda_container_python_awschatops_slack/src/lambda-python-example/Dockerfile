FROM public.ecr.aws/lambda/python:3.8

RUN pip install requests

COPY dog-fact-api.py ./

CMD ["dog-fact-api.handler"]