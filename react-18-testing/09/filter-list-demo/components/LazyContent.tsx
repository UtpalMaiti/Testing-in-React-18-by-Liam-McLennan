import { useEffect, useState } from "react";

export default function LazyContent(props) {
    let [content, setContent] = useState('');
    useEffect(() => {        
        setTimeout(() => {
            setContent(props.children);
        }, props.delay);
    });
    return (<div>{content}</div>);
}