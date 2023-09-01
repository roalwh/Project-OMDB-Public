import React from 'react'

function BlueButton(props) {

  const { text, onClick } = props;

  return (
    <>
      <button
        type="submit"
        className='btn_submit'
        onClick={onClick}>
        {text}
      </button>
    </>
  )
}

export default BlueButton