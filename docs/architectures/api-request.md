# API 요청

모든 API 요청은 `axios` 모듈을 사용합니다. API 요청은 주로 `api.dimigo.in` 과 `api.dimigo.hs.kr` 이 두 서버에 하게 됩니다. 전자는 디미고인에서 개발한 백엔드입니다. 해당 url에 웹 브라우저로 접속하면 문서를 확인할 수 있습니다. 후자는 디미고 교사인 박정진 선생님께서 유지보수 중인 API로, 학생 정보에 관한 API를 제공합니다. 계정 관련 API는 디미고인 백엔드에서 내부적으로 학교 API를 경유하고 있습니다.

### magician

반복되는 HTTP 에러 처리 코드를 해결하기 위해 작성한 모듈입니다. 아래는 모듈 전문입니다.

{% code-tabs %}
{% code-tabs-item title="magician.js" %}
```javascript
export default async (action, errorHandler) => {
  try {
    const res = await action()

    return res.data
  } catch (err) {
    console.warn(err)
    if (!err.response) throw new Error('네트워크에 문제가 있습니다.')

    const handler = errorHandler[err.response.status] ||
      errorHandler['default'] ||
      (() => new Error('알 수 없는 오류가 발생했으니 잠시 후 다시 시도해주세요.'))

    const value = handler()

    if (value instanceof Error) throw value
    else return value
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

 

