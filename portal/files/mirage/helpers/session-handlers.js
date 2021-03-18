import {
  Response
} from 'miragejs';

export function getSession(db, /* request */ ) {
  const userId = window.localStorage.getItem('sessionUserId');
  if (userId) {
    const user = db.users.find(userId);
    if (user) {
      return user;
    }
  }
  let errors = [];
  return new Response(422, {
    'Content-Type': 'application/vnd.api+json'
  }, {
    errors: errors
  });
}

export function postSession(db, request) {

  let body = JSON.parse(request.requestBody),
    email = body.data.attributes.email,
    result = db.users.where({
      email: email
    }),
    user,
      errors = [];

  if (body.data.attributes.password === 'wrongpassword') {

    errors.push({
      status: "422",
      source: {
        pointer: "/data/attributes/password"
      },
      title: "Invalid Attribute",
      detail: "Password is incorrect."
    });

    return new Response(422, {
      'Content-Type': 'application/vnd.api+json'
    }, {
      errors: errors
    });
  }

  if (result.length) {
    user = result.models[0];
    user.attrs.token = user.id;
    window.localStorage.setItem('sessionUserId', user.id);

    return user;
  }

  errors.push({
    status: "422",
    source: {
      pointer: "/data/attributes/email"
    },
    title: "Invalid Attribute",
    detail: "Email is incorrect."
  });

  return new Response(422, {
    'Content-Type': 'application/vnd.api+json'
  }, {
    errors: errors
  });

}

export function deleteSession( /*db, request*/ ) {
  return new Response(204, {
    'Content-Type': 'application/vnd.api+json'
  }, "");
}
