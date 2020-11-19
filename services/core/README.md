### RUN DEVELOPMENT VERSION
1. Run in root of project
```bash 
npm install
```

2. Installing PostgreSQL
```bash 
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql

create database aws;
create user aws with encrypted password 'aws';
grant all privileges on database aws to aws;
ALTER USER aws WITH SUPERUSER;

```

3. Run migration 
```bash 
npm run db:setup
```

4. Run local 
- Go to services/infrastructure/rds/src/aws/src/DbConnection.ts and change config (maybe you wanna your existing user)

```bash
npm run nodemon
```
