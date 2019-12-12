# 환경변수 파일 설정하기

## .dev.env
개발 서버용 환경변수 파일입니다.

## .prod.env
배포용 빌드 때 필요한 환경변수 파일입니다.

## .webpack.env
최종 빌드 파일에는 포함되지 않는\(포함돼서는 안 되는\) 웹팩 빌드 전용 환경변수 파일입니다.

## 꼭 포함되어야 하는 변수
꼭 포함되어야 하는 변수는 API_URL, DIMIGO_API_URL, RECAPTCHA_SITE_KEY 입니다. 다른 변수들은 효율적으로 프론트엔드를 관리하기 위해 사용되는 서비스 변수이기 때문에 개발할 때 꼭 작성할 필요는 없습니다.

{% code-tabs %}
{% code-tabs-item title=".env" %}
```dotenv
API_URL=https://dev-api.dimigo.in
DIMIGO_API_URL=https://api.dimigo.hs.kr
RECAPTCHA_SITE_KEY=6LfuMkwUAAAAAKQ2n1fHZdxsdsRM7vwWl9LLbJZw
```
{% endcode-tabs-item %}
{% endcode-tabs %}

다른 변수들은 디미고인 깃랩 ```front.env```를 참고하시기 바랍니다.
