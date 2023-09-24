import { CalculatorVisitor } from "./generated/CalculatorVisitor";
import { AddSubContext, CalculatorParser } from "./generated/CalculatorParser";
import {
    ATNSimulator,
    BaseErrorListener,
    CharStreams,
    CommonTokenStream, ParseCancellationException,
    RecognitionException,
    Recognizer,
    TerminalNode,
    Token
} from "antlr4ng";
import { CalculatorLexer } from "./generated/CalculatorLexer";

class AdverityCalculatorVisitor extends CalculatorVisitor<number> {
    public visitTerminal(node: TerminalNode): number {
        return 0
    }

    visitAddSub: (ctx: AddSubContext) => number = (ctx) => {
        if (ctx._operation.type === CalculatorParser.ADD) {
            return parseFloat(ctx._left.text) + parseFloat(ctx._right.text)
        } else {
            return parseFloat(ctx._left.text) - parseFloat(ctx._right.text)
        }
    }
}

class AdverityCalculatorErrorHandler extends BaseErrorListener<ATNSimulator> {

    syntaxError<T extends Token>(recognizer: Recognizer<any>, offendingSymbol: T, line: number, column: number, msg: string, e: RecognitionException | null) {
        throw new ParseCancellationException(msg)
    }
}

export function parse(input: string): number {
    const charStreams = CharStreams.fromString(input.toUpperCase())
    const lexer = new CalculatorLexer(charStreams)
    const tokenStream = new CommonTokenStream(lexer)
    tokenStream.fill()

    const parser = new CalculatorParser(tokenStream)
    parser.removeErrorListeners();
    parser.addErrorListener(new AdverityCalculatorErrorHandler());
    const startRule = parser.init()

    const visistor = new AdverityCalculatorVisitor()
    return visistor.visit(startRule)
}
