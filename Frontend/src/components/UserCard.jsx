import React from 'react'

const UserCard = ({data}) => {
  return (
    <div className="card bg-base-300 w-85 shadow-sm">
  <figure className='bg-red-200'>
    <img
      src={data.photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
   <p className='text-lg font-semibold'>{data.firstName +" "+ data.lastName}</p>
    <p>{data.about}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary">Buy Now</button>
      <button className="btn btn-secondary">Buy Now</button>
    </div>
  </div>
</div>
  )
}

export default UserCard