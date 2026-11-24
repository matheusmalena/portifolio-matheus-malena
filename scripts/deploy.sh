#!/usr/bin/env sh
# Atualiza o portfólio a partir do GitHub (somente se houver commits novos).
# Manual: ./scripts/deploy.sh   (--force reconstrói mesmo sem mudanças)
set -eu
cd "$(dirname "$0")/.."
BRANCH="${DEPLOY_BRANCH:-main}"
LOCK=/tmp/portfolio-deploy.lock
LOG_PREFIX="[$(date '+%Y-%m-%d %H:%M:%S')]"

exec 9>"$LOCK"
if [ "${1:-}" = "--force" ]; then
  flock -w 900 9 || { echo "$LOG_PREFIX Outro deploy demorou demais."; exit 1; }
elif ! flock -n 9; then
  exit 0
fi

git fetch -q origin "$BRANCH"
LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse "origin/$BRANCH")"
if [ "$LOCAL" = "$REMOTE" ] && [ "${1:-}" != "--force" ]; then exit 0; fi

echo "$LOG_PREFIX Atualizando ${LOCAL%"${LOCAL#???????}"} -> ${REMOTE%"${REMOTE#???????}"}"
git merge -q --ff-only "origin/$BRANCH"

docker compose build -q
docker compose up -d --remove-orphans
docker image prune -f >/dev/null

for i in $(seq 1 12); do
  if [ "$(docker compose ps web --format '{{.Health}}')" = "healthy" ]; then
    echo "$LOG_PREFIX Deploy concluído: $(git log -1 --pretty='%h %s')"
    exit 0
  fi
  sleep 5
done
echo "$LOG_PREFIX ATENÇÃO: o container não ficou saudável. Veja: docker compose logs web --tail 100"
exit 1
