#!/usr/bin/env bash
set -e

if [[ -z "$DATABASE_USER" || -z "$DATABASE_PASSWORD" || -z "$DATABASE_NAME" || -z "$DATABASE_DIR" ]]; then
    echo "Your environment is not set. Please source the appropriate environment file."
    exit 1
fi

if [ ! -d "$DATABASE_DIR" ]; then
    mkdir -p "$DATABASE_DIR"
    PGPASSWORD="$DATABASE_PASSWORD" initdb -U "$DATABASE_USER" -D "$DATABASE_DIR"
else
    echo "Database already exists!"
fi