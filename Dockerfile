
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system notetaker && \
          adduser --system -G notetaker notetaker

COPY dist/notetaker notetaker
RUN chown -R notetaker:notetaker .

RUN npm --prefix notetaker --omit=dev -f install

CMD [ "node", "notetaker" ]
