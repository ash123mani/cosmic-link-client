import React from 'react'
import { shape, string, func } from 'prop-types'
import { connect } from 'react-redux'

import { Alert } from '@common'

import { mapStateToProps, actions } from './index.connect'

const AppBanner = ({ banner, removeAppBanner }) => {
  const { type, message } = banner

  if (!banner.message) {
    return null
  }

  return (
    <Alert
      autoClose
      type={type}
      message={message}
      onClose={removeAppBanner}
    />
  )
}

AppBanner.propTypes = {
  banner: shape({
    type: string,
    message: string,
  }),
  removeAppBanner: func.isRequired,
}

AppBanner.defaultProps = {
  banner: {
    type: '',
    message: '',
  },
}

const AppBannerWithConnect = connect(
  mapStateToProps, actions,
)(AppBanner)

export default AppBannerWithConnect
