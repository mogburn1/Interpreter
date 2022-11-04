import DefaultCommands from "./LC2200";
import {EditSettings} from "../layout/App";


export interface CodeFragment {

}

export interface CodeSection {
    line: string;
    code: CodeFragment[];
    comments? : string;


}

const commandMap = new Map();

for (const command of DefaultCommands) {
    commandMap.set(command.name, command);
}

function Generate(content: string, editSettings: EditSettings) : CodeSection {

    if(!content)
        return {line : "", code : [{}]}

    if(content.startsWith(";")) {

        return (editSettings.comments)? {line : content, code : [{}]} : {line : "", code : [{}]};

    }

    let tokens = content.split(/[,]*\s/)

    const command = commandMap.get(tokens[0].toLowerCase())

    if(command === undefined)
        return {line : "error", code : [{}]}


    return {line : content, code : [{}]}

}

export default function Compile(content: string | undefined, editSettings: EditSettings) : CodeSection[]  {
    if(!content)
        return [];

    const lines = content.split("\n");

    let out : CodeSection[] = [];

    for(const line of lines) {
        out.push(Generate(line, editSettings))
    }

    return out;
}
