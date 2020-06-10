make:
	docker-compose up -d

run-mongo:
	docker exec -it microservices_mongo_1 bash

clean:
	docker-compose down
	docker image rmi -f microservices_crosswalk
	docker image rmi -f microservices_api_gateway
	docker image rmi -f microservices_distance
	docker image rmi -f microservices_notification-service
	docker image rmi -f microservices_vehicle
	docker image rmi -f microservices_pedestrian
	docker image rmi -f microservices_pubnub

