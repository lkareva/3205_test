import React from 'react';

const Input = React.forwardRef<HTMLInputElement, any>((props, ref) => {
    return (
        <div className="input-block">
            <input ref={ref} className="input-block__input" {...props}/>
        </div>
    )
})

export default Input