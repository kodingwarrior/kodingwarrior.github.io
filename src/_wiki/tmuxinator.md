---
title: tmuxinator
date:  2023-01-20
layout: wiki
---

터미널에서 벗어나지 못하게 해준 장본인 중 하나라고 볼 수 있을 정도로 쓸만하다.

yml 설정파일에 어떤 명령어를 미리 실행할지 선언하는 것 만으로도 프로젝트 개발할때 필요한 사전작업이 기하급수적으로 줄게 된다. 

주로 사용하는 명령어는 `tmuxinator start -p foobar.yml`.

## Configuration file Example

```yaml
# Tmuxinator configuration for Team Foobar's Awesome project Application

name: project
root: ~/team-foobar/

windows:
  - backend:
      layout: main-vertical
      panes:
        - cd ./project-api/ && export IS_MARIADB_DOCKERIZED=true && vim .
  - frontend:
      layout: main-vertical
      panes:
        - cd ./project-front/ && vim .
  - debugging:
      layout: main-vertical
      panes:
        - cd ./project-api/ && export IS_MARIADB_DOCKERIZED=true && ./bin/dev
        - export API_URL=http://localhost:3001 && export WEB_URL=http://localhost:3000 && export TOSS_CLIENT_KEY=test_ck_xxxxxxxx && cd ./project-front/ && yarn dev
        - cd ./project-api/ && export IS_MARIADB_DOCKERIZED=true && rails c
        - cd ./project-api/ && docker-compose up
```
