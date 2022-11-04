import React from "react";
import Styled from "styled-components";

const Container = Styled.div`
    width: 100%;
    height: 100%;
    display: flex; 
`

const Divider = Styled.div`
    width: 4px;
    background-color: gray;
    cursor: col-resize;    
`

function LeftPanel(props: {width: number | undefined, setWidth: (val: number) => void, children: React.ReactNode}) : React.ReactElement {

    const ref = React.createRef<HTMLDivElement>();

    React.useEffect(() => {

        if(ref.current) {
            if (!props.width) {
                props.setWidth(ref.current?.clientWidth);
                return;
            }
            ref.current.style.width = `${props.width}px`;
        }
    }, [ref, props.width, props.setWidth]);

    return (
        <div ref={ref} style={{width : props.width, height: "100%"}}>
            {props.children}
        </div>
    )
}

const RightPanel = Styled.div`
    flex: 1;
`

export default function HorizontalDivider(props: {children: React.ReactNode[]}) : JSX.Element {

    const ref = React.createRef<HTMLDivElement>()

    const [width, setWidth] = React.useState<undefined | number>(undefined);
    const [deltaWidth, setDeltaWidth] = React.useState<undefined | number>(undefined);
    const [dragging, setDragging] = React.useState(false);

    const onMouseMove = (e: MouseEvent) : any => {
        if(dragging && width && deltaWidth) {
            const newWidth = width + e.clientX - deltaWidth;
            setDeltaWidth(e.clientX);
            setWidth(newWidth);
        }
    }

    const onMouseUp = () => {
        setDragging(false);
    }

    React.useEffect(() => {

        if(width == undefined)
            setWidth(ref.current?.offsetWidth! / 2);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

    })

    return (
        <Container ref={ref}>
            <LeftPanel width={width} setWidth={setWidth}>
                {props.children[0]}
            </LeftPanel>
            <Divider onMouseDown={(e: React.MouseEvent) => {setDeltaWidth(e.clientX); setDragging(true)}}/>
            <RightPanel>
                {props.children[1]}
            </RightPanel>
        </Container>
    );
}
