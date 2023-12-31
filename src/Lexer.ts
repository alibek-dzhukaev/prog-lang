import Token from "./Token";
import {tokenTypesList} from "./TokenType";

export default class Lexer {
    code: string
    pos = 0
    tokenList: Token[] = []

    constructor(code: string) {
        this.code = code;
    }

    lexAnalysis(): Token[] {
        while (this.nextToken()) {}

        this.tokenList =  this.tokenList.filter(token => token.type.name !== tokenTypesList.SPACE.name)
        return this.tokenList
    }

    nextToken(): boolean {
        if(this.pos >= this.code.length) {
            return false
        }

        const tokenTypeValues = Object.values(tokenTypesList)
        for (let i = 0; i < tokenTypeValues.length; i++) {
            const tokenType = tokenTypeValues[i]
            const regex = new RegExp('^' + tokenType.regex)
            const result = this.code.substr(this.pos).match(regex)
            if(result && result[0]) {
                const token = new Token(tokenType, result[0], this.pos)
                this.pos += result[0].length
                this.tokenList.push(token)
                return true
            }
        }
        throw new Error(`на позиции ${this.pos} обнаружена ошибка`)
    }
}

