# WhoKnewThis 🤔

**"모르는데요?"** 같은 주제들을 하나씩 던주어주는 랜덤 지식 탐험 서비스입니다.
매일 하나씩, 혹은 연관된 여러 지식들을 따라가며 간단히 배우고, 알아가요.

> **얕고 넓은 지식**
> A journey through things that you didn’t know.

---

## ✨ Features

* 랜덤 주제 추천 (daily or on-demand)
* 주제별 요약 및 키포인트 제공
* 연관 주제 기반 탐색 (Graph-style)
* 사용자별 진행 로그 기록

---

## 🧱 Tech Stack

| 영역                     | 기술                                 |
| ---------------------- | ---------------------------------- |
| Backend - AI 지식 추천 API | FastAPI + LangChain              |
| Backend - 서비스 API      | Spring Boot                       |
| Database               | MongoDB → 이후 ElasticSearch 연동     |
| Deployment             | Docker, Nginx, AWS                  |

---

## 🧪 Sample Topic

```json
{
  "title": "양자 얽힘",
  "summary": "두 입자가 공간을 초월해 연결되어 있는 양자 현상입니다.",
  "tags": ["물리학", "양자역학", "정보이론"],
  "related": ["양자 컴퓨팅", "슈뢰딩거의 고양이"]
}
```

---

## 🗺️ Roadmap

- [ ] 기본 FastAPI 지식 추천 API
- [ ] 랜덤 주제 추천
- [ ] 주제 간 연관 네비게이션 구현
- [ ] Mongo ↔ Elastic 연동
- [ ] 사용자 세션 및 기록 기반 추천