#!/bin/bash
# Nightly database dump.
#
# The charts table holds birth dates, birth times and coordinates — personal
# data under GDPR. Treat the dumps the same way: they are not just a convenience
# copy, and they should not sit somewhere world-readable.
#
# Install:
#   crontab -e
#   17 4 * * * /home/vlad/apps/siderachart/scripts/backup-db.sh >> /home/vlad/backups/siderachart/backup.log 2>&1
#
# Restore:
#   gunzip -c backup.sql.gz | docker compose ... exec -T db psql -U meridian -d meridian

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${BACKUP_DIR:-$HOME/backups/siderachart}"
KEEP_DAYS="${BACKUP_KEEP_DAYS:-14}"

# The overlay is needed here too: without it compose expects a proxy service
# that this host never starts.
COMPOSE_FILES=(-f docker-compose.yml)
[ -f "$PROJECT_DIR/docker-compose.shared-proxy.yml" ] && COMPOSE_FILES+=(-f docker-compose.shared-proxy.yml)

cd "$PROJECT_DIR"
mkdir -p "$OUT_DIR"
chmod 700 "$OUT_DIR"

STAMP=$(date +%F)
TARGET="$OUT_DIR/siderachart-$STAMP.sql.gz"

# Write to a temporary name first so an interrupted dump never replaces a good
# backup with a truncated one.
docker compose "${COMPOSE_FILES[@]}" exec -T db pg_dump -U meridian meridian | gzip > "$TARGET.partial"
mv "$TARGET.partial" "$TARGET"
chmod 600 "$TARGET"

find "$OUT_DIR" -name 'siderachart-*.sql.gz' -mtime "+$KEEP_DAYS" -delete

echo "$(date -Iseconds) ok $TARGET ($(du -h "$TARGET" | cut -f1))"
