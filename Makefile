.PHONY: clean build run bundle

PROJECT_DIR=project
IMAGE_NAME := uncmath25/phaser-example
REMOTE_WORKING_DIR=/usr/src/app
SERVER_PORT=8000
BUNDLE_DIR=dist

default: run

clean:
	@echo "*** Purging repo of unnecessary artifacts... ***"
	rm -rf $(BUNDLE_DIR)

build: clean
	@echo "*** Building npm docker image for phaser game... ***"
	docker build -t $(IMAGE_NAME) .

run: build
	@echo "*** Running the node game server... ***"
	@echo "*** View the server at http://localhost:8000 ***"
	docker run \
		--rm \
		-p $(SERVER_PORT):$(SERVER_PORT) \
		-v "$$(pwd)/assets/:$(REMOTE_WORKING_DIR)/assets/" \
		-v "$$(pwd)/src/:$(REMOTE_WORKING_DIR)/src/" \
		$(IMAGE_NAME) \
		npm start

bundle: build
	@echo "*** Bundling static js game deployment package ***"
	mkdir $(BUNDLE_DIR)
	docker run \
		--rm \
		-v "$$(pwd)/$(BUNDLE_DIR)/:$(REMOTE_WORKING_DIR)/$(BUNDLE_DIR)/" \
		$(IMAGE_NAME)
