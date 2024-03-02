DATABASE_IN_DOCKER := 0

.PHONY: clean
clean:
	rm -r venv
	rm -r web/node_modules

.PHONY: fmt
fmt: fmt-server fmt-web

.PHONY: fmt-server
fmt-server:
	black server/

.PHONY: fmt-web
fmt-web:
	cd web && yarn run format

.PHONY: venv
venv:
	@[ ! -d venv ] && python3 -m venv venv

.PHONY: install-web
install-web:
	cd web && yarn install

.PHONY: install-server
install-server:
	cd server && pip install -r requirements.txt

.PHONY: install
install: install-web install-server

.PHONY: build-web
build-web:
	cd web && yarn run build

.PHONY: build-server
build-server:
	docker build . -t sniff:latest

.PHONY: build
build: build-web build-server

.PHONY: dev-deps
dev-deps:
	@if [ "$(DATABASE_IN_DOCKER)" = "1" ]; then \
		docker run --rm -e POSTGRES_PASSWORD=$(DATABASE_PASSWORD) -v my_dbdata:/var/lib/postgresql/data -p 5432:5432 -d postgres; \
	else \	
		./scripts/initdb.sh; \
		POSTGRES_PASSWORD=$(DATABASE_PASSWORD) pg_ctl -D $(HOME)/.postgres/data -l logfile start; \
	fi

.PHONY: start-server
start-server:
	cd server && flask run

.PHONY: start-web
start-web:
	cd web && yarn run start
