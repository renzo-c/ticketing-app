# Full Stack Project (MERN Stack + Microservices)

Ticketing app implemented with microservices. Based on Stephen Grider's Microservices with Node JS and React course

## Tools:
- Frontend: Next.Js (React.Js)
- Backend: Node.Js + Express, Mongoose, Typescript
- Database: MongoDB
- Microservices: NATS streaming
- Testing: Jest

## Key takeaways
- Planning for handlers and multi-layer abstractions in the backend
- Implemention of listeners and publishers in NATs Microservice architecture
- Publish NPM library with common pieces of code. [Link](https://github.com/renzo-c/ticketing-common)
- Stripe API integration
- Shared real-world perspectives on constructing highly scalable backend components
- Addressing transaction concurrency issues through the optimistic concurrency control (OCC) approach.
- Implementation of CI/CD workflow

## Helpful links and commands

### Deployment of ingress-nginx
`https://kubernetes.github.io/ingress-nginx/deploy/`

### Delete ingress controller in Kubernetes
`kubectl get ns`

`kubectl delete all --all -n ingress-nginx`

### Create a build of a Docker image
`docker build -t [docker-hubaccount]/[image-name] .`

### Push the build to Docker Hub
`docker push [docker-hubaccount]/[image-name]`

### Commands for communication between different namespaces

### Show kubernetes namespaces

`kubectl get namespace`

### Show services running in namespace

`kubectl get services -n <namespace>`

### Create a secret object in Kubernetes
`kubectl create secret generic [name_in_kubectl]-secret --from-literal [NAME_KEY]=[password]`

i.e: `kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=[password]`

### Show kubernetes config (including contexts)
`kubectl config view`

### Switch among kubernetes contexts
`kubectl config use-context [context_name]`
