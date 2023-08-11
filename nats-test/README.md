### considerations

Quick approach to access a POD port without

- Creating a ClusterIP and an ingress service to expose it to the outside world
- Creating a Node Port service

kubectl port-forward [pod-name] port1:port2
Where port 1 is the port on the local machine that I want to be able to access to get at the given POD, the second one is the port on the POD that I want to be able to access

i.e: kubectl port-forward nats-depl-646b86b46f-68zqz 4222:4222
