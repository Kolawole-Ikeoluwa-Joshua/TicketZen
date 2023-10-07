# Ticketing service (Create-Read-Update-Destroy Server Setup)

Setup project directory, find checklist of processes below:

- Create package.json & install dependencies
- Write Dockefile
- Create index.ts to run project
- Build docker image and push to dockerhub, only if k8s is running locally skaffold will require prebuilt images (optional if k8s on GCP)
- Write k8s file for deployment, service
- Update skaffold.yaml to do file sync for tickets
- Write k8s file for MongoDB deployment service
- Implement TDD

Note: Most of these checklists were done when creating the Auth service, so you can refactor
the boilerplate codes from that directory
