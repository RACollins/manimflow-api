# Amazon linux 2023
FROM amazonlinux:2023

# Install Python 3.12 and pip
RUN yum update -y
#RUN yum install -y amazon-linux-extras
RUN yum install -y python3.11
RUN python3.11 -m ensurepip --upgrade
RUN yum install -y python3-pip && \
    yum install -y zip && \
    yum clean all

# Set up PIP and Venv
RUN python3.11 -m pip install --upgrade pip && \
    python3.11 -m pip install virtualenv
RUN python3.11 -m venv base
RUN source base/bin/activate

# Install dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt -t ./python

# Zip it up for deployment.
RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash", "-l"]