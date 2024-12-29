FROM traefik:v3.2.3

ADD *.yml ./

RUN mkdir data && touch /data/acme.json && chmod 600 /data/acme.json