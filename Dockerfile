FROM node:22-bookworm-slim AS themes

WORKDIR /opt/CTFd

# Install theme dependencies first so they cache independently of theme sources.
COPY CTFd/themes/core/package.json CTFd/themes/core/yarn.lock CTFd/themes/core/
COPY CTFd/themes/admin/package.json CTFd/themes/admin/yarn.lock CTFd/themes/admin/
RUN yarn --cwd CTFd/themes/core install --frozen-lockfile \
    && yarn --cwd CTFd/themes/admin install --frozen-lockfile

COPY CTFd/themes CTFd/themes
RUN yarn --cwd CTFd/themes/core build \
    && yarn --cwd CTFd/themes/admin build


FROM python:3.11-slim-bookworm AS build

WORKDIR /opt/CTFd

# hadolint ignore=DL3008
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        libffi-dev \
        libssl-dev \
        git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && python -m venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"

COPY . /opt/CTFd

RUN pip install --no-cache-dir -r requirements.txt \
    && for d in CTFd/plugins/*; do \
        if [ -f "$d/requirements.txt" ]; then \
            pip install --no-cache-dir -r "$d/requirements.txt";\
        fi; \
    done;


FROM python:3.11-slim-bookworm AS release
WORKDIR /opt/CTFd

# hadolint ignore=DL3008
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libffi8 \
        libssl3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --chown=1001:1001 . /opt/CTFd

RUN useradd \
    --no-log-init \
    --shell /bin/bash \
    -u 1001 \
    ctfd \
    && mkdir -p /var/log/CTFd /var/uploads \
    && chown -R 1001:1001 /var/log/CTFd /var/uploads /opt/CTFd \
    && chmod +x /opt/CTFd/docker-entrypoint.sh

COPY --chown=1001:1001 --from=build /opt/venv /opt/venv
COPY --chown=1001:1001 --from=themes /opt/CTFd/CTFd/themes/core/static /opt/CTFd/CTFd/themes/core/static
COPY --chown=1001:1001 --from=themes /opt/CTFd/CTFd/themes/admin/static /opt/CTFd/CTFd/themes/admin/static
ENV PATH="/opt/venv/bin:$PATH"

USER 1001
EXPOSE 8000
ENTRYPOINT ["/opt/CTFd/docker-entrypoint.sh"]
