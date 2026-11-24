#!/usr/bin/env sh
# Instala o deploy automático (systemd timer): a cada 2 minutos o servidor verifica o GitHub
# e, se houver commits novos, atualiza o Portfólio sozinho. Remover: ./scripts/install-autodeploy.sh --remove
set -eu
cd "$(dirname "$0")/.."
DIR="$(pwd)"

if [ "${1:-}" = "--remove" ]; then
  systemctl disable --now portfolio-autodeploy.timer 2>/dev/null || true
  rm -f /etc/systemd/system/portfolio-autodeploy.service /etc/systemd/system/portfolio-autodeploy.timer
  systemctl daemon-reload
  echo "Deploy automático removido."
  exit 0
fi

cat > /etc/systemd/system/portfolio-autodeploy.service <<EOF
[Unit]
Description=Portfólio - deploy automático a partir do GitHub
After=docker.service network-online.target

[Service]
Type=oneshot
WorkingDirectory=$DIR
ExecStart=/bin/sh $DIR/scripts/deploy.sh
StandardOutput=append:$DIR/deploy.log
StandardError=append:$DIR/deploy.log
EOF

cat > /etc/systemd/system/portfolio-autodeploy.timer <<EOF
[Unit]
Description=Verifica atualizações do Portfólio a cada 2 minutos

[Timer]
OnBootSec=3min
OnUnitActiveSec=2min
Persistent=true

[Install]
WantedBy=timers.target
EOF

chmod +x scripts/*.sh
systemctl daemon-reload
systemctl enable --now portfolio-autodeploy.timer
echo "Deploy automático ativo. Histórico em $DIR/deploy.log"
systemctl list-timers portfolio-autodeploy.timer --no-pager | head -3
