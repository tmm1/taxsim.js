taxsim.f.js: taxsim.f
	docker build . -t taxsim-build
	docker create --name taxsim-out taxsim-build
	docker cp taxsim-out:/app/taxsim.f.js .
	docker cp taxsim-out:/app/taxsim.f.wasm .
	docker rm -f taxsim-out
	docker rmi -f taxsim-build

prettier:
	prettier -w demo.html taxsim.js

.PHONY: prettier
