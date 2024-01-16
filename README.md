## deployment of ingress-nginx
https://kubernetes.github.io/ingress-nginx/deploy/

## delete ingress controller in Kubernetes
kubectl get ns
kubectl delete all --all -n ingress-nginx

## Create a build of a Docker image
docker build -t [docker-hubaccount]/[image-name] .
## Push the build to Docker Hub
docker push [docker-hubaccount]/[image-name]
# Helpful commands for communication between different namespaces

## show kubernetes namespaces

kubectl get namespace

## show services running in namespace

kubectl get services -n <namespace>

## Create a secret object in Kubernetes
kubectl create secret generic [name_in_kubectl]-secret --from-literal [NAME_KEY]=[password]

i.e: kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=[password]

## Show kubernetes config (including contexts)
kubectl config view

## Switch among kubernetes contexts
kubectl config use-context [context_name]
