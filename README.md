# Swift-Shop: E-Commerce Store: Assignment#2:

# Student Details:

(Naitik Bhati-500091795-R2142210511-B2), 

(Divyansh Jha-500091657-R2142210285-B2), 

(Ritik Mudgal-500091866-R2142210646-B2), 

(Aman Kumar-500091904-R2142210089-B2)

---

# Cloud Platform Selection: AWS:

### **Scalability and Elasticity:**

**Elastic Kubernetes Service (EKS):**

- **Managed Service:** A scalable and highly available environment for executing Kubernetes clusters without having to manage the control plane is offered by EKS, a managed Kubernetes service.
- **Scaling Capabilities:** EKS makes it possible to scale clusters up or down in response to workload demands, guaranteeing effective resource allocation.

### **Managed Services:**

**Fully Managed Services:**

- AWS reduces the operational overhead of managing infrastructure by providing a wide range of managed services including RDS (Relational Database Service), EC2 (Elastic Compute Cloud), and ECR (Elastic Container Registry).
- Integration with Kubernetes: For easy deployments and management, AWS offers connectors between Kubernetes and its managed services.

### **Security and Compliance:**

**Security Measures:**

- To guarantee the security of the infrastructure and data, AWS provides an extensive range of security features and compliance certifications.
- Granular control over network isolation and access is made possible by VPC (Virtual Private Cloud) and IAM (Identity and Access Management).

### **Reliability and High Availability:**

**High Availability:**

- Applications can be deployed across several data centres for high availability and fault tolerance with the help of AWS Availability Zones (AZs) and Regions.
- The EKS is engineered to achieve high availability by dispersing control plane components among several availability zones.

---

# Deployment Process:

In our project, we adopted a microservices architecture to enhance scalability and modularity. To efficiently manage and orchestrate the deployment of our microservices:

1. **`productservice`** 
2. **`orderservice`**  
3. **`userservice`**  

and we utilized Docker Compose. This streamlined the deployment process, enabling us to run multiple services simultaneously with ease.

## Directory Structure:

### productservice:

![Untitled](Swift-Shop%20E-Commerce%20Store%20Assignment#2%203fb4a7b460f6482192eb930a6306753b/Untitled.png)

### orderservice

![Untitled](Swift-Shop%20E-Commerce%20Store%20Assignment#2%203fb4a7b460f6482192eb930a6306753b/Untitled%201.png)

### userservice:

![Untitled](Swift-Shop%20E-Commerce%20Store%20Assignment#2%203fb4a7b460f6482192eb930a6306753b/Untitled%202.png)

## Dockerfile Generation for Microservices:

Each microservice has its Dockerfile, defining the necessary steps to build the Docker image for that specific service.

### Dockerfile: productservice

```docker

FROM openjdk:20

WORKDIR /app

COPY target/productservice.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

### Dockerfile: orderservice

```docker
FROM openjdk:20

WORKDIR /app

COPY target/orderservice.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

### Dockerfile: userservice

```docker
FROM openjdk:20

WORKDIR /app

COPY target/userservice.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

## Docker Compose Configuration:

Our **`docker-compose.yaml`** file defined the services and their configurations for orchestration:

```yaml
version: '3'

services:
  productservice:
    image: productservice
    ports:
      - "8081:8080"  

  orderservice:
    image: orderservice
    ports:
      - "8082:8080"  

  userservice:
    image: userservice
    ports:
      - "8083:8080"  
```

Run the Docker-Compose file:

```bash
docker-compose up
```

Using the corresponding Dockerfiles, this command automatically generated Docker images for each service and started containers for each microservice.

---

# Container Orchestration:

## Manifest Creation:

### Deployment Manifest: productservice-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: productservice-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: productservice
  template:
    metadata:
      labels:
        app: productservice
    spec:
      containers:
      - name: productservice
        image: productservice
        ports:
        - containerPort: 8080
```

### Service Manifest: productservice-service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: productservice-service
spec:
  selector:
    app: productservice
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

### Deployment Manifest: orderservice-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orderservice-deployment
spec:
  replicas: 1  
  selector:
    matchLabels:
      app: orderservice
  template:
    metadata:
      labels:
        app: orderservice
    spec:
      containers:
      - name: orderservice
        image: orderservice
        ports:
        - containerPort: 8080
```

### Service Manifest: orderservice-service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: orderservice-service
spec:
  selector:
    app: orderservice
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

### Deployment Manifest: userservice-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: userservice-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: userservice
  template:
    metadata:
      labels:
        app: userservice
    spec:
      containers:
      - name: userservice
        image: userservice
        ports:
        - containerPort: 8080
```

### Service Manifest: userservice-service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: userservice-service
spec:
  selector:
    app: userservice
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

## AWS EKS Deployment:

Adding IAM rules:

![Untitled](Swift-Shop%20E-Commerce%20Store%20Assignment#2%203fb4a7b460f6482192eb930a6306753b/Untitled%203.png)

Edit Trusted Policy:

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": [
                    "eks.amazonaws.com"
                ]
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
```

![Untitled](Swift-Shop%20E-Commerce%20Store%20Assignment#2%203fb4a7b460f6482192eb930a6306753b/Untitled%204.png)

![Untitled](Swift-Shop%20E-Commerce%20Store%20Assignment#2%203fb4a7b460f6482192eb930a6306753b/Untitled%205.png)

![Untitled](Swift-Shop%20E-Commerce%20Store%20Assignment#2%203fb4a7b460f6482192eb930a6306753b/Untitled%206.png)

![Untitled](Swift-Shop%20E-Commerce%20Store%20Assignment#2%203fb4a7b460f6482192eb930a6306753b/Untitled%207.png)

Authenticated the cluster with EKS:

![Untitled](Swift-Shop%20E-Commerce%20Store%20Assignment#2%203fb4a7b460f6482192eb930a6306753b/Untitled%208.png)

Run the kubernetes manifest using the following instructions:

```bash
kubectl apply -f productservice-deployment.yaml
kubectl apply -f orderservice-deployment.yaml
kubectl apply -f userservice-deployment.yaml
```

To check the status of deployments:

```bash
kubectl get deployments
```

Access the microservice attached:

```bash
kubectl get services
```

---

# Scaling and Load Balancing:

### **1. Variable Workloads:**

- **Fluctuating Traffic:** Microservices frequently deal with fluctuating traffic volumes, which can fluctuate between low and high at different periods.
- **Resource Demands:** Certain microservices may encounter elevated resource requirements during particular times or as a result of specific occurrences (such as sales campaigns or surges in user activity).

### **2. Ensuring High Availability:**

- **Fault Tolerance:** A microservice's load balancing ensures fault tolerance by dividing incoming traffic among several instances, avoiding a single point of failure.
- **Redundancy:** By deploying redundant instances, scalability makes it possible to sustain availability even in the event of an instance failure.

### **3. Optimal Resource Utilization:**

- **Efficient Resource Allocation:** Optimising resource utilisation is made possible by scaling technologies such as Horizontal Pod Autoscaling (HPA), which enable the dynamic distribution of resources based on workload demands.
- **Cost Efficiency:** While scaling eliminates the over-provisioning of resources and hence lowers unneeded infrastructure expenses, load balancing prevents overloading individual instances.

### **4. Performance and User Experience:**

- **Consistent Performance:** By distributing traffic evenly, load balancing keeps instances from overloading and maintains steady performance.
- **Elasticity:** To maintain responsive and dependable performance, scaling methods offer the power to swiftly and automatically modify resource capacity to fit shifting demand.

### **5. Flexibility and Adaptability:**

- **Adapting to Changes:** The system's capacity to dynamically scale and balance loads enables it to adjust to unexpected surges in traffic or modifications in user behaviour without compromising system performance.
- **Operational Flexibility:** The system's capacity to dynamically scale and balance loads enables it to adjust to unexpected surges in traffic or modifications in user behaviour without compromising system performance.

## Making HPA Manifests:

### productsercvice-hpa:

```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: productservice-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: productservice-deployment 
  minReplicas: 2  
  maxReplicas: 5
  metrics:
  - type: Resource
    resource:
      name: cpu 
      target:
        type: Utilization
        averageUtilization: 50
```

### orderservice-hpa:

```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: orderservice-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: orderservice-deployment 
  minReplicas: 2  
  maxReplicas: 5
  metrics:
  - type: Resource
    resource:
      name: cpu  
      target:
        type: Utilization
        averageUtilization: 50
```

### userservice-hpa:

```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: userservice-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: userservice-deployment 
  minReplicas: 2  
  maxReplicas: 5
  metrics:
  - type: Resource
    resource:
      name: cpu 
      target:
        type: Utilization
        averageUtilization: 50
```

Apply the manifests using the following commands:

```bash
kubectl apply -f productservice-hpa.yaml
kubectl apply -f orderservice-hpa.yaml
kubectl apply -f userservice-hpa.yaml
```

This establishes autoscaling for all the microservices running on AWS.

1. **Service Abstraction:** Kubernetes abstracts pods into services, which are addressed by distinct IP addresses and DNS names.
2. **LoadBalancer Service Type:** Using an AWS ELB, Kubernetes **{LoadBalancer}** services divide incoming external traffic among several pods.
3. **Traffic Distribution:** To ensure effective resource usage and high availability, load balancers employ algorithms to divide requests among pods equally.
4. **Dynamic Scaling Awareness:** Load balancers modify traffic allocation in response to variations in pod availability brought about by dynamic scaling.
5. **Internal Load Balancing:** Load balancing controls traffic between services inside the cluster in addition to external traffic.

---

# Monitoring and Logging:

### **1. Enhanced Visibility and Insights:**

- **Real-time Monitoring:** Continuous monitoring helps identify problems early by giving insight into each microservice's health and performance.
- **Metrics Analysis:** Metrics enable proactive detection of bottlenecks or inefficiencies by observing service behaviour, resource utilisation, and performance trends.

### **2. Rapid Issue Detection and Resolution:**

- **Alerting Mechanisms:** Monitoring tools enable quick responses to any problems by setting up warnings for unusual behaviour or performance abnormalities.
- **Logging for Troubleshooting:** Logs help with fast problem detection and resolution by capturing comprehensive information about system behaviour and faults.

### **3. Performance Optimization:**

- **Resource Allocation:** Metric monitoring enables resource allocation optimisation by pointing out underutilised or overworked microservices.
- **Bottleneck Identification:** Metrics and logs aid in identifying performance bottlenecks so that focused optimisations can be made to improve system performance as a whole.

### **4. Proactive Capacity Planning:**

- **Scalability Insights:** Metrics give information about workload trends, which helps decision-makers scale microservices according to demand projections.
- **Resource Management:** Recognise the resources you'll require and schedule resource scaling to handle expansion or unexpected increases in demand.

### **5. Improved Reliability and Availability:**

- **Fault Detection and Recovery:** Rapid defect detection and recovery are facilitated by comprehensive logs and immediate notifications, which raise system reliability overall.
- **Uptime Monitoring:** By tracking service uptime, continuous monitoring contributes to the system's high availability and dependability.

### **6. Compliance and Auditing:**

- **Comprehensive Logging:** By offering thorough records of system actions and guaranteeing conformance to regulatory standards, log data helps compliance auditing.

Application insight creation

![Untitled](Swift-Shop%20E-Commerce%20Store%20Assignment#2%203fb4a7b460f6482192eb930a6306753b/Untitled%209.png)

EKS Selection

![Untitled](Swift-Shop%20E-Commerce%20Store%20Assignment#2%203fb4a7b460f6482192eb930a6306753b/Untitled%2010.png)

Instance creation:

![Untitled](Swift-Shop%20E-Commerce%20Store%20Assignment#2%203fb4a7b460f6482192eb930a6306753b/Untitled%2011.png)

---

# GitHub Link:

[https://github.com/itsdivyanshjha/Swift-Shop.git](https://github.com/itsdivyanshjha/Swift-Shop.git)
