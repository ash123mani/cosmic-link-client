import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { func, bool } from 'prop-types'

import { Input, Button } from '@common'
import { classNames } from '@common/helpers'
import InlineSpinner from '@local/inline-spinner'

import { actions } from './index.connect'
import './_style.scss'

const blk = 'login-form'

const LoginForm = ({
  loginUser, forgotPassword, onForgotPasswordClick, showForgotPassword,
}) => {
  const history = useHistory()

  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    loginUser(formData).then(({ data }) => {
      if (data.token) {
        history.push('/links')
      }
    })
      .finally(() => setIsSubmitting(false))
  }

  const handleForgotPasswordSubmit = () => {
    forgotPassword(formData.email || '')
  }

  return (
    <form className={classNames({ blk })}>
      <Input
        className={classNames({ blk, elt: 'email' })}
        placeholder="Email for your cosmos"
        label="Email"
        name="email"
        onChange={handleChange}

      />
      {!showForgotPassword && (
        <Input
          className={classNames({ blk, elt: 'password' })}
          type="password"
          placeholder="Password for your cosmos"
          label="Password"
          name="password"
          onChange={handleChange}
        />
      )}
      <div
        role="button"
        className={classNames({ blk, elt: 'forgot' })}
        onClick={onForgotPasswordClick}
        onKeyDown={onForgotPasswordClick}
        tabIndex={0}
      >
        {showForgotPassword ? '< Go Back to login' : 'Forgot Password >'}
      </div>
      <Button
        loader={<InlineSpinner />}
        fluid
        onClick={showForgotPassword ? handleForgotPasswordSubmit : handleSubmit}
        loading={isSubmitting}
      >
        Submit

      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  loginUser: func.isRequired,
  onForgotPasswordClick: func.isRequired,
  showForgotPassword: bool,
  forgotPassword: func.isRequired,
}

LoginForm.defaultProps = {
  showForgotPassword: false,
}

const LoginFormWithConnect = connect(
  null, actions,
)(LoginForm)

export default LoginFormWithConnect
