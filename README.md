## deployment of ingress-nginx

https://kubernetes.github.io/ingress-nginx/deploy/

## delete ingress controller in Kubernetes

kubectl get ns
kubectl delete all --all -n ingress-nginx

# Helpful commands for communication between different namespaces

## show kubernetes namespaces

kubectl get namespace

## show services running in namespace

kubectl get services -n <namespace>
