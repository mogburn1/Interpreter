import React from "react";
import Styled from "styled-components";
import ReactCodeMirror from "@uiw/react-codemirror";

const Container = Styled.div`
    overflow-y: auto;
    height: calc(100%);
    width: 100%;
    padding: 1rem 0.5rem;
`
export default function CodeEditor({code, setCode}:{code: string | undefined, setCode: (v:string) => void}) {

    return (
        <Container>
            <ReactCodeMirror
                value={code}
                height={"100%"}
                onChange={setCode}
                style={{fontSize: "16px", border: "none", outline: "none"}}
                autoFocus={false}
                placeholder={"Enter Code here"}
            />
        </Container>
    )

}
