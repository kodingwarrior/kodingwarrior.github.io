2024-10-03
---


## Rails


### Solid Queue
- 데이터베이스 하나 짜리에다가 Solid Queue 세팅하는 방법  https://github.com/rails/solid_queue/?tab=readme-ov-file#single-database-configuration
- Solid Queue는 데이터베이스를 배치 작업에 필요한 메시지 큐의 백엔드로 활용할 수 있게 하는 라이브러리
  - Rails 8.0에 표준으로 들어가게 될 라이브러리인데 찍먹을 하고 있는 중


SolidQueue를 이용하려면 여러개의 Actor를 구성해야 함. 
- Worker : 큐에 밀려있는 것들을 ready to run 상태로 바꾸고 그것을 처리하는 역할.
  - SolidQueue::ReadyExecution 인스턴스를 만드는 역할 
- Dispatchers : ready to run인 상태인 작업들을 선택하고 이것들을 SolidQueue::ScheduledExecution 인스턴스로 만드는 역할.
- Scheduler : recurring task를 관리하는 역할이며, due가 다가왔을때 큐에 밀어넣는 역할 
- Supervisor : worker, dispatcher가 configuration에 따라 잘 동작하고 있는지 감시하는 역할. heartbeat를 관리하고, 필요하다면 멈추거나 시작할 수 있음.


Solid Queue's supervisor will fork a separate process for each supervised worker/dispatcher/scheduler.



#### Solid Queue 구성 요소 
Solid Queue를 통해서 만들어지는 테이블은 아래와 같음 
- solid_queue_blocked_executions
- solid_queue_claimed_executions
- solid_queue_failed_executions
- solid_queue_jobs
- solid_queue_pauses
- solid_queue_processes
- solid_queue_ready_executions
- solid_queue_recurring_executions
- solid_queue_recurring_tasks 
- solid_queue_scheduled_executions
- solid_queue_semaphores



#### 야매로 돌려보고 분석한 결과 나열
XXJob.perform을 실행할때 생겨나는 일
1. SolidQueue::Job 인스턴스가 만들어지고
2. SolidQueue::ReadyExecution 인스턴스가 만들어진다.

프로세스를 시작할때 쿼리가 실행되는 과정

```
/*
* Supervisor
*
*/
  TRANSACTION (0.3ms)  BEGIN
  SolidQueue::Process Create (9.8ms)  INSERT INTO "solid_queue_processes" ("kind", "last_heartbeat_at", "supervisor_id", "pid", "hostname", "metadata", "created_at", "name") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id"  [["kind", "Supervisor"], ["last_heartbeat_at", "2024-10-03 05:21:08.017086"], ["supervisor_id", nil], ["pid", 24228], ["hostname", "81a99adfc3a7"], ["metadata", nil], ["created_at", "2024-10-03 05:21:08.113309"], ["name", "supervisor-633429b0420d58f523c9"]]
  TRANSACTION (0.7ms)  COMMIT
SolidQueue-1.0.0 Register Supervisor (131.9ms)  pid: 24228, hostname: "81a99adfc3a7", process_id: 1, name: "supervisor-633429b0420d58f523c9"
  SolidQueue::ClaimedExecution Load (0.6ms)  SELECT "solid_queue_claimed_executions".* FROM "solid_queue_claimed_executions" LEFT OUTER JOIN "solid_queue_processes" ON "solid_queue_processes"."id" = "solid_queue_claimed_executions"."process_id" WHERE "solid_queue_processes"."id" IS NULL
SolidQueue-1.0.0 Fail claimed jobs (14.4ms)  job_ids: [], process_ids: []
SolidQueue-1.0.0 Started Supervisor (214.4ms)  pid: 24228, hostname: "81a99adfc3a7", process_id: 1, name: "supervisor-633429b0420d58f523c9"
  SolidQueue::Process Load (0.8ms)  SELECT "solid_queue_processes".* FROM "solid_queue_processes" WHERE "solid_queue_processes"."last_heartbeat_at" <= $1 AND "solid_queue_processes"."id" != $2 ORDER BY "solid_queue_processes"."id" ASC LIMIT $3 FOR UPDATE SKIP LOCKED  [["last_heartbeat_at", "2024-10-03 05:16:08.252583"], ["id", 1], ["LIMIT", 50]]
SolidQueue-1.0.0 Prune dead processes (14.4ms)  size: 0

/*
*
* Dispatcher
*
*/

  TRANSACTION (0.0ms)  BEGIN
  SolidQueue::Process Create (24.3ms)  INSERT INTO "solid_queue_processes" ("kind", "last_heartbeat_at", "supervisor_id", "pid", "hostname", "metadata", "created_at", "name") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id"  [["kind", "Dispatcher"], ["last_heartbeat_at", "2024-10-03 05:21:08.236467"], ["supervisor_id", 1], ["pid", 24237], ["hostname", "81a99adfc3a7"], ["metadata", "{\"polling_interval\":1,\"batch_size\":500,\"concurrency_maintenance_interval\":600}"], ["created_at", "2024-10-03 05:21:08.252235"], ["name", "dispatcher-744fe29948f007678884"]]
  TRANSACTION (0.6ms)  COMMIT
  TRANSACTION (0.0ms)  BEGIN
SolidQueue-1.0.0 Register Dispatcher (49.8ms)  pid: 24237, hostname: "81a99adfc3a7", process_id: 2, name: "dispatcher-744fe29948f007678884"

/**
*
* Worker
* 
*/

  SolidQueue::Process Create (24.0ms)  INSERT INTO "solid_queue_processes" ("kind", "last_heartbeat_at", "supervisor_id", "pid", "hostname", "metadata", "created_at", "name") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id"  [["kind", "Worker"], ["last_heartbeat_at", "2024-10-03 05:21:08.251287"], ["supervisor_id", 1], ["pid", 24240], ["hostname", "81a99adfc3a7"], ["metadata", "{\"polling_interval\":0.1,\"queues\":\"*\",\"thread_pool_size\":3}"], ["created_at", "2024-10-03 05:21:08.261007"], ["name", "worker-cecda23c162b5f064ef2"]]
  TRANSACTION (0.6ms)  COMMIT
SolidQueue-1.0.0 Register Worker (39.2ms)  pid: 24240, hostname: "81a99adfc3a7", process_id: 3, name: "worker-cecda23c162b5f064ef2"
SolidQueue-1.0.0 Started Dispatcher (53.0ms)  pid: 24237, hostname: "81a99adfc3a7", process_id: 2, name: "dispatcher-744fe29948f007678884", polling_interval: 1, batch_size: 500, concurrency_maintenance_interval: 600
SolidQueue-1.0.0 Started Worker (43.4ms)  pid: 24240, hostname: "81a99adfc3a7", process_id: 3, name: "worker-cecda23c162b5f064ef2", polling_interval: 0.1, queues: "*", thread_pool_size: 3
  SolidQueue::Semaphore Ids (0.3ms)  SELECT "solid_queue_semaphores"."id" FROM "solid_queue_semaphores" WHERE "solid_queue_semaphores"."expires_at" < $1 ORDER BY "solid_queue_semaphores"."id" ASC LIMIT $2  [["expires_at", "2024-10-03 05:21:08.299214"], ["LIMIT", 500]]
  SolidQueue::BlockedExecution Pluck (0.5ms)  SELECT DISTINCT "solid_queue_blocked_executions"."concurrency_key" FROM "solid_queue_blocked_executions" WHERE "solid_queue_blocked_executions"."expires_at" < $1 LIMIT $2  [["expires_at", "2024-10-03 05:21:08.323942"], ["LIMIT", 500]]
SolidQueue-1.0.0 Unblock jobs (16.3ms)  limit: 500, size: 0
  SolidQueue::Job Load (0.1ms)  SELECT "solid_queue_jobs".* FROM "solid_queue_jobs" WHERE "solid_queue_jobs"."id" = $1 LIMIT $2  [["id", 1], ["LIMIT", 1]]
[ActiveJob] [DemoJob] [9413180d-6a99-4f67-b647-928e56a5287b] Performing DemoJob (Job ID: 9413180d-6a99-4f67-b647-928e56a5287b) from SolidQueue(default) enqueued at 2024-10-03T05:10:11.342150320Z
```

간단한 Job을 큐에 밀어넣을때 일어나는 일
```
  SolidQueue::Job Load (0.2ms)  SELECT "solid_queue_jobs".* FROM "solid_queue_jobs" WHERE "solid_queue_jobs"."id" = $1 LIMIT $2  [["id", 2], ["LIMIT", 1]]
[ActiveJob] [DemoJob] [5d67b5fe-64c7-4e6f-91ce-5a0ba22ef466] Performing DemoJob (Job ID: 5d67b5fe-64c7-4e6f-91ce-5a0ba22ef466) from SolidQueue(default) enqueued at 2024-10-03T05:27:29.059498164Z
"helloworld"
[ActiveJob] [DemoJob] [5d67b5fe-64c7-4e6f-91ce-5a0ba22ef466] Performed DemoJob (Job ID: 5d67b5fe-64c7-4e6f-91ce-5a0ba22ef466) from SolidQueue(default) in 0.67ms
  TRANSACTION (0.1ms)  BEGIN
  SolidQueue::Job Update (0.9ms)  UPDATE "solid_queue_jobs" SET "updated_at" = $1, "finished_at" = $2 WHERE "solid_queue_jobs"."id" = $3  [["updated_at", "2024-10-03 05:27:29.215354"], ["finished_at", "2024-10-03 05:27:29.215354"], ["id", 2]]
  SolidQueue::ClaimedExecution Destr
```


주기적으로 heartbeat를 보내는 과정에서 실행되는 쿼리 
```
  TRANSACTION (0.5ms)  BEGIN
  SolidQueue::Process Load (3.8ms)  SELECT "solid_queue_processes".* FROM "solid_queue_processes" WHERE "solid_queue_processes"."id" = $1 LIMIT $2 FOR UPDATE  [["id", 1], ["LIMIT", 1]]
  SolidQueue::Process Update (0.4ms)  UPDATE "solid_queue_processes" SET "last_heartbeat_at" = $1 WHERE "solid_queue_processes"."id" = $2  [["last_heartbeat_at", "2024-10-03 05:22:08.170679"], ["id", 1]]
  TRANSACTION (6.5ms)  COMMIT
  TRANSACTION (0.2ms)  BEGIN
  SolidQueue::Process Load (1.9ms)  SELECT "solid_queue_processes".* FROM "solid_queue_processes" WHERE "solid_queue_processes"."id" = $1 LIMIT $2 FOR UPDATE  [["id", 2], ["LIMIT", 1]]
  TRANSACTION (0.2ms)  BEGIN
  SolidQueue::Process Update (0.3ms)  UPDATE "solid_queue_processes" SET "last_heartbeat_at" = $1 WHERE "solid_queue_processes"."id" = $2  [["last_heartbeat_at", "2024-10-03 05:22:08.317722"], ["id", 2]]
  SolidQueue::Process Load (3.0ms)  SELECT "solid_queue_processes".* FROM "solid_queue_processes" WHERE "solid_queue_processes"."id" = $1 LIMIT $2 FOR UPDATE  [["id", 3], ["LIMIT", 1]]
  TRANSACTION (0.9ms)  COMMIT
  SolidQueue::Process Update (0.2ms)  UPDATE "solid_queue_processes" SET "last_heartbeat_at" = $1 WHERE "solid_queue_processes"."id" = $2  [["last_heartbeat_at", "2024-10-03 05:22:08.326906"], ["id", 3]]
  TRANSACTION (0.5ms)  COMMIT
  TRANSACTION (0.2ms)  BEGIN
  SolidQueue::Process Load (2.9ms)  SELECT "solid_queue_processes".* FROM "solid_queue_processes" WHERE "solid_queue_processes"."id" = $1 LIMIT $2 FOR UPDATE  [["id", 1], ["LIMIT", 1]]
  SolidQueue::Process Update (0.4ms)  UPDATE "solid_queue_processes" SET "last_heartbeat_at" = $1 WHERE "solid_queue_processes"."id" = $2  [["last_heartbeat_at", "2024-10-03 05:23:08.203789"], ["id", 1]]
  TRANSACTION (6.6ms)  COMMIT
  TRANSACTION (0.2ms)  BEGIN
  TRANSACTION (0.2ms)  BEGIN
  SolidQueue::Process Load (2.2ms)  SELECT "solid_queue_processes".* FROM "solid_queue_processes" WHERE "solid_queue_processes"."id" = $1 LIMIT $2 FOR UPDATE  [["id", 3], ["LIMIT", 1]]
  SolidQueue::Process Update (0.3ms)  UPDATE "solid_queue_processes" SET "last_heartbeat_at" = $1 WHERE "solid_queue_processes"."id" = $2  [["last_heartbeat_at", "2024-10-03 05:23:08.341968"], ["id", 3]]
  SolidQueue::Process Load (2.4ms)  SELECT "solid_queue_processes".* FROM "solid_queue_processes" WHERE "solid_queue_processes"."id" = $1 LIMIT $2 FOR UPDATE  [["id", 2], ["LIMIT", 1]]
  SolidQueue::Process Update (0.5ms)  UPDATE "solid_queue_processes" SET "last_heartbeat_at" = $1 WHERE "solid_queue_processes"."id" = $2  [["last_heartbeat_at", "2024-10-03 05:23:08.349909"], ["id", 2]]
  TRANSACTION (0.7ms)  COMMIT
  TRANSACTION (0.8ms)  COMMIT
```


#### SolidQueue를 한 서버에서 가성비 있게 쥐어짜내기

SolidQueue supervisor가 puma와 같이 실행되게 하기 위해서는 puma configuration에서 아래와 같이 명시를 해주면 된다.


```ruby
plugin :solid_queue
```


SolidQueue에서 perform_later를 그냥 넘겨주면 ReadyExecution 인스턴스가 만들어지고,
시점을 예약 걸어둘고 perform_later 메서드를 호출하면 ScheduledExecution 인스턴스가 만들어진다.


ActiveJob
- 몇분/몇시간 뒤에 실행되게 하려면 아래와 같이 실행하면 된다.

```ruby
# Enqueue a job to be performed tomorrow at noon.
GuestsCleanupJob.set(wait_until: Date.tomorrow.noon).perform_later(guest)
```


#### SolidQueue 대시보드 구축하기

SolidQueue 자체로는 대시보드를 제공하지는 않지만, mission_control-jobs 라는 것을 대시보드로 활용할 수 있다.


#### CronJob 돌리기 

```
Solid Queue supports defining recurring tasks that run at specific times in the future, on a regular basis like cron jobs. These are managed by the scheduler process and are defined in their own configuration file. By default, the file is located in config/recurring.yml, but you can set a different path using the environment variable SOLID_QUEUE_RECURRING_SCHEDULE or by using the --recurring_schedule_file option with bin/jobs
```

recurring.yml에서 아래와 같이 설정할 수 있다. schedule을 어떻게 설정하는지는 [Fugit](https://github.com/floraison/fugit)을 참고하면 된다. 자연어를 어떻게 인식하는지도 저걸 보면 답이 나온다.

```yaml
production:
  a_periodic_job:
    class: MyJob
    args: [ 42, { status: "custom_status" } ]
    schedule: every second
  a_cleanup_task:
    command: "DeletedStuff.clear_all"
    schedule: every day at 9am
```







