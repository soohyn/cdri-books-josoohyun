# CDRI Books JoSoohyun
> CDRI 과제 프로젝트 레포지토리 입니다

## 프로젝트 개요
CDRI Books는 도서 검색 및 탐색 기능을 제공하는 웹 애플리케이션입니다.
외부 도서 검색 API를 활용하여 책 정보를 조회하고,
사용자는 검색 결과를 무한 스크롤로 탐색할 수 있습니다.

본 프로젝트는 React + TypeScript 기반의 과제로 React Query 라이브러리르 주로 사용하였습니다.

## 실행 방법 및 환경 설정
1. 프로젝트 실행
```
npm install
npm run dev
```

2. 환경변수 파일 설정
```
# .env
VITE_KAKAO_REST_API_KEY={YOUR_API_KEY}
```

## 폴더 구조 및 주요 코드 설명
```text
├── src
│   ├── api # 도서 검색 API 함수
│   ├── assets # 사용된 asset 들
│   ├── components # 재사용 가능한 UI 컴포넌트들
│   ├── hooks # 커스텀 훅
│   ├── lib # 라이브러리 파일
│   ├── pages # 페이지 단위 컴포넌트
│   ├── styles # 스타일 파일
│   ├── types # 공통 타입 정의 파일
│   ├── utils # 공통 유틸 함수
│   ├── main.tsx  # 애플리케이션 진입점
│   ├── App.tsx # 라우팅을 담당하는 최상위 컴포넌트
│   └── Layout.tsx # 공통 레이아웃 (헤더)
```

- useLikeStorage
  - 커스텀 훅으로 like페이지와 search페이지에서 공통으로 사용되는 로직을 분리
  - 재사용성과 가독성을 높임

## 라이브러리 선택 이유
- tailwindcss
  - 보편적으로 많이 쓰는 라이브러리
  - 빠르게 구현이 가능한 점이 장점이라고 생각했습니다
  - CSS-in-JS 방식 대비 가벼운 점

## 강조 하고 싶은 기능
- 웹 접근성을 중요시 생각해 semantic tag 사용에 집중했습니다
- SearchBox 컴포넌트 구현 시 input의 focus, blur처리에서 사용자의 UX를 고려하여 여러번 수정을 거쳐 편리하게 만들었습니다