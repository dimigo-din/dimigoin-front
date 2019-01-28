# 배경 지식 학습

디미고인 프론트를 개발에 참여하기 위해서 사용된 기술에 대한 배경 지식이 요구됩니다.

## ES6+ 자바스크립트 활용

자바스크립트는 ECMA에서 발행하는 ECMAScript 라는 표준이 있습니다. 매년 새로운 표준이 나오고 있습니다. 예를 들어 2019년의 표준은 `ECMAScript 2019` 라고 연도와 함께 부르기도 하고, 줄여서 8번째 표준이라는 뜻으로 `ES8`이라고 부르기도 합니다.

디미고인에서는 효율적이고 가독성 높은 코드를 작성하기 위해 ES6 이상의 자바스크립트의 최신 문법들을 사용하고 있습니다. 이러한 최신 문법을 사용하기 위해서 [Babel](https://babeljs.io/) 이라는 자바스크립트 Preprocessor를 사용하고 있고, 자바스크립트 번들러인 [Webpack](https://webpack.js.org/)을 사용하고 있습니다.

### 관련 링크들

최신 문법에 대한 정보는 대부분 구글링을 통해서 습득할 수 있습니다. 도움이 될만한 링크를 아래에 남겨두겠습니다. 최소한 아래 내용은 모두 숙지해야 프로젝트를 이해하는데 무리가 없을 것이라고 생각합니다.

* [Vue.js 개발을 위한 주요 ES6 문법 4가지](https://joshua1988.github.io/web-development/translation/essential-es6-features-for-vuejs/)
* [ES6 문법으로 다시 시작하는 자바스크립트](https://hudi.kr/es6-%EB%AC%B8%EB%B2%95%EC%9C%BC%EB%A1%9C-%EB%8B%A4%EC%8B%9C-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/)
* [자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)
* [바보들을 위한 Promise 강의](https://programmingsummaries.tistory.com/325)
* [async/await 를 사용하기 전에 promise를 이해하기](https://medium.com/@kiwanjung/%EB%B2%88%EC%97%AD-async-await-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90-promise%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-955dbac2c4a4)
* [ES2017\(ES8\) async/await](https://www.zerocho.com/category/ECMAScript/post/58d142d8e6cda10018195f5a)
* [자바스크립트의 Async/Await 가 Promises를 사라지게 만들 수 있는 6가지 이유](https://medium.com/@constell99/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-async-await-%EA%B0%80-promises%EB%A5%BC-%EC%82%AC%EB%9D%BC%EC%A7%80%EA%B2%8C-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EB%8A%94-6%EA%B0%80%EC%A7%80-%EC%9D%B4%EC%9C%A0-c5fe0add656c)
* [async, await를 사용하여 비동기 javascript를 동기식으로 만들자](https://blueshw.github.io/2018/02/27/async-await/)

### Babel

현재 디미고인 프론트는 바벨을 사용하여 최신 문법을 프로젝트에 적용하고 있습니다. 현재 적용된 바벨의 버전은 6.x로, 빠른 시일 내에 최신 버전 7.x로 업데이트를 반드시 해야합니다. 아래는 프로젝트 루트에 위치하고 있는 바벨 설정파일의 전문입니다.

{% code-tabs %}
{% code-tabs-item title=".babelrc" %}
```javascript
{
  "compact": true,
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["last 2 versions", "safari >= 7"]
        }
      }
    ],
    "stage-1"
  ]
}

```
{% endcode-tabs-item %}
{% endcode-tabs %}

보다시피 stage-1 프리셋이 적용되어 있습니다. 바벨 설정 파일에 대한 문서는 [여기](https://babeljs.io/docs/en/options)에서 참고해주시기 바랍니다.

## 프레임워크 / 라이브러리

디미고인 프론트는 개발 효율성을 위해 다양한 프레임워크를 사용하고 있습니다. 대표적으로 리액티브 UI 프레임워크인 Vue.js 를 사용하고 있고, 상태 관리를 위해 Vuex를 쓰고 있으며 SPA\(Single Page Application\) 라우팅을 위해 vue-router를 사용하고 있습니다. 또한 코드 번들링\(분할되어 있는 소스코드들을 배포할 수 있게 하나로 모아주는 행위\) 및 최적화를 돕는 Webpack과 관련 플러그인들을 함께 활용하고 있습니다. 이 외에도 수많은 외부 의존성을 프로젝트에 도입하고 있으며, 특히 위에 나열한 라이브러리/프레임워크에 대해서는 수준 높은 이해가 요구됩니다. 학습은 공식 문서를 통해 진행하는 것을 권장합니다. 아래는 그 목록입니다.

* [Vue.js 공식 문서](https://kr.vuejs.org/)
* [Vuex 공식 문서](https://vuex.vuejs.org/kr/)
* [Vue Router 공식 문서](https://router.vuejs.org/kr/)
* [웹팩 공식 문서](https://webpack.js.org/)

## 아키텍쳐 / 디자인 패턴

### 함수형 프로그래밍

* [왜 JavaScript로 함수형 프로그래밍을 배우는가?](https://midojeong.github.io/2018/03/24/why-learn-functional-programming-in-javascript/)
* [자바스크립트로 함수형 프로그래밍 아주 살짝 맛보기](https://adhrinae.github.io/posts/functional-js-tutorial)
* [함수형 프로그래밍\(Functional Programming\)](https://www.zerocho.com/category/JavaScript/post/576cafb45eb04d4c1aa35078)

디미고인 프론트에서는 함수형 프로그래밍을 지향합니다. Vue.js 가 상태 변경을 추적해서 UI를 업데이트하기 때문에 함수형 프로그래밍의 이념과 충돌하는 부분이 분명 존재하나 함수형 프로그래밍을 프로젝트에 적절하게 도입해서 생산성, 가독성과 재사용성의 균형을 이룰 수 있도록 합시다.

### 디자인 패턴

* [Javascript Pattern 요약](https://joshua1988.github.io/web-development/javascript/javascript-pattern-design/)
* 
