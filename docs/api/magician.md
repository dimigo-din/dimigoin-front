# Magician

## magician

반복되는 HTTP 에러 처리 코드를 해결하기 위해 작성한 모듈입니다.

### magician\(action, handler\)

magician은 axios의 예외 처리를 처리하도록 설계되었습니다. 아래는 모듈 전문입니다.

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
