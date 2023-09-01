import React from 'react'

function InputBox(props) {

    // console.log(props);
    
    const {text1, setText1, placeText1, type1,
            text2, setText2, placeText2, type2 } = props;

  return (
    <div className='input_area'>
        <input
            className='input_box'
            type={type1}
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder={placeText1}
            required
        />
        <input
            className='input_box'
            type={type2}
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder={placeText2}
            required
        />
    </div>
  )
}

export default InputBox