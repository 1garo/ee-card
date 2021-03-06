#!/bin/bash

sudo -u postgres psql << EOF

create database ee_card;
create user ee_card_user with encrypted password 'ee_card_password';
grant all privileges on database ee_card to ee_card_user;

EOF


# way to expose without using service yaml and use NodePort 
minikube start --driver=docker
minikube docker-env
eval $(minikube -p minikube docker-env)
docker build -t ee_card_server .
minikube kubectl -- create -f ./k8s/database-data-persistentvolumeclaim.yaml
minikube kubectl -- create -f ./k8s/database-deployment.yaml
minikube kubectl -- expose deployment database --type=NodePort --name=database
# delay some seconds to create the server, due to sync and migration
minikube kubectl -- create -f ./k8s/server-deployment.yaml
minikube kubectl -- expose deployment server --type=NodePort --name=server --port=8000
minikube service list # get the ee-card-server url and use that as url (e.g GET url/card)

# way to expose without using service yaml and use LoadBalancer
minikube start 
minikube kubectl -- apply -f ./k8s/database-data-persistentvolumeclaim.yaml
minikube kubectl -- apply -f ./k8s/database-deployment.yaml
minikube kubectl -- expose deployment database --type=LoadBalancer --name=database

minikube kubectl -- apply -f ./k8s/server-deployment.yaml
minikube kubectl -- expose deployment server --type=LoadBalancer --name=server --port=8000