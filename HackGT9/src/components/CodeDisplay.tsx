import React from "react";
import Styled from "styled-components";
import {CodeSection} from "../compiler/Compiler";

const Container = Styled.div`

    width: 100%;
    height: 100%;

    padding: 1rem 0.5rem;
    
    font-size: 16px;
`

const FragmentContainer = Styled.div`

    width: 100%;
    height: fit-content;
    min-height: 1.5rem;
    display: flex;
    font-family: monospace;
    font-size: 16px;
    
    align-items: stretch;
    
`

const FragmentLine = Styled.div`
     
    width: 1.5em;


    text-align: center;
    font-family: monospace;
    background-color: #f2f2f2;
    border-right: 1px solid #e6e6e6;
    
    user-select: none; 
    -moz-user-select: none; 
    -khtml-user-select: none; 
`


function CodeFragment({id, content} : {id : number, content: CodeSection}) {

    return (
        <FragmentContainer>
            <FragmentLine> {id} </FragmentLine>
            {content.line}
        </FragmentContainer>
    )

};

export default function CodeDisplay({content} : {content: CodeSection[]}) {

    return (
        <Container>
            {content.map((content: CodeSection, index : number) => {return <CodeFragment id={index + 1} content={content}/>})}
        </Container>
    );
}
