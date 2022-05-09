taxsim.js: taxsim.f wrapper.js Dockerfile
	docker build . -t taxsim-build
	docker create --name taxsim-out taxsim-build
	docker cp taxsim-out:/app/taxsim.js .
	docker cp taxsim-out:/app/taxsim.wasm .
	docker rm -f taxsim-out
	docker rmi -f taxsim-build
	cat wrapper.js >> taxsim.js

taxsim.f:
	@echo ERROR: taxsim.f not found.
	@echo You can request a copy by contacting the NBER via http://taxsim.nber.org
	@echo Place the file in this directory and re-run the command.
	@exit 1

prettier:
	prettier -w demo.html wrapper.js

.PHONY: prettier
