import React from 'react'

const Rank = ({ user }) => {
  const renderRank = user.name ? (
    <div className='white f4'>{`Hey  ${user.name} your Current rank is  `}</div>
  ) : (
    <div className='white f4'>
      Sigin to see your Rank
    </div>
  )
  return (
    <div>
      {renderRank}
      <div className='white f3'>
        <h1>
          <em>
            <strong>{user.entry}</strong>{' '}
          </em>
        </h1>
      </div>
    </div>
  )
}

export default Rank
