export default function(schema, request) {

  const body = JSON.parse(request.requestBody),
    url = body.data.attributes.resource,
    token = 'foobar';

  return {
    "jsonapi": {
      "version": "1.0"
    },
    "data": {
      "type": "presign",
      "id": "1",
      "attributes": {
        "signed-resource": `${url}?${token}`,
        "signature": token,
        "resource": url
      }
    }
  }
}