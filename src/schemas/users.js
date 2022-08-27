exports.registerBody = {
    firstName: {
      isString: { errorMessage: 'name is not a string' },
      exists: {
        errorMessage: 'name cannot be null',
        options: { checkFalsy: true },
      },
    },
    lastName: {
      isString: { errorMessage: 'lastName is not a string' },
      exists: {
        errorMessage: 'lastName cannot be null',
        options: { checkFalsy: true },
      },
    },
    email: {
      isEmail: { errorMessage: 'email is not valid' },
      exists: {
        errorMessage: 'email cannot be null',
        options: { checkFalsy: true },
      },
    },
    password: {
        isString: { errorMessage: 'password is not a string'},
        exists: {
            errorMessage: 'password cannot be null',
        }
    },
      age: {
        isInt : { min: 13 },
        exists: { errorMessage: 'Age cannot be null'}
      }
}

exports.loginBody = {
    email: {
        isEmail: { errorMessage: 'email is not valid' },
        exists: {
          errorMessage: 'email cannot be null',
          options: { checkFalsy: true },
        },
      },
      password: {
          isString: { errorMessage: 'password is not a string'},
          exists: {
              errorMessage: 'password cannot be null',
          }
      }
}

exports.userBody = {
    name: {
        isString: { errorMessage: 'name is not a string' },
        exists: {
          errorMessage: 'name cannot be null',
          options: { checkFalsy: true },
        },
      },
      email: {
        isEmail: { errorMessage: 'email is not valid' },
        exists: {
          errorMessage: 'email cannot be null',
          options: { checkFalsy: true },
        },
      },
      password: {
          isString: { errorMessage: 'password is not a string'},
          exists: {
              errorMessage: 'password cannot be null',
          }
      },
      phone: {
        isMobilePhone: { errorMessage: 'Invalid phone number'},
        exists: { errorMessage: 'Phone cannot be null '}
      }
}