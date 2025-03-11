- up:
	git fetch
	git reset --hard
	git pull --rebase
	docker compose down
	docker compose build --no-cache
	docker compose up -d
