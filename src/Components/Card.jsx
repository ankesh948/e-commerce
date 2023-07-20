import React from 'react'

const Card = ({img}) => {
  return (
    <div>
        {img.map((img)=>{
            return (
                <img src={img} alt="" />
            )

        })}
    </div>
  )
}

export default Card