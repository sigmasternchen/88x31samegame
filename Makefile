build:
	npm run build

deploy: build
	echo "put public/*\nbye" | sshpass -p "${MAIN_FTP_PASSWORD}" sftp ${MAIN_FTP_USER}@${MAIN_FTP_HOST}

deploy-init: build
	echo "put -r public/*\nbye" | sshpass -p "${MAIN_FTP_PASSWORD}" sftp ${MAIN_FTP_USER}@${MAIN_FTP_HOST}
