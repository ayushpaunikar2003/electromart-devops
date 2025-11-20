# security/Dockerfile-checklist.md

- Use multi-stage builds to avoid shipping build tools.
- Use slim/minimal base images (alpine, distroless).
- Pin versions (e.g., node:18-alpine).
- Do not run as root — use USER.
- Do not copy secrets into images or use ARG for secrets.
- Keep image layers minimal and combine RUN steps to reduce layers.
- Set NODE_ENV=production for Node apps to reduce dev dependencies.
- Add a healthcheck where possible.
- Run a container image scan in CI (Trivy) and fail on CRITICAL by policy.
