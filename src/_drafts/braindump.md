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



RecurringTask가 중복으로 들어가는 이슈가 있음.
그럴때는 SolidQueue::RecurringTask 모델을 뒤적뒤적 거려서 삭제하는 방향으로 해결할 수 있음





2024-10-15
------

## Flutter

Flutter에서 stack 안쪽에 있는 위젯에 터치 이벤트를 전달하고 싶을때는 IgnorePointer를 사용하면 된다.

IgnorePointer는 자식 위젯에게 터치 이벤트를 전달하지 않는다. 그래서 stack 위젯 안쪽에 있는 위젯에게 터치 이벤트를 전달하고 싶을때 사용하면 된다.

IgnorePointer는 본래는 hit test 결과를 무시하는 것이지만, 스냅 이벤트, 터치 이벤트 등등 이벤트 전파를 의도적으로 무시해야하는 경우에는 반드시 쓰는 것을 고려해볼 필요가 있다.

Stack은 특성상 가장 맨 뒤에 진열된 위젯이 가장 위에서 보이게 되며 그에 따라서, 터치 이벤트도 가장 위에 있는 위젯부터 전파되게 된다. 그래서 stack 위젯 안쪽에 있는 위젯에게 터치 이벤트를 전달해야 한다면, 가장 위쪽에 있는 위젯에다가 IgnorePointer를 먹여줘야만 하는 상황이 오게 된다.

```dart
      children: [
        Container(
          height: imageCarouselHeight,
          child: Container(
              width: double.infinity,
              height: imageCarouselHeight,
              // image changes when swiping
              child: PageView.builder(
                itemCount: images.length,
                pageSnapping: true,
                onPageChanged: (index) {
                  setState(() {
                    currentIndex = index;
                  });
                },
                physics: BouncingScrollPhysics(),
                itemBuilder: (context, index) {
                  return images[index];
                },
              )),
        ),
        IgnorePointer(
          child: Container(
            width: double.infinity,
            height: imageCarouselHeight,
            decoration: BoxDecoration(
                gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [Colors.black.withOpacity(0.5), Colors.transparent],
            )),
          ),
        ),
        IgnorePointer(
          child: Container(
              width: double.infinity,
              height: imageCarouselHeight,
              child: Column(children: [
                // remaining index and total images
                Spacer(),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SGContainer(
                      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      borderRadius: BorderRadius.circular(100),
                      color: Colors.black.withOpacity(0.5),
                      child: Row(
                        children: [
                          SGTypography.body(
                            "${currentIndex + 1}",
                            color: Colors.white,
                            weight: FontWeight.bold,
                          ),
                          SGTypography.body(
                            " / ${images.length}",
                            color: Colors.white.withOpacity(0.5),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 12),
              ])),
        ),
      ],

```



2024-10-26


----



# 기본을 잘하는 것이 힙한 것이다


> 나 또한 Boring Technology에 굉장히 찬성하는 입장이기 때문에, 편파적인 관점이 있다. Boring Technology 자체를 엄청 싫어하는 성향이라면 그냥 지나가도 좋을 것 같다. Boring Technology를 찬성하는 입장일 뿐, 업계의 최근 동향을 반영하는 것이 무조건 나쁘다고 생각하진 않는다. 다만, 불필요한 복잡성을 추가하는 것이 아닌지는 고려할 필요가 있다.

사람이라면 누구나 인정욕구라는 것이 있다. 내가 이 정도는 해낼 수 있다는 역량을 드러내기 위함이라던가 인터뷰에서 걸러지지 않기 위해서 지금 당장 실감이 나지 않는 것이라 할지라도 새로운 개념을 공부해야 겠다는 강박이 생기는 것은 어쩔 수가 없다. 그저 저마다의 생존방식이기 때문에 그러는 것일 뿐이다. 그게 자의에 의한 것이든 타의에 의한 것이든.

학원가라던가 일부 교육 업체에서는 특히 빅테크에서 일하려면 마이크로서비스 아키텍쳐를 알아야 하며, 대규모 트래픽을 감당할 수 있는 실력을 가져야 하는 것처럼 마케팅을 하고, 그런 경험이 없는 사람들에게 FOMO를 안겨주는 것이 마치 당연한 것처럼 관행이 이어져오고 있다. 업계에서 그런 사람들을 원하는 요구사항이 있다면, 교육업계도 그걸 반영하는 것이 어떻게 보면 당연한 일이다.

## 우리는 정말로 이게 필요한걸까?

한편으로는 의문이 드는 지점이 있다. **우리는 정말 필요해서 이것을 하고 있냐**는 점이다. 기술스택을 결정하는데 있어서는 저마다의 사정이 있고, 비즈니스의 관점에서 보았을 때 나름 합리적인 의사결정 과정이 있었을 수 있다. 하지만, 여러 사례들을 관찰해본 관점에서 봤을때, 개인으로서는? 그렇지 않은 경우가 많은 것 같다.


### 숨겨져 있는 복잡성

가령, 사이드 프로젝트 혹은 포트폴리오를 만들기 위해서 간단한 Todo 앱을 만든다고 가정하자. Todo 앱을 만든다고 하더라도, 웹 개발자로서는 백엔드 쪽으로 역량이 있다는 것을 어필할 수도 있고, 프론트엔드 쪽으로 역량이 있다는 것을 어필할 수도 있다. 혹은 기술을 가리지 않고 프로덕트를 완성하는데 의미를 두는 풀스택 엔지니어(좋게 말하면, Product Engineer)로서 어필할 수도 있을 것이다. 여기에서도 선택과 집중이 필요하다. 누군가는 Github Actions를 끼얹어서 클라우드 서비스를 통해 배포할 수도 있고, 누군가는 EC2에 SSH 접근해서 배포하는 식으로 접근할 수도 있다. 혹은, 리포지토리에 푸시만 넣으면 바로 배포가 되는 PaaS를 이용할 수도 있다.




채용공고에서 명시했고, 그에 맞게 과제를 하는 것이라면 분명 좋은 접근 방식일 수 있다. 다만, 제품을 만들때는 일부 기술스택은 우선순위가 그렇게 높지 않을 수도 있다.

#### 배포 방식 (혹은 인프라)

먼저, **배포방식**에 대해 살펴보자. PaaS가 장사가 잘 되는 이유가 무엇일지에 대해 생각해보자. 그것은 배포를 하는데 드는 인지부하와 불필요한 시간을 줄이고, 핵심적인 비즈니스 로직에 더 집중할 수 있게 보조하는 것에 의의가 있다. 어떤 인프라를 유지보수하고 있다면, 유지보수하는 주체가 조직 내부 구성원이 되거나 혹은 PaaS 업체에 외주 주거나로 관점을 바뀔 수 있다. 퍼포먼스를 최대한 쥐어짜내고 인프라 비용을 줄이기 위해서 조직 내부 구성원이 인프라를 유지보수한다면, 인프라를 AWS EC2에다가 바로 배포하는 방식으로

#### 아키텍쳐

**아키텍쳐**에 대해서도 알아보자. 빅테크 경험이 없는 입장에서 아키텍쳐를 논하는게 우습긴 하지만, 프레임워크에서 강제하는 아키텍쳐는 제쳐두더라도, 프레임워크에서 강제하지 않는 아키텍쳐로

마이크로서비스 아키텍쳐는 또 어떤가? DAU가 300명이 안되고 트래픽 분산이라는게 필요가 없는 규모에서는 모놀리스 아키텍쳐로 운영하는 것이 적당할 수도 있는데, Single Point of Failure 혹은 서비스의 확장성 내지는 Fault Tolerance의 사유를 들 수도 있다. 근데, 그게 마이크로서비스 아키텍쳐 만으로 가능하냐면 모르겠다. 정말 도입을 하는게 필연적인 요구사항이라면 맞을 수도 있을 것 같다.


#### 도입하는 기술 스택

시간이든 시간안에 쳐낼 수 있는 일의 양이든 모든 자원은 한정되어 있다. 이런 한정된 자원을 적제적소에 스케쥴링하는 것도 엔지니어로서의 역량이다. 핵심적으로 어필해야 하는 것을 제쳐두고, 불필요한 복잡도를 늘리면서 불필요한 곳에 시간을 잡아먹는 것은 지양할 필요가 있다.

### 우리에게 정말로 필요한 것

문제를 해결하는 사람의 관점에서 생각해보자. 우리가 가장 먼저 해결해야 하는 것은 무엇인가? 그것은 바로 눈 앞에 있는 과제를 해결하는 것이다. 고객이 있다면 고객과 충분히 대화하고 고객이 원하는 것을 충족시키는 핵심적인 기능을 만들고 가다듬는 것이다.

필요한 지점이 오면 그 때 하는 것이 최선의 방법이라고 본다.

## 우리는 본연에 충실할 필요가 있다

회사에서 제품을 만들든, 남들이 이용하기를 바라는 사이드 프로젝트를 만들든, 어느 정도 경험을 쌓았다면 다들 알게 되는 것이 있다. 기술적인 관점에서 접근하는 것이 전부는 아니라는 것이다. 우리 딴에는 "필요할 것 같은데?" 라고 생각을 하더라도, 고객 입장에서는 그렇지 않은 경우를 숱하게 보곤 한다.


이전에 [잘해야 한다는 강박이 얼마나 해로울 수 있는지](/posts/2024-08-02-do-not-try-unncecessary-hard-things) 앞서 언급한 적이 있다.



엔지니어로서의 자세에 대해

## 마치며

이런 글을 쓰기로 마음 먹게 된 계기를 말하자면, 의외로 타임라인에서 떠도는 얘기들을 관찰하면서 트리거가 된 것은 아니다. 일상에서 접하는 것들을 마주하면서 문득 떠오른 생각이었다.

2024년 11월 19일 [NeovimConf.live 2024](https://neovimconf.live) 에서도 위에서 언급한 주제와 비슷한 주제로(You don't need plugin, Long live command lines) 발표할 예정이다. 좋아보인다고 플러그인을 덕지덕지 붙여서 불필요한 복잡성을 늘리거나, 바퀴를 재발명할 바에는 터미널에서 Vim 에디터를 사용하는 입장에서 커맨드라인을 잘 사용하는 방법을 익히는 것이 도움이 될 수 있다는 관점으로 발표할 예정이다.





