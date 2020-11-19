/* eslint-disable no-param-reassign */

const { USER_POOL_ID } = process.env;

function mutateEventForgotPassword({ event, firstName }) {
  event.response.emailSubject = 'aws password reset';
  event.response.emailMessage = `<body>
  <div style="font-size: 1em">
    <p>Hi ${firstName}!</p>
    <p>We received a password reset request.</p>
    <p>The password recovery code is <strong>{####}</strong></p>
    <p>Thank you!</p>
    <p>Your aws!</p>
  </div>
  </body>`;

  return event;
}

function mutateEventSignUp({ event, firstName }) {
  event.response.emailSubject = 'Welcome to aws!';
  event.response.emailMessage = `<body>


  <div style="font-size: 1em">
    <p>Hi ${firstName}!</p>
    <p>You have successfully created a aws account!</p>
    <p>
    Please follow the link below to confirm your email address and complete registration.
    </p>

    <p>The password code is <strong>{####}</strong></p>

    <p>We are here to help. Please get in touch if you have any questions.</p>
    <p>We wish you a fantastic journey with aws!!</p>
    <p>Your aws!!</p>
    <p>
    PS: You did not create a BEST MUSIC COACH! account?
     Perhaps someone enetered your email by mistake. Please ignore this email.
    </p>
  </div>
  <br>
  </body> `;

  return event;
}

exports.handler = (event, _, callback) => {
  const {
    'custom:firstName': firstName,
  } = event.request.userAttributes;

  if (event.userPoolId === USER_POOL_ID) {
    if (event.triggerSource === 'CustomMessage_SignUp') {
      mutateEventSignUp({ event, firstName });

      callback(null, event);
    }

    if (event.triggerSource === 'CustomMessage_ForgotPassword') {
      const result = mutateEventForgotPassword({ event, firstName });

      callback(null, result);

    }

  }

};
