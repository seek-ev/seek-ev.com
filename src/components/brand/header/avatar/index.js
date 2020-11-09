import React from 'react'

const BrandAvatar = (props) => {
    return (
        <div className="brand-avatar">
            <img src={props.avatar ? props.avatar.url : '/se_dark.png'} alt={props.avatar ? props.avatar.id : 'brand_avatar'} />
        </div>
    )
}

export { BrandAvatar }