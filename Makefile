python = python3
pip = pip

clean:
	rm -f -r .env

setup-backend: clean
	$(python) -m venv .env
	. .env/bin/activate
	$(pip) install -r backend/requirements.txt

start-backend: setup-backend
	$(python) backend/manage.py runserver

setup-frontend:
	cd frontend && \
	npm install

start-frontend: setup-frontend
	cd frontend && \
	npm start