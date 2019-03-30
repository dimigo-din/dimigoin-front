# Vue Router

## 기초 라우팅

Vue.js 기반 SPA 로 동작하는 디미고인은 Vue.js 공식 라우터인 vue-router 모듈을 사용하여 페이지 라우팅을 구현하고 있습니다. 해당 라우팅 관련 코드들은 `app/router` 폴더에 위치하고 있습니다.

`app/router/index.js` 에서는 `app/router/routers` 에 분할되어 있는 라우터들을 한 곳에 모아 실제로 라우팅이 동작하게 합니다. 이때 `spread operator` 를 사용합니다.

{% code-tabs %}
{% code-tabs-item title="app/router/index.js" %}
```javascript
...

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      meta: { title: 'DIMIGOIN' }
    },

    ...

    ...routers.auth,
    ...routers.request,
    ...routers.management,
    ...routers.teacher,
    ...routers.assignment,

    {
      path: '*',
      component: NotFound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

...
```
{% endcode-tabs-item %}
{% endcode-tabs %}

위 코드를 보면 라우터 로직 외에도 `scrollBehavior` 라는 함수가 있습니다. 해당 함수는 라우팅이 이루어질 때마다 스크롤 위치를 임의로 설정할 때 정의합니다. 디미고인 프론트는 새로운 라우팅 위치로 이동할 경우 스크롤을 맨 위로 옮기고, 브라우저의 뒤로가기/앞으로가기 기능을 사용한 경우 저장되어 있던 위치로 이동하도록 함수를 작성했습니다. `scrollBehavior` 함수에 대한 더 자세한 정보는 [여기서](https://router.vuejs.org/kr/guide/advanced/scroll-behavior.html) 확인할 수 있습니다. 

`app/router/index.js` 하단을 보면 아래와 같은 코드를 확인할 수 있습니다.

{% code-tabs %}
{% code-tabs-item title="app/router/index.js" %}
```javascript
...

const isLoggedIn = () => store.state.account.auth.isLoggedIn
const needVerify = () => store.state.account.auth.needVerify
const isIE = () => /MSIE |Trident\//.test(window.navigator.userAgent)

router.beforeEach((to, from, next) => {
  if (isIE()) {
    if (to.name === 'ienope') return next()
    else return next({ name: 'ienope' })
  }

  if (!/login|register/.test(to.path)) {
    if (!isLoggedIn()) return next({ name: 'login' })
    if (needVerify()) return next({ name: 'register/step/3' })
  }

  if (to.meta.draft) return next({ name: 'draft' })
  if (to.meta.title) document.title = to.meta.title
  next()
})

...
```
{% endcode-tabs-item %}
{% endcode-tabs %}

가장 위에서 정의한 `isLoggedIn` 함수는 글자 그대로 현재 로그인이 되어있는지 여부를 반환하는 함수고, `needVerify` 는 초기 회원가입에서 3번째 단계인 코드 인증이 필요한지 여부를 반환하는 함수입니다. `isIE` 는 인터넷 익스플로러인지 여부를 반환하는 함수입니다. 

아래는 위 코드에서 확인할 수 있는 라우터의 `beforeEach` 훅에서 하는 일들의 순서입니다. 라우터 lifecycle에 관해서는 여기서 더 자세한 정보를 확인할 수 있습니다.

1. 먼저 브라우저가 IE인지 확인하고, 맞다면 차단합니다.
2. 이동하려는 위치가 `/login` 혹은 `/register` 가 아닌데 로그인이 되어있지 않으면 로그인 페이지로 이동시키고, 로그인이 되어있지만 코드 인증이 필요한 경우 인증하는 페이지로 이동시킵니다.
3. 만약 개발 중인 페이지인 경우 \(`to.meta.draft`\) draft 페이지로 이동합니다.
4. 타이틀 정보가 있는 경우\(`to.meta.title`\) `document.title` 에 해당 타이틀을 할당합니다.

## 지연된 로딩

디미고인 프론트에서는 아직 요청하지 않은 페이지에 대해서 지연된 로딩\(lazy loading\)을 적용하여 초기 응답 속도를 개선했습니다. 아래는 예시입니다.

{% code-tabs %}
{% code-tabs-item title="app/router/routers/management.js" %}
```javascript
...

const ManageWrapper = () => import('@/pages/paths/management/ManageWrapper.vue')
const ManageMain = () => import('@/pages/paths/management/ManageMain.vue')
const ManageAssignment = () => import('@/pages/paths/management/ManageAssignment.vue')
const ManageAfterschool = () => import('@/pages/paths/management/ManageAfterschool.vue')
const ManageCounsel = () => import('@/pages/paths/management/ManageCounsel.vue')
const ManageIngang = () => import('@/pages/paths/management/ManageIngang.vue')
const ManageAnnouncement = () => import('@/pages/paths/management/ManageAnnouncement.vue')
const ManageCircle = () => import('@/pages/paths/management/ManageCircle.vue')
const ManageDets = () => import('@/pages/paths/management/ManageDets.vue')
const ManageBook = () => import('@/pages/paths/management/ManageBook.vue')
const ManageFreshman = () => import('@/pages/paths/management/ManageFreshman.vue')

...
```
{% endcode-tabs-item %}
{% endcode-tabs %}

`() => import( ... )` 를 사용하여 비동기 로딩을 구현하고 있습니다. 또한 Webpack 의 코드 분할 기능을 사용하기 위해 주석으로 `/* webpackChunkName: "service-management" */` 를 페이지 위치 앞에 붙여준 것을 확인할 수 있습니다. 같은 청크 이름을 지정하면 같은 파일에 묶여서 처리됩니다. 자세한 정보는 [여기](https://router.vuejs.org/kr/guide/advanced/lazy-loading.html)를 참고하세요.



