enum ArgsType {

    Register,
    Literal,
    Identifer


}

export interface Args {
    type: ArgsType
    regex: string
}

export default interface Command {
    name: string
    args: ArgsType[]
    generate: (args: Args[]) => string
    block? : Command[]
}
