# 개발 시작하기

## 시작해봅시다

아래 프로그램들이 설치되어 있어야 합니다.

* Git
* Node.js &gt;= 8.9
* Yarn
* 좋아하는 코드 에디터

먼저 깃허브에서 소스코드를 클론받습니다.

```bash
git clone https://github.com/dimigoin/dimigoin-front
cd dimigoin-front
```

그리고 Yarn으로 의존성 모듈을 설치합니다.

```bash
yarn install
```

 그리고 좋아하는 코드 에디터로 폴더를 열어서 프로젝트 구조를 훑어봅니다.

```text
dimigoin-front
├─.circleci - CircleCI의 테스트/배포 관련
├─app
│  ├─assets - 에셋(이미지)
│  │  └─avatar
│  ├─components
│  ├─dimiru - 디미고인 UI 컴포넌트
│  │  ├─components
│  │  └─scss
│  ├─mixins - Vue 믹스인
│  ├─pages - 페이지들
│  │  └─paths - 경로별 페이지들
│  │      ├─assignment
│  │      ├─auth
│  │      │  └─register
│  │      │      └─mixins
│  │      ├─management
│  │      ├─meal
│  │      └─request
│  ├─router - 라우터 관련
│  │  └─routers
│  ├─scss
│  │  └─components
│  ├─src - 비즈니스 로직
│  │  ├─api
│  │  │  ├─afterschool
│  │  │  ├─assignment
│  │  │  ├─...
│  │  │  └─service
│  │  ├─errors
│  │  └─util
│  └─store - Vuex 스토어
│      └─modules
│          └─account
├─build - Webpack 빌드 관련
├─docs - Gitbook 문서 관련
├─env - 환경변수들
├─static - 정적 리소스
│  └─icons
└─test - test-e2e 관련
   ├─fixtures
   ├─plugins
   ├─specs
   └─support
```

### 환경변수

`env/` 폴더에 `.prod.env.example`, `.dev.env.example`, `.webpack.env.example` 파일이 환경변수 파일의 예시를 보여주고 있습니다. 개발을 시작하려면, 배포용 빌드 때 필요한 환경변수 파일 `.prod.env` , 개발 서버용 환경변수 파일 `.dev.env` , 그리고 최종 빌드 파일에는 포함되지 않는\(포함돼서는 안되는\) 웹팩 빌드 전용 환경변수 파일 `.webpack.env` 가 필요합니다. `.prod.env`, `.dev.env`, `.webpack.env` 에 각각 `.*.env.example` 파일의 변수들을 복사/붙여넣기 하여 채워주시기 바랍니다.

환경변수에 입력해야될 변수들은 [여기](etcs/env-setting.md)에 정리하였습니다.

## 코드 스타일

여러 사람들이 개발하는 프로젝트이기 때문에 통일된 코드 스타일은 필수적입니다. 자바스크립트 및 Vue.js 템플릿\(`.vue` 파일\) 코드 스타일은 ESLint로 관리하고 있으며, CSS/SCSS 코드 스타일은 Stylelint를 적용하고 있습니다.

자바스크립트 코드 스타일은 `.eslintrc` 파일에서 관리하고 있습니다. 자바스크립트에는 [standard](https://standardjs.com/)를, 뷰 템플릿에는 [eslint-plugin-vue ](https://www.npmjs.com/package/eslint-plugin-vue)에서 제공하는  `vue/recommended` 를 적용하고 있습니다. 

CSS/SCSS 코드 스타일은 `.stylelintrc` 에서 관리하고 있습니다. `.scss` 와 `.vue` 파일을 검사합니다. [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)와 [stylelint-order](https://www.npmjs.com/package/stylelint-order) 플러그인을 사용하고 있고, [stylelint-config-sass-guideline](https://www.npmjs.com/package/stylelint-config-sass-guidelines)을 상속받고 있습니다. 또한 커스텀 룰로 `selector-class-pattern` 에 정규식을 적용하여 [BEM 규칙](http://getbem.com/)을 따르도록 강제하고 있습니다. BEM을 포함한 CSS 개발 방법론에 관한 설명은 [이 글](http://wit.nts-corp.com/2015/04/16/3538)에 잘 나와있습니다.

```text
yarn lint:js # JS/Vue lint
yarn lint:css # SCSS/CSS lint
yarn lint # Lint All
```

코드 스타일은 웹팩 빌드 단계에서 `eslint-loader` 을 통해 강제하고 있고, [pre-commit](https://www.npmjs.com/package/pre-commit) 모듈을 사용하여 깃 커밋 실행 전에도 `yarn lint` 를 실행하도록 했습니다. 어떤 경우에서도 linting 규칙에 반하는 코드를 커밋하지 않도록 합니다.

## 브랜치 전략

디미고인 프론트의 브랜치 전략은 [Github-Flow](https://githubflow.github.io/)를 따릅니다. Github-Flow에 관한 쉬운 설명은 [이곳](https://ujuc.github.io/2015/12/16/git-flow-github-flow-gitlab-flow/)에서 확인하실 수 있습니다.

또한 지정된 메인테이너 외에는 master 브랜치로 바로 커밋하는 것을 절대 지양합니다. 아무리 급하더라도 항상 브랜치를 새로 파서 PR을 통해 코드 리뷰를 진행한 후 코드를 반영하도록 합니다.

## 커밋 메시지 규칙

디미고인 프론트의 커밋 메시지 규칙은 [Karma Git Commit Msg](https://karma-runner.github.io/3.0/dev/git-commit-msg.html)를 따릅니다.

커밋 메시지 규칙을 활용한 대표적인 사례로는 [Vue 공식 깃허브 레포](https://github.com/vuejs/vue)가 있습니다.

## 배포하기

디미고인 프론트의 배포는 자동화되어 있습니다. Github의 master 브랜치에 커밋이 생기면, CircleCI가 자동으로 빌드하여 지정된 서버에 SFTP로 배포합니다. CircleCI의 설정 파일은 `.circleci` 폴더에 담겨있으며, 해당 폴더 안에 있는 `deploy.js` 가 빌드된 파일을 서버로 배포하는 역할을 맡고 있습니다.
