import React from 'react';

// className을 복수로 지정하기 위해 배열과 join메소드를 이용.
// className을 두 개로 지정하는 이유는 positive, negative, default처럼 type을 결정하는 내용에 따라 스타일을 변경하려고.
// 템플릿 리터럴(백틱)을 이용해 변수 btnType에 저장한 값을 className으로 추가.
// 따라서 Props(type)가 positive라면 변수 btnType은 Button_positive 가 되고, 
// 전체 className은 Button Button_positive 가 됨.

const Button = ({ text, type, onClick }) => {
    return (
        <button
            className={["btn_boardMenu", `Button_${type}`].join(" ")}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

Button.defaultProps = {
    type: "default",
};

export default Button;