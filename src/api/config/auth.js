const auth = {
  registerUser: {
    endPoint: '/api/v1/auth/register',
    method: 'POST',
  },
  loginUser: {
    endPoint: '/api/v1/auth/login',
    method: 'POST',
  },
  forgotPassword: {
    endPoint: '/api/v1/auth/forgotpassword',
    method: 'POST',
  },
  resetPassword: {
    endPoint: '/api/v1/auth/resetpassword',
    method: 'PUT',
  },
}

export default auth
