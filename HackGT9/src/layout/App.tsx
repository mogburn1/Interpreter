import React from "react";

import Styled from "styled-components";
import Nav from "./Nav";
import HorizontalDivider from "./horizontalDivider/HorizontalDivider";
import CodeEditor from "../components/CodeEditor";
import CodeDisplay from "../components/CodeDisplay";
import Compile from "../compiler/Compiler";

const Container = Styled.main`
    
    height: 100vh;
    width: 100vw;
    
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 5vh 95vh;   
`

export interface EditSettings {
    comments: boolean
    hotReload: boolean
}

export default function App(): JSX.Element {

    const [code, setCode] = React.useState<string>();

    const [debugMode, setDebugMode] = React.useState<boolean>(false);
    const [editSettings, setEditSettings] = React.useState<EditSettings>({comments: true, hotReload: true});
    const [debugSettings, setDebugSettings] = React.useState()

    return (
        <Container>
            <Nav mode={debugMode} toggleMode={() => setDebugMode(!debugMode)} editSettings={editSettings} setEditSettings={setEditSettings}/>
            {
                debugMode? (
                    <div>

                    </div>
                ) : (
                    <HorizontalDivider>
                        <CodeEditor code={code} setCode={setCode}/>
                        <CodeDisplay content={Compile(code, editSettings)}/>
                    </HorizontalDivider>
                )
            }
        </Container>
    );
}
