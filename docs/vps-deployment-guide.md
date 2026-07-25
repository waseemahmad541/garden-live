# Garden Live VPS Deployment Guide

Use this guide for a production VPS deployment of `gardenlive.in`.

## Recommended VPS

- Ubuntu 24.04 LTS.
- 2 vCPU and 4 GB RAM minimum.
- 4 vCPU and 8 GB RAM recommended.
- 40 GB SSD minimum.
- Docker Engine with Docker Compose plugin.
- DNS A records for `gardenlive.in` and `www.gardenlive.in`.

## Server Setup

```sh
sudo apt update
sudo apt install -y ca-certificates curl git ufw
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.asc >/dev/null
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

## Deploy

```sh
sudo mkdir -p /opt/garden-live
sudo chown -R "$USER:$USER" /opt/garden-live
cd /opt/garden-live
git clone <YOUR_REPOSITORY_URL> .
cp .env.production.example .env.production
```

Fill `.env.production`, then run:

```sh
sh deployment.sh
```

## Verify

```sh
sh ops/scripts/deploy-healthcheck.sh
sh ops/scripts/production-status.sh
curl -I https://gardenlive.in/
curl -I https://gardenlive.in/sitemap.xml
```

## Cron

```sh
mkdir -p logs backups
crontab ops/cron/garden-live.cron
```

## Update Release

```sh
cd /opt/garden-live
git pull
sh ops/scripts/backup-postgres.sh
sh deployment.sh
```

## Rollback

```sh
cd /opt/garden-live
git checkout <LAST_GOOD_COMMIT>
sh deployment.sh
```

Restore the database only when a migration or data operation must be reversed:

```sh
sh ops/scripts/restore-postgres.sh /opt/garden-live/backups/garden_live_TIMESTAMP.dump.gz
```
