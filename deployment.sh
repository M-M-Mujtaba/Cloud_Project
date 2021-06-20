
kubectl apply -f yaml_files/secrets-file.yaml
kubectl apply -f yaml_files/configmap-file.yaml
kubectl apply -f yaml_files/mysql-pv.yaml
kubectl apply -f yaml_files/mysql-config.yaml 
kubectl apply -f yaml_files/backend-config.yaml 
kubectl apply -f yaml_files/admin-config.yaml 
kubectl apply -f yaml_files/employee-config.yaml 
sleep 3
kubectl port-forward --address=0.0.0.0 service/backend-service 30008:8000 & 
kubectl port-forward --address=0.0.0.0 service/admin-frontend-service  31000:80 & 
kubectl port-forward --address=0.0.0.0 service/admin-frontend-service  31500:80 & 