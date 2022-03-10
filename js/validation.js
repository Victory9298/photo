new JustValidate('.form', {
  rules: {
    mail: {
      required: true,
      email: true
    },
  },

  messages: {
    mail: {
      required: 'Недопустимый формат',
      minLength: 'Недопустимый формат'
    },
  },
});

new JustValidate('.contacts__form', {
  rules: {
    name: {
      required: true,
      customRegexp: '/^[a-zA-Z_ ]*$/',
    },

    mail: {
      required: true,
      email: true
    },
  },

  messages: {
    name: {
      required: 'Недопустимый формат',
      customRegexp: 'Недопустимый формат'
    },

    mail: {
      required: 'Недопустимый формат',
      minLength: 'Недопустимый формат'
    },
  },
});


