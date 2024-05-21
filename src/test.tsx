import React, { useState } from 'react';

function TestComponent() {
    const [count, setCount] = useState(0); // 初始化一个状态
    const increment = () => {
        setCount(count + 1);
    };
    
    // 故意添加一些不符合规定的代码风格
    const unused_variable = 42; // 未使用的变量
    return (
        <div>
            <button onClick={increment}>Count is: {count}</button>
        </div>
    );
}

export default TestComponent;
