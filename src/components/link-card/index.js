import React, { useState } from 'react'
import { string, func, bool } from 'prop-types'

import { classNames } from '@common/helpers'
import Image from '@local/image'
import { Spinner } from '@common'
import linkIcon from '@images/link.svg'
import fileCopyIcon from '@images/file-copy.svg'
import shareIcon from '@images/share.svg'
import deleteIcon from '@images/delete.svg'

import './_style.scss'

const blk = 'link-card'

const LinkCard = ({
  imageUrl, title, description, siteName, linkUrl, onLinkCopy, onLinkDelete, linkId, fadeDown, fadeUp,
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  if (!title && !description) {
    return null
  }

  const handleCopy = async () => {
    onLinkCopy()
    await navigator.clipboard.writeText(linkUrl)
  }

  const handleShare = async () => {
    await window.navigator.share(linkUrl)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await onLinkDelete(linkId)
    setIsDeleting(false)
  }

  const wrapperClassName = classNames({
    blk,
    mods: [
      fadeDown && 'fade-down',
      fadeUp && 'fade-up',
    ],
  })

  return (
    <div className={wrapperClassName}>
      <div>
        {
          imageUrl ? (
            <Image
              imageUrl={imageUrl}
              alt={siteName}
              height="200px"
            />
          ) : (
            <div className={classNames({ blk, elt: 'site-name' })}>
              {siteName}
            </div>
          )
        }

        {title && (
          <div className={classNames({ blk, elt: 'title' })}>
            {title}
          </div>
        )}

        {description && (
          <div className={classNames({ blk, elt: 'description' })}>
            {description}
          </div>
        )}
      </div>

      <div className={classNames({ blk, elt: 'bottom' })}>
        <a
          href={linkUrl}
          target="_blank"
          rel="noreferrer"
          className={classNames({ blk, elt: 'link' })}
        >
          <Image
            role="button"
            imageUrl={linkIcon}
            className={classNames({ blk, elt: 'link-image' })}
          />
        </a>

        <Image
          imageUrl={fileCopyIcon}
          className={classNames({ blk, elt: 'link-copy' })}
          asButton
          onClick={handleCopy}
        />

        <Image
          imageUrl={shareIcon}
          asButton
          className={classNames({ blk, elt: 'link-share' })}
          onClick={handleShare}
        />

        {isDeleting ? <Spinner size="small" category="red" /> : (
          <Image
            imageUrl={deleteIcon}
            asButton
            className={classNames({ blk, elt: 'link-delete' })}
            onClick={handleDelete}
          />
        )}

      </div>
    </div>
  )
}

LinkCard.propTypes = {
  imageUrl: string,
  title: string,
  description: string,
  siteName: string,
  linkUrl: string.isRequired,
  onLinkCopy: func,
  onLinkDelete: func.isRequired,
  linkId: string.isRequired,
  fadeDown: bool,
  fadeUp: bool,
}

LinkCard.defaultProps = {
  imageUrl: '',
  title: '',
  description: '',
  siteName: '',
  onLinkCopy() {},
  fadeDown: false,
  fadeUp: false,
}

export default LinkCard
