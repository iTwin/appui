import { c as commonjsGlobal } from "./index-R26Bfrts.js";
var dist = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    factory(exports);
  })(commonjsGlobal, function(exports2) {
    function tokenToString(token) {
      if (token.text !== void 0 && token.text !== "") {
        return `'${token.type}' with value '${token.text}'`;
      } else {
        return `'${token.type}'`;
      }
    }
    class NoParsletFoundError extends Error {
      constructor(token) {
        super(`No parslet found for token: ${tokenToString(token)}`);
        this.token = token;
        Object.setPrototypeOf(this, NoParsletFoundError.prototype);
      }
      getToken() {
        return this.token;
      }
    }
    class EarlyEndOfParseError extends Error {
      constructor(token) {
        super(`The parsing ended early. The next token was: ${tokenToString(token)}`);
        this.token = token;
        Object.setPrototypeOf(this, EarlyEndOfParseError.prototype);
      }
      getToken() {
        return this.token;
      }
    }
    class UnexpectedTypeError extends Error {
      constructor(result, message) {
        let error = `Unexpected type: '${result.type}'.`;
        if (message !== void 0) {
          error += ` Message: ${message}`;
        }
        super(error);
        Object.setPrototypeOf(this, UnexpectedTypeError.prototype);
      }
    }
    function makePunctuationRule(type) {
      return (text) => {
        if (text.startsWith(type)) {
          return { type, text: type };
        } else {
          return null;
        }
      };
    }
    function getQuoted(text) {
      let position = 0;
      let char;
      const mark = text[0];
      let escaped = false;
      if (mark !== "'" && mark !== '"') {
        return null;
      }
      while (position < text.length) {
        position++;
        char = text[position];
        if (!escaped && char === mark) {
          position++;
          break;
        }
        escaped = !escaped && char === "\\";
      }
      if (char !== mark) {
        throw new Error("Unterminated String");
      }
      return text.slice(0, position);
    }
    const identifierStartRegex = new RegExp("[$_\\p{ID_Start}]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}", "u");
    const identifierContinueRegex = new RegExp("[$\\-\\p{ID_Continue}\\u200C\\u200D]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}", "u");
    function getIdentifier(text) {
      let char = text[0];
      if (!identifierStartRegex.test(char)) {
        return null;
      }
      let position = 1;
      do {
        char = text[position];
        if (!identifierContinueRegex.test(char)) {
          break;
        }
        position++;
      } while (position < text.length);
      return text.slice(0, position);
    }
    const numberRegex = /^(NaN|-?((\d*\.\d+|\d+)([Ee][+-]?\d+)?|Infinity))/;
    function getNumber(text) {
      var _a, _b;
      return (_b = (_a = numberRegex.exec(text)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
    }
    const identifierRule = (text) => {
      const value = getIdentifier(text);
      if (value == null) {
        return null;
      }
      return {
        type: "Identifier",
        text: value
      };
    };
    function makeKeyWordRule(type) {
      return (text) => {
        if (!text.startsWith(type)) {
          return null;
        }
        const prepends = text[type.length];
        if (prepends !== void 0 && identifierContinueRegex.test(prepends)) {
          return null;
        }
        return {
          type,
          text: type
        };
      };
    }
    const stringValueRule = (text) => {
      const value = getQuoted(text);
      if (value == null) {
        return null;
      }
      return {
        type: "StringValue",
        text: value
      };
    };
    const eofRule = (text) => {
      if (text.length > 0) {
        return null;
      }
      return {
        type: "EOF",
        text: ""
      };
    };
    const numberRule = (text) => {
      const value = getNumber(text);
      if (value === null) {
        return null;
      }
      return {
        type: "Number",
        text: value
      };
    };
    const rules = [
      eofRule,
      makePunctuationRule("=>"),
      makePunctuationRule("("),
      makePunctuationRule(")"),
      makePunctuationRule("{"),
      makePunctuationRule("}"),
      makePunctuationRule("["),
      makePunctuationRule("]"),
      makePunctuationRule("|"),
      makePunctuationRule("&"),
      makePunctuationRule("<"),
      makePunctuationRule(">"),
      makePunctuationRule(","),
      makePunctuationRule(";"),
      makePunctuationRule("*"),
      makePunctuationRule("?"),
      makePunctuationRule("!"),
      makePunctuationRule("="),
      makePunctuationRule(":"),
      makePunctuationRule("..."),
      makePunctuationRule("."),
      makePunctuationRule("#"),
      makePunctuationRule("~"),
      makePunctuationRule("/"),
      makePunctuationRule("@"),
      makeKeyWordRule("undefined"),
      makeKeyWordRule("null"),
      makeKeyWordRule("function"),
      makeKeyWordRule("this"),
      makeKeyWordRule("new"),
      makeKeyWordRule("module"),
      makeKeyWordRule("event"),
      makeKeyWordRule("external"),
      makeKeyWordRule("typeof"),
      makeKeyWordRule("keyof"),
      makeKeyWordRule("readonly"),
      makeKeyWordRule("import"),
      makeKeyWordRule("is"),
      makeKeyWordRule("in"),
      numberRule,
      identifierRule,
      stringValueRule
    ];
    const breakingWhitespaceRegex = /^\s*\n\s*/;
    class Lexer {
      static create(text) {
        const current = this.read(text);
        text = current.text;
        const next = this.read(text);
        text = next.text;
        return new Lexer(text, void 0, current.token, next.token);
      }
      constructor(text, previous, current, next) {
        this.text = "";
        this.text = text;
        this.previous = previous;
        this.current = current;
        this.next = next;
      }
      static read(text, startOfLine = false) {
        startOfLine = startOfLine || breakingWhitespaceRegex.test(text);
        text = text.trim();
        for (const rule of rules) {
          const partial = rule(text);
          if (partial !== null) {
            const token = Object.assign(Object.assign({}, partial), { startOfLine });
            text = text.slice(token.text.length);
            return { text, token };
          }
        }
        throw new Error("Unexpected Token " + text);
      }
      advance() {
        const next = Lexer.read(this.text);
        return new Lexer(next.text, this.current, this.next, next.token);
      }
    }
    function assertRootResult(result) {
      if (result === void 0) {
        throw new Error("Unexpected undefined");
      }
      if (result.type === "JsdocTypeKeyValue" || result.type === "JsdocTypeParameterList" || result.type === "JsdocTypeProperty" || result.type === "JsdocTypeReadonlyProperty" || result.type === "JsdocTypeObjectField" || result.type === "JsdocTypeJsdocObjectField" || result.type === "JsdocTypeIndexSignature" || result.type === "JsdocTypeMappedType") {
        throw new UnexpectedTypeError(result);
      }
      return result;
    }
    function assertPlainKeyValueOrRootResult(result) {
      if (result.type === "JsdocTypeKeyValue") {
        return assertPlainKeyValueResult(result);
      }
      return assertRootResult(result);
    }
    function assertPlainKeyValueOrNameResult(result) {
      if (result.type === "JsdocTypeName") {
        return result;
      }
      return assertPlainKeyValueResult(result);
    }
    function assertPlainKeyValueResult(result) {
      if (result.type !== "JsdocTypeKeyValue") {
        throw new UnexpectedTypeError(result);
      }
      return result;
    }
    function assertNumberOrVariadicNameResult(result) {
      var _a;
      if (result.type === "JsdocTypeVariadic") {
        if (((_a = result.element) === null || _a === void 0 ? void 0 : _a.type) === "JsdocTypeName") {
          return result;
        }
        throw new UnexpectedTypeError(result);
      }
      if (result.type !== "JsdocTypeNumber" && result.type !== "JsdocTypeName") {
        throw new UnexpectedTypeError(result);
      }
      return result;
    }
    function isSquaredProperty(result) {
      return result.type === "JsdocTypeIndexSignature" || result.type === "JsdocTypeMappedType";
    }
    var Precedence;
    (function(Precedence2) {
      Precedence2[Precedence2["ALL"] = 0] = "ALL";
      Precedence2[Precedence2["PARAMETER_LIST"] = 1] = "PARAMETER_LIST";
      Precedence2[Precedence2["OBJECT"] = 2] = "OBJECT";
      Precedence2[Precedence2["KEY_VALUE"] = 3] = "KEY_VALUE";
      Precedence2[Precedence2["UNION"] = 4] = "UNION";
      Precedence2[Precedence2["INTERSECTION"] = 5] = "INTERSECTION";
      Precedence2[Precedence2["PREFIX"] = 6] = "PREFIX";
      Precedence2[Precedence2["INFIX"] = 7] = "INFIX";
      Precedence2[Precedence2["TUPLE"] = 8] = "TUPLE";
      Precedence2[Precedence2["SYMBOL"] = 9] = "SYMBOL";
      Precedence2[Precedence2["OPTIONAL"] = 10] = "OPTIONAL";
      Precedence2[Precedence2["NULLABLE"] = 11] = "NULLABLE";
      Precedence2[Precedence2["KEY_OF_TYPE_OF"] = 12] = "KEY_OF_TYPE_OF";
      Precedence2[Precedence2["FUNCTION"] = 13] = "FUNCTION";
      Precedence2[Precedence2["ARROW"] = 14] = "ARROW";
      Precedence2[Precedence2["ARRAY_BRACKETS"] = 15] = "ARRAY_BRACKETS";
      Precedence2[Precedence2["GENERIC"] = 16] = "GENERIC";
      Precedence2[Precedence2["NAME_PATH"] = 17] = "NAME_PATH";
      Precedence2[Precedence2["PARENTHESIS"] = 18] = "PARENTHESIS";
      Precedence2[Precedence2["SPECIAL_TYPES"] = 19] = "SPECIAL_TYPES";
    })(Precedence || (Precedence = {}));
    class Parser {
      constructor(grammar, textOrLexer, baseParser) {
        this.grammar = grammar;
        if (typeof textOrLexer === "string") {
          this._lexer = Lexer.create(textOrLexer);
        } else {
          this._lexer = textOrLexer;
        }
        this.baseParser = baseParser;
      }
      get lexer() {
        return this._lexer;
      }
      /**
       * Parses a given string and throws an error if the parse ended before the end of the string.
       */
      parse() {
        const result = this.parseType(Precedence.ALL);
        if (this.lexer.current.type !== "EOF") {
          throw new EarlyEndOfParseError(this.lexer.current);
        }
        return result;
      }
      /**
       * Parses with the current lexer and asserts that the result is a {@link RootResult}.
       */
      parseType(precedence) {
        return assertRootResult(this.parseIntermediateType(precedence));
      }
      /**
       * The main parsing function. First it tries to parse the current state in the prefix step, and then it continues
       * to parse the state in the infix step.
       */
      parseIntermediateType(precedence) {
        const result = this.tryParslets(null, precedence);
        if (result === null) {
          throw new NoParsletFoundError(this.lexer.current);
        }
        return this.parseInfixIntermediateType(result, precedence);
      }
      /**
       * In the infix parsing step the parser continues to parse the current state with all parslets until none returns
       * a result.
       */
      parseInfixIntermediateType(left, precedence) {
        let result = this.tryParslets(left, precedence);
        while (result !== null) {
          left = result;
          result = this.tryParslets(left, precedence);
        }
        return left;
      }
      /**
       * Tries to parse the current state with all parslets in the grammar and returns the first non null result.
       */
      tryParslets(left, precedence) {
        for (const parslet of this.grammar) {
          const result = parslet(this, precedence, left);
          if (result !== null) {
            return result;
          }
        }
        return null;
      }
      /**
       * If the given type equals the current type of the {@link Lexer} advance the lexer. Return true if the lexer was
       * advanced.
       */
      consume(types) {
        if (!Array.isArray(types)) {
          types = [types];
        }
        if (types.includes(this.lexer.current.type)) {
          this._lexer = this.lexer.advance();
          return true;
        } else {
          return false;
        }
      }
      acceptLexerState(parser) {
        this._lexer = parser.lexer;
      }
    }
    function isQuestionMarkUnknownType(next) {
      return next === "EOF" || next === "|" || next === "," || next === ")" || next === ">";
    }
    const nullableParslet = (parser, precedence, left) => {
      const type = parser.lexer.current.type;
      const next = parser.lexer.next.type;
      const accept = left == null && type === "?" && !isQuestionMarkUnknownType(next) || left != null && type === "?";
      if (!accept) {
        return null;
      }
      parser.consume("?");
      if (left == null) {
        return {
          type: "JsdocTypeNullable",
          element: parser.parseType(Precedence.NULLABLE),
          meta: {
            position: "prefix"
          }
        };
      } else {
        return {
          type: "JsdocTypeNullable",
          element: assertRootResult(left),
          meta: {
            position: "suffix"
          }
        };
      }
    };
    function composeParslet(options) {
      const parslet = (parser, curPrecedence, left) => {
        const type = parser.lexer.current.type;
        const next = parser.lexer.next.type;
        if (left === null) {
          if ("parsePrefix" in options) {
            if (options.accept(type, next)) {
              return options.parsePrefix(parser);
            }
          }
        } else {
          if ("parseInfix" in options) {
            if (options.precedence > curPrecedence && options.accept(type, next)) {
              return options.parseInfix(parser, left);
            }
          }
        }
        return null;
      };
      Object.defineProperty(parslet, "name", {
        value: options.name
      });
      return parslet;
    }
    const optionalParslet = composeParslet({
      name: "optionalParslet",
      accept: (type) => type === "=",
      precedence: Precedence.OPTIONAL,
      parsePrefix: (parser) => {
        parser.consume("=");
        return {
          type: "JsdocTypeOptional",
          element: parser.parseType(Precedence.OPTIONAL),
          meta: {
            position: "prefix"
          }
        };
      },
      parseInfix: (parser, left) => {
        parser.consume("=");
        return {
          type: "JsdocTypeOptional",
          element: assertRootResult(left),
          meta: {
            position: "suffix"
          }
        };
      }
    });
    const numberParslet = composeParslet({
      name: "numberParslet",
      accept: (type) => type === "Number",
      parsePrefix: (parser) => {
        const value = parseFloat(parser.lexer.current.text);
        parser.consume("Number");
        return {
          type: "JsdocTypeNumber",
          value
        };
      }
    });
    const parenthesisParslet = composeParslet({
      name: "parenthesisParslet",
      accept: (type) => type === "(",
      parsePrefix: (parser) => {
        parser.consume("(");
        if (parser.consume(")")) {
          return {
            type: "JsdocTypeParameterList",
            elements: []
          };
        }
        const result = parser.parseIntermediateType(Precedence.ALL);
        if (!parser.consume(")")) {
          throw new Error("Unterminated parenthesis");
        }
        if (result.type === "JsdocTypeParameterList") {
          return result;
        } else if (result.type === "JsdocTypeKeyValue") {
          return {
            type: "JsdocTypeParameterList",
            elements: [result]
          };
        }
        return {
          type: "JsdocTypeParenthesis",
          element: assertRootResult(result)
        };
      }
    });
    const specialTypesParslet = composeParslet({
      name: "specialTypesParslet",
      accept: (type, next) => type === "?" && isQuestionMarkUnknownType(next) || type === "null" || type === "undefined" || type === "*",
      parsePrefix: (parser) => {
        if (parser.consume("null")) {
          return {
            type: "JsdocTypeNull"
          };
        }
        if (parser.consume("undefined")) {
          return {
            type: "JsdocTypeUndefined"
          };
        }
        if (parser.consume("*")) {
          return {
            type: "JsdocTypeAny"
          };
        }
        if (parser.consume("?")) {
          return {
            type: "JsdocTypeUnknown"
          };
        }
        throw new Error("Unacceptable token: " + parser.lexer.current.text);
      }
    });
    const notNullableParslet = composeParslet({
      name: "notNullableParslet",
      accept: (type) => type === "!",
      precedence: Precedence.NULLABLE,
      parsePrefix: (parser) => {
        parser.consume("!");
        return {
          type: "JsdocTypeNotNullable",
          element: parser.parseType(Precedence.NULLABLE),
          meta: {
            position: "prefix"
          }
        };
      },
      parseInfix: (parser, left) => {
        parser.consume("!");
        return {
          type: "JsdocTypeNotNullable",
          element: assertRootResult(left),
          meta: {
            position: "suffix"
          }
        };
      }
    });
    function createParameterListParslet({ allowTrailingComma }) {
      return composeParslet({
        name: "parameterListParslet",
        accept: (type) => type === ",",
        precedence: Precedence.PARAMETER_LIST,
        parseInfix: (parser, left) => {
          const elements = [
            assertPlainKeyValueOrRootResult(left)
          ];
          parser.consume(",");
          do {
            try {
              const next = parser.parseIntermediateType(Precedence.PARAMETER_LIST);
              elements.push(assertPlainKeyValueOrRootResult(next));
            } catch (e) {
              if (allowTrailingComma && e instanceof NoParsletFoundError) {
                break;
              } else {
                throw e;
              }
            }
          } while (parser.consume(","));
          if (elements.length > 0 && elements.slice(0, -1).some((e) => e.type === "JsdocTypeVariadic")) {
            throw new Error("Only the last parameter may be a rest parameter");
          }
          return {
            type: "JsdocTypeParameterList",
            elements
          };
        }
      });
    }
    const genericParslet = composeParslet({
      name: "genericParslet",
      accept: (type, next) => type === "<" || type === "." && next === "<",
      precedence: Precedence.GENERIC,
      parseInfix: (parser, left) => {
        const dot = parser.consume(".");
        parser.consume("<");
        const objects = [];
        do {
          objects.push(parser.parseType(Precedence.PARAMETER_LIST));
        } while (parser.consume(","));
        if (!parser.consume(">")) {
          throw new Error("Unterminated generic parameter list");
        }
        return {
          type: "JsdocTypeGeneric",
          left: assertRootResult(left),
          elements: objects,
          meta: {
            brackets: "angle",
            dot
          }
        };
      }
    });
    const unionParslet = composeParslet({
      name: "unionParslet",
      accept: (type) => type === "|",
      precedence: Precedence.UNION,
      parseInfix: (parser, left) => {
        parser.consume("|");
        const elements = [];
        do {
          elements.push(parser.parseType(Precedence.UNION));
        } while (parser.consume("|"));
        return {
          type: "JsdocTypeUnion",
          elements: [assertRootResult(left), ...elements]
        };
      }
    });
    const baseGrammar = [
      nullableParslet,
      optionalParslet,
      numberParslet,
      parenthesisParslet,
      specialTypesParslet,
      notNullableParslet,
      createParameterListParslet({
        allowTrailingComma: true
      }),
      genericParslet,
      unionParslet,
      optionalParslet
    ];
    function createNamePathParslet({ allowSquareBracketsOnAnyType, allowJsdocNamePaths, pathGrammar: pathGrammar2 }) {
      return function namePathParslet(parser, precedence, left) {
        if (left == null || precedence >= Precedence.NAME_PATH) {
          return null;
        }
        const type = parser.lexer.current.type;
        const next = parser.lexer.next.type;
        const accept = type === "." && next !== "<" || type === "[" && (allowSquareBracketsOnAnyType || left.type === "JsdocTypeName") || allowJsdocNamePaths && (type === "~" || type === "#");
        if (!accept) {
          return null;
        }
        let pathType;
        let brackets = false;
        if (parser.consume(".")) {
          pathType = "property";
        } else if (parser.consume("[")) {
          pathType = "property-brackets";
          brackets = true;
        } else if (parser.consume("~")) {
          pathType = "inner";
        } else {
          parser.consume("#");
          pathType = "instance";
        }
        const pathParser = pathGrammar2 !== null ? new Parser(pathGrammar2, parser.lexer, parser) : parser;
        const parsed = pathParser.parseIntermediateType(Precedence.NAME_PATH);
        parser.acceptLexerState(pathParser);
        let right;
        switch (parsed.type) {
          case "JsdocTypeName":
            right = {
              type: "JsdocTypeProperty",
              value: parsed.value,
              meta: {
                quote: void 0
              }
            };
            break;
          case "JsdocTypeNumber":
            right = {
              type: "JsdocTypeProperty",
              value: parsed.value.toString(10),
              meta: {
                quote: void 0
              }
            };
            break;
          case "JsdocTypeStringValue":
            right = {
              type: "JsdocTypeProperty",
              value: parsed.value,
              meta: {
                quote: parsed.meta.quote
              }
            };
            break;
          case "JsdocTypeSpecialNamePath":
            if (parsed.specialType === "event") {
              right = parsed;
            } else {
              throw new UnexpectedTypeError(parsed, "Type 'JsdocTypeSpecialNamePath' is only allowed with specialType 'event'");
            }
            break;
          default:
            throw new UnexpectedTypeError(parsed, "Expecting 'JsdocTypeName', 'JsdocTypeNumber', 'JsdocStringValue' or 'JsdocTypeSpecialNamePath'");
        }
        if (brackets && !parser.consume("]")) {
          const token = parser.lexer.current;
          throw new Error(`Unterminated square brackets. Next token is '${token.type}' with text '${token.text}'`);
        }
        return {
          type: "JsdocTypeNamePath",
          left: assertRootResult(left),
          right,
          pathType
        };
      };
    }
    function createNameParslet({ allowedAdditionalTokens }) {
      return composeParslet({
        name: "nameParslet",
        accept: (type) => type === "Identifier" || type === "this" || type === "new" || allowedAdditionalTokens.includes(type),
        parsePrefix: (parser) => {
          const { type, text } = parser.lexer.current;
          parser.consume(type);
          return {
            type: "JsdocTypeName",
            value: text
          };
        }
      });
    }
    const stringValueParslet = composeParslet({
      name: "stringValueParslet",
      accept: (type) => type === "StringValue",
      parsePrefix: (parser) => {
        const text = parser.lexer.current.text;
        parser.consume("StringValue");
        return {
          type: "JsdocTypeStringValue",
          value: text.slice(1, -1),
          meta: {
            quote: text[0] === "'" ? "single" : "double"
          }
        };
      }
    });
    function createSpecialNamePathParslet({ pathGrammar: pathGrammar2, allowedTypes }) {
      return composeParslet({
        name: "specialNamePathParslet",
        accept: (type) => allowedTypes.includes(type),
        parsePrefix: (parser) => {
          const type = parser.lexer.current.type;
          parser.consume(type);
          if (!parser.consume(":")) {
            return {
              type: "JsdocTypeName",
              value: type
            };
          }
          let result;
          let token = parser.lexer.current;
          if (parser.consume("StringValue")) {
            result = {
              type: "JsdocTypeSpecialNamePath",
              value: token.text.slice(1, -1),
              specialType: type,
              meta: {
                quote: token.text[0] === "'" ? "single" : "double"
              }
            };
          } else {
            let value = "";
            const allowed = ["Identifier", "@", "/"];
            while (allowed.some((type2) => parser.consume(type2))) {
              value += token.text;
              token = parser.lexer.current;
            }
            result = {
              type: "JsdocTypeSpecialNamePath",
              value,
              specialType: type,
              meta: {
                quote: void 0
              }
            };
          }
          const moduleParser = new Parser(pathGrammar2, parser.lexer, parser);
          const moduleResult = moduleParser.parseInfixIntermediateType(result, Precedence.ALL);
          parser.acceptLexerState(moduleParser);
          return assertRootResult(moduleResult);
        }
      });
    }
    const basePathGrammar = [
      createNameParslet({
        allowedAdditionalTokens: ["external", "module"]
      }),
      stringValueParslet,
      numberParslet,
      createNamePathParslet({
        allowSquareBracketsOnAnyType: false,
        allowJsdocNamePaths: true,
        pathGrammar: null
      })
    ];
    const pathGrammar = [
      ...basePathGrammar,
      createSpecialNamePathParslet({
        allowedTypes: ["event"],
        pathGrammar: basePathGrammar
      })
    ];
    function getParameters(value) {
      let parameters;
      if (value.type === "JsdocTypeParameterList") {
        parameters = value.elements;
      } else if (value.type === "JsdocTypeParenthesis") {
        parameters = [value.element];
      } else {
        throw new UnexpectedTypeError(value);
      }
      return parameters.map((p) => assertPlainKeyValueOrRootResult(p));
    }
    function getUnnamedParameters(value) {
      const parameters = getParameters(value);
      if (parameters.some((p) => p.type === "JsdocTypeKeyValue")) {
        throw new Error("No parameter should be named");
      }
      return parameters;
    }
    function createFunctionParslet({ allowNamedParameters, allowNoReturnType, allowWithoutParenthesis, allowNewAsFunctionKeyword }) {
      return composeParslet({
        name: "functionParslet",
        accept: (type, next) => type === "function" || allowNewAsFunctionKeyword && type === "new" && next === "(",
        parsePrefix: (parser) => {
          const newKeyword = parser.consume("new");
          parser.consume("function");
          const hasParenthesis = parser.lexer.current.type === "(";
          if (!hasParenthesis) {
            if (!allowWithoutParenthesis) {
              throw new Error("function is missing parameter list");
            }
            return {
              type: "JsdocTypeName",
              value: "function"
            };
          }
          let result = {
            type: "JsdocTypeFunction",
            parameters: [],
            arrow: false,
            constructor: newKeyword,
            parenthesis: hasParenthesis
          };
          const value = parser.parseIntermediateType(Precedence.FUNCTION);
          if (allowNamedParameters === void 0) {
            result.parameters = getUnnamedParameters(value);
          } else if (newKeyword && value.type === "JsdocTypeFunction" && value.arrow) {
            result = value;
            result.constructor = true;
            return result;
          } else {
            result.parameters = getParameters(value);
            for (const p of result.parameters) {
              if (p.type === "JsdocTypeKeyValue" && !allowNamedParameters.includes(p.key)) {
                throw new Error(`only allowed named parameters are ${allowNamedParameters.join(", ")} but got ${p.type}`);
              }
            }
          }
          if (parser.consume(":")) {
            result.returnType = parser.parseType(Precedence.PREFIX);
          } else {
            if (!allowNoReturnType) {
              throw new Error("function is missing return type");
            }
          }
          return result;
        }
      });
    }
    function createVariadicParslet({ allowPostfix, allowEnclosingBrackets }) {
      return composeParslet({
        name: "variadicParslet",
        accept: (type) => type === "...",
        precedence: Precedence.PREFIX,
        parsePrefix: (parser) => {
          parser.consume("...");
          const brackets = allowEnclosingBrackets && parser.consume("[");
          try {
            const element = parser.parseType(Precedence.PREFIX);
            if (brackets && !parser.consume("]")) {
              throw new Error("Unterminated variadic type. Missing ']'");
            }
            return {
              type: "JsdocTypeVariadic",
              element: assertRootResult(element),
              meta: {
                position: "prefix",
                squareBrackets: brackets
              }
            };
          } catch (e) {
            if (e instanceof NoParsletFoundError) {
              if (brackets) {
                throw new Error("Empty square brackets for variadic are not allowed.");
              }
              return {
                type: "JsdocTypeVariadic",
                meta: {
                  position: void 0,
                  squareBrackets: false
                }
              };
            } else {
              throw e;
            }
          }
        },
        parseInfix: allowPostfix ? (parser, left) => {
          parser.consume("...");
          return {
            type: "JsdocTypeVariadic",
            element: assertRootResult(left),
            meta: {
              position: "suffix",
              squareBrackets: false
            }
          };
        } : void 0
      });
    }
    const symbolParslet = composeParslet({
      name: "symbolParslet",
      accept: (type) => type === "(",
      precedence: Precedence.SYMBOL,
      parseInfix: (parser, left) => {
        if (left.type !== "JsdocTypeName") {
          throw new Error("Symbol expects a name on the left side. (Reacting on '(')");
        }
        parser.consume("(");
        const result = {
          type: "JsdocTypeSymbol",
          value: left.value
        };
        if (!parser.consume(")")) {
          const next = parser.parseIntermediateType(Precedence.SYMBOL);
          result.element = assertNumberOrVariadicNameResult(next);
          if (!parser.consume(")")) {
            throw new Error("Symbol does not end after value");
          }
        }
        return result;
      }
    });
    const arrayBracketsParslet = composeParslet({
      name: "arrayBracketsParslet",
      precedence: Precedence.ARRAY_BRACKETS,
      accept: (type, next) => type === "[" && next === "]",
      parseInfix: (parser, left) => {
        parser.consume("[");
        parser.consume("]");
        return {
          type: "JsdocTypeGeneric",
          left: {
            type: "JsdocTypeName",
            value: "Array"
          },
          elements: [
            assertRootResult(left)
          ],
          meta: {
            brackets: "square",
            dot: false
          }
        };
      }
    });
    function createObjectParslet({ objectFieldGrammar: objectFieldGrammar2, allowKeyTypes }) {
      return composeParslet({
        name: "objectParslet",
        accept: (type) => type === "{",
        parsePrefix: (parser) => {
          parser.consume("{");
          const result = {
            type: "JsdocTypeObject",
            meta: {
              separator: "comma"
            },
            elements: []
          };
          if (!parser.consume("}")) {
            let separator;
            const fieldParser = new Parser(objectFieldGrammar2, parser.lexer, parser);
            while (true) {
              fieldParser.acceptLexerState(parser);
              let field = fieldParser.parseIntermediateType(Precedence.OBJECT);
              parser.acceptLexerState(fieldParser);
              if (field === void 0 && allowKeyTypes) {
                field = parser.parseIntermediateType(Precedence.OBJECT);
              }
              let optional = false;
              if (field.type === "JsdocTypeNullable") {
                optional = true;
                field = field.element;
              }
              if (field.type === "JsdocTypeNumber" || field.type === "JsdocTypeName" || field.type === "JsdocTypeStringValue") {
                let quote2;
                if (field.type === "JsdocTypeStringValue") {
                  quote2 = field.meta.quote;
                }
                result.elements.push({
                  type: "JsdocTypeObjectField",
                  key: field.value.toString(),
                  right: void 0,
                  optional,
                  readonly: false,
                  meta: {
                    quote: quote2
                  }
                });
              } else if (field.type === "JsdocTypeObjectField" || field.type === "JsdocTypeJsdocObjectField") {
                result.elements.push(field);
              } else {
                throw new UnexpectedTypeError(field);
              }
              if (parser.lexer.current.startOfLine) {
                separator = "linebreak";
              } else if (parser.consume(",")) {
                separator = "comma";
              } else if (parser.consume(";")) {
                separator = "semicolon";
              } else {
                break;
              }
              const type = parser.lexer.current.type;
              if (type === "}") {
                break;
              }
            }
            result.meta.separator = separator !== null && separator !== void 0 ? separator : "comma";
            if (!parser.consume("}")) {
              throw new Error("Unterminated record type. Missing '}'");
            }
          }
          return result;
        }
      });
    }
    function createObjectFieldParslet({ allowSquaredProperties, allowKeyTypes, allowReadonly, allowOptional }) {
      return composeParslet({
        name: "objectFieldParslet",
        precedence: Precedence.KEY_VALUE,
        accept: (type) => type === ":",
        parseInfix: (parser, left) => {
          var _a;
          let optional = false;
          let readonlyProperty = false;
          if (allowOptional && left.type === "JsdocTypeNullable") {
            optional = true;
            left = left.element;
          }
          if (allowReadonly && left.type === "JsdocTypeReadonlyProperty") {
            readonlyProperty = true;
            left = left.element;
          }
          const parentParser = (_a = parser.baseParser) !== null && _a !== void 0 ? _a : parser;
          parentParser.acceptLexerState(parser);
          if (left.type === "JsdocTypeNumber" || left.type === "JsdocTypeName" || left.type === "JsdocTypeStringValue" || isSquaredProperty(left)) {
            if (isSquaredProperty(left) && !allowSquaredProperties) {
              throw new UnexpectedTypeError(left);
            }
            parentParser.consume(":");
            let quote2;
            if (left.type === "JsdocTypeStringValue") {
              quote2 = left.meta.quote;
            }
            const right = parentParser.parseType(Precedence.KEY_VALUE);
            parser.acceptLexerState(parentParser);
            return {
              type: "JsdocTypeObjectField",
              key: isSquaredProperty(left) ? left : left.value.toString(),
              right,
              optional,
              readonly: readonlyProperty,
              meta: {
                quote: quote2
              }
            };
          } else {
            if (!allowKeyTypes) {
              throw new UnexpectedTypeError(left);
            }
            parentParser.consume(":");
            const right = parentParser.parseType(Precedence.KEY_VALUE);
            parser.acceptLexerState(parentParser);
            return {
              type: "JsdocTypeJsdocObjectField",
              left: assertRootResult(left),
              right
            };
          }
        }
      });
    }
    function createKeyValueParslet({ allowOptional, allowVariadic }) {
      return composeParslet({
        name: "keyValueParslet",
        precedence: Precedence.KEY_VALUE,
        accept: (type) => type === ":",
        parseInfix: (parser, left) => {
          let optional = false;
          let variadic = false;
          if (allowOptional && left.type === "JsdocTypeNullable") {
            optional = true;
            left = left.element;
          }
          if (allowVariadic && left.type === "JsdocTypeVariadic" && left.element !== void 0) {
            variadic = true;
            left = left.element;
          }
          if (left.type !== "JsdocTypeName") {
            throw new UnexpectedTypeError(left);
          }
          parser.consume(":");
          const right = parser.parseType(Precedence.KEY_VALUE);
          return {
            type: "JsdocTypeKeyValue",
            key: left.value,
            right,
            optional,
            variadic
          };
        }
      });
    }
    const jsdocBaseGrammar = [
      ...baseGrammar,
      createFunctionParslet({
        allowWithoutParenthesis: true,
        allowNamedParameters: ["this", "new"],
        allowNoReturnType: true,
        allowNewAsFunctionKeyword: false
      }),
      stringValueParslet,
      createSpecialNamePathParslet({
        allowedTypes: ["module", "external", "event"],
        pathGrammar
      }),
      createVariadicParslet({
        allowEnclosingBrackets: true,
        allowPostfix: true
      }),
      createNameParslet({
        allowedAdditionalTokens: ["keyof"]
      }),
      symbolParslet,
      arrayBracketsParslet,
      createNamePathParslet({
        allowSquareBracketsOnAnyType: false,
        allowJsdocNamePaths: true,
        pathGrammar
      })
    ];
    const jsdocGrammar = [
      ...jsdocBaseGrammar,
      createObjectParslet({
        // jsdoc syntax allows full types as keys, so we need to pull in the full grammar here
        // we leave out the object type deliberately
        objectFieldGrammar: [
          createNameParslet({
            allowedAdditionalTokens: ["module", "in"]
          }),
          createObjectFieldParslet({
            allowSquaredProperties: false,
            allowKeyTypes: true,
            allowOptional: false,
            allowReadonly: false
          }),
          ...jsdocBaseGrammar
        ],
        allowKeyTypes: true
      }),
      createKeyValueParslet({
        allowOptional: true,
        allowVariadic: true
      })
    ];
    const typeOfParslet = composeParslet({
      name: "typeOfParslet",
      accept: (type) => type === "typeof",
      parsePrefix: (parser) => {
        parser.consume("typeof");
        return {
          type: "JsdocTypeTypeof",
          element: assertRootResult(parser.parseType(Precedence.KEY_OF_TYPE_OF))
        };
      }
    });
    const objectFieldGrammar$1 = [
      createNameParslet({
        allowedAdditionalTokens: ["module", "keyof", "event", "external", "in"]
      }),
      nullableParslet,
      optionalParslet,
      stringValueParslet,
      numberParslet,
      createObjectFieldParslet({
        allowSquaredProperties: false,
        allowKeyTypes: false,
        allowOptional: false,
        allowReadonly: false
      })
    ];
    const closureGrammar = [
      ...baseGrammar,
      createObjectParslet({
        allowKeyTypes: false,
        objectFieldGrammar: objectFieldGrammar$1
      }),
      createNameParslet({
        allowedAdditionalTokens: ["event", "external", "in"]
      }),
      typeOfParslet,
      createFunctionParslet({
        allowWithoutParenthesis: false,
        allowNamedParameters: ["this", "new"],
        allowNoReturnType: true,
        allowNewAsFunctionKeyword: false
      }),
      createVariadicParslet({
        allowEnclosingBrackets: false,
        allowPostfix: false
      }),
      // additional name parslet is needed for some special cases
      createNameParslet({
        allowedAdditionalTokens: ["keyof"]
      }),
      createSpecialNamePathParslet({
        allowedTypes: ["module"],
        pathGrammar
      }),
      createNamePathParslet({
        allowSquareBracketsOnAnyType: false,
        allowJsdocNamePaths: true,
        pathGrammar
      }),
      createKeyValueParslet({
        allowOptional: false,
        allowVariadic: false
      }),
      symbolParslet
    ];
    function createTupleParslet({ allowQuestionMark }) {
      return composeParslet({
        name: "tupleParslet",
        accept: (type) => type === "[",
        parsePrefix: (parser) => {
          parser.consume("[");
          const result = {
            type: "JsdocTypeTuple",
            elements: []
          };
          if (parser.consume("]")) {
            return result;
          }
          const typeList = parser.parseIntermediateType(Precedence.ALL);
          if (typeList.type === "JsdocTypeParameterList") {
            if (typeList.elements[0].type === "JsdocTypeKeyValue") {
              result.elements = typeList.elements.map(assertPlainKeyValueResult);
            } else {
              result.elements = typeList.elements.map(assertRootResult);
            }
          } else {
            if (typeList.type === "JsdocTypeKeyValue") {
              result.elements = [assertPlainKeyValueResult(typeList)];
            } else {
              result.elements = [assertRootResult(typeList)];
            }
          }
          if (!parser.consume("]")) {
            throw new Error("Unterminated '['");
          }
          if (!allowQuestionMark && result.elements.some((e) => e.type === "JsdocTypeUnknown")) {
            throw new Error("Question mark in tuple not allowed");
          }
          return result;
        }
      });
    }
    const keyOfParslet = composeParslet({
      name: "keyOfParslet",
      accept: (type) => type === "keyof",
      parsePrefix: (parser) => {
        parser.consume("keyof");
        return {
          type: "JsdocTypeKeyof",
          element: assertRootResult(parser.parseType(Precedence.KEY_OF_TYPE_OF))
        };
      }
    });
    const importParslet = composeParslet({
      name: "importParslet",
      accept: (type) => type === "import",
      parsePrefix: (parser) => {
        parser.consume("import");
        if (!parser.consume("(")) {
          throw new Error("Missing parenthesis after import keyword");
        }
        const path = parser.parseType(Precedence.PREFIX);
        if (path.type !== "JsdocTypeStringValue") {
          throw new Error("Only string values are allowed as paths for imports");
        }
        if (!parser.consume(")")) {
          throw new Error("Missing closing parenthesis after import keyword");
        }
        return {
          type: "JsdocTypeImport",
          element: path
        };
      }
    });
    const readonlyPropertyParslet = composeParslet({
      name: "readonlyPropertyParslet",
      accept: (type) => type === "readonly",
      parsePrefix: (parser) => {
        parser.consume("readonly");
        return {
          type: "JsdocTypeReadonlyProperty",
          element: parser.parseType(Precedence.KEY_VALUE)
        };
      }
    });
    const arrowFunctionParslet = composeParslet({
      name: "arrowFunctionParslet",
      precedence: Precedence.ARROW,
      accept: (type) => type === "=>",
      parseInfix: (parser, left) => {
        parser.consume("=>");
        return {
          type: "JsdocTypeFunction",
          parameters: getParameters(left).map(assertPlainKeyValueOrNameResult),
          arrow: true,
          constructor: false,
          parenthesis: true,
          returnType: parser.parseType(Precedence.OBJECT)
        };
      }
    });
    const intersectionParslet = composeParslet({
      name: "intersectionParslet",
      accept: (type) => type === "&",
      precedence: Precedence.INTERSECTION,
      parseInfix: (parser, left) => {
        parser.consume("&");
        const elements = [];
        do {
          elements.push(parser.parseType(Precedence.INTERSECTION));
        } while (parser.consume("&"));
        return {
          type: "JsdocTypeIntersection",
          elements: [assertRootResult(left), ...elements]
        };
      }
    });
    const predicateParslet = composeParslet({
      name: "predicateParslet",
      precedence: Precedence.INFIX,
      accept: (type) => type === "is",
      parseInfix: (parser, left) => {
        if (left.type !== "JsdocTypeName") {
          throw new UnexpectedTypeError(left, "A typescript predicate always has to have a name on the left side.");
        }
        parser.consume("is");
        return {
          type: "JsdocTypePredicate",
          left,
          right: assertRootResult(parser.parseIntermediateType(Precedence.INFIX))
        };
      }
    });
    const objectSquaredPropertyParslet = composeParslet({
      name: "objectSquareBracketPropertyParslet",
      accept: (type) => type === "[",
      parsePrefix: (parser) => {
        if (parser.baseParser === void 0) {
          throw new Error("Only allowed inside object grammar");
        }
        parser.consume("[");
        const key = parser.lexer.current.text;
        parser.consume("Identifier");
        let result;
        if (parser.consume(":")) {
          const parentParser = parser.baseParser;
          parentParser.acceptLexerState(parser);
          result = {
            type: "JsdocTypeIndexSignature",
            key,
            right: parentParser.parseType(Precedence.ARRAY_BRACKETS)
          };
          parser.acceptLexerState(parentParser);
        } else if (parser.consume("in")) {
          const parentParser = parser.baseParser;
          parentParser.acceptLexerState(parser);
          result = {
            type: "JsdocTypeMappedType",
            key,
            right: parentParser.parseType(Precedence.ARRAY_BRACKETS)
          };
          parser.acceptLexerState(parentParser);
        } else {
          throw new Error("Missing ':' or 'in' inside square bracketed property.");
        }
        if (!parser.consume("]")) {
          throw new Error("Unterminated square brackets");
        }
        return result;
      }
    });
    const objectFieldGrammar = [
      readonlyPropertyParslet,
      createNameParslet({
        allowedAdditionalTokens: ["module", "event", "keyof", "event", "external", "in"]
      }),
      nullableParslet,
      optionalParslet,
      stringValueParslet,
      numberParslet,
      createObjectFieldParslet({
        allowSquaredProperties: true,
        allowKeyTypes: false,
        allowOptional: true,
        allowReadonly: true
      }),
      objectSquaredPropertyParslet
    ];
    const typescriptGrammar = [
      ...baseGrammar,
      createObjectParslet({
        allowKeyTypes: false,
        objectFieldGrammar
      }),
      typeOfParslet,
      keyOfParslet,
      importParslet,
      stringValueParslet,
      createFunctionParslet({
        allowWithoutParenthesis: true,
        allowNoReturnType: false,
        allowNamedParameters: ["this", "new", "args"],
        allowNewAsFunctionKeyword: true
      }),
      createTupleParslet({
        allowQuestionMark: false
      }),
      createVariadicParslet({
        allowEnclosingBrackets: false,
        allowPostfix: false
      }),
      createNameParslet({
        allowedAdditionalTokens: ["event", "external", "in"]
      }),
      createSpecialNamePathParslet({
        allowedTypes: ["module"],
        pathGrammar
      }),
      arrayBracketsParslet,
      arrowFunctionParslet,
      createNamePathParslet({
        allowSquareBracketsOnAnyType: true,
        allowJsdocNamePaths: false,
        pathGrammar
      }),
      intersectionParslet,
      predicateParslet,
      createKeyValueParslet({
        allowVariadic: true,
        allowOptional: true
      })
    ];
    function parse(expression, mode) {
      switch (mode) {
        case "closure":
          return new Parser(closureGrammar, expression).parse();
        case "jsdoc":
          return new Parser(jsdocGrammar, expression).parse();
        case "typescript":
          return new Parser(typescriptGrammar, expression).parse();
      }
    }
    function tryParse(expression, modes = ["typescript", "closure", "jsdoc"]) {
      let error;
      for (const mode of modes) {
        try {
          return parse(expression, mode);
        } catch (e) {
          error = e;
        }
      }
      throw error;
    }
    function transform(rules2, parseResult) {
      const rule = rules2[parseResult.type];
      if (rule === void 0) {
        throw new Error(`In this set of transform rules exists no rule for type ${parseResult.type}.`);
      }
      return rule(parseResult, (aParseResult) => transform(rules2, aParseResult));
    }
    function notAvailableTransform(parseResult) {
      throw new Error("This transform is not available. Are you trying the correct parsing mode?");
    }
    function extractSpecialParams(source) {
      const result = {
        params: []
      };
      for (const param of source.parameters) {
        if (param.type === "JsdocTypeKeyValue") {
          if (param.key === "this") {
            result.this = param.right;
          } else if (param.key === "new") {
            result.new = param.right;
          } else {
            result.params.push(param);
          }
        } else {
          result.params.push(param);
        }
      }
      return result;
    }
    function applyPosition(position, target, value) {
      return position === "prefix" ? value + target : target + value;
    }
    function quote(value, quote2) {
      switch (quote2) {
        case "double":
          return `"${value}"`;
        case "single":
          return `'${value}'`;
        case void 0:
          return value;
      }
    }
    function stringifyRules() {
      return {
        JsdocTypeParenthesis: (result, transform2) => `(${result.element !== void 0 ? transform2(result.element) : ""})`,
        JsdocTypeKeyof: (result, transform2) => `keyof ${transform2(result.element)}`,
        JsdocTypeFunction: (result, transform2) => {
          if (!result.arrow) {
            let stringified = result.constructor ? "new" : "function";
            if (!result.parenthesis) {
              return stringified;
            }
            stringified += `(${result.parameters.map(transform2).join(", ")})`;
            if (result.returnType !== void 0) {
              stringified += `: ${transform2(result.returnType)}`;
            }
            return stringified;
          } else {
            if (result.returnType === void 0) {
              throw new Error("Arrow function needs a return type.");
            }
            let stringified = `(${result.parameters.map(transform2).join(", ")}) => ${transform2(result.returnType)}`;
            if (result.constructor) {
              stringified = "new " + stringified;
            }
            return stringified;
          }
        },
        JsdocTypeName: (result) => result.value,
        JsdocTypeTuple: (result, transform2) => `[${result.elements.map(transform2).join(", ")}]`,
        JsdocTypeVariadic: (result, transform2) => result.meta.position === void 0 ? "..." : applyPosition(result.meta.position, transform2(result.element), "..."),
        JsdocTypeNamePath: (result, transform2) => {
          const left = transform2(result.left);
          const right = transform2(result.right);
          switch (result.pathType) {
            case "inner":
              return `${left}~${right}`;
            case "instance":
              return `${left}#${right}`;
            case "property":
              return `${left}.${right}`;
            case "property-brackets":
              return `${left}[${right}]`;
          }
        },
        JsdocTypeStringValue: (result) => quote(result.value, result.meta.quote),
        JsdocTypeAny: () => "*",
        JsdocTypeGeneric: (result, transform2) => {
          if (result.meta.brackets === "square") {
            const element = result.elements[0];
            const transformed = transform2(element);
            if (element.type === "JsdocTypeUnion" || element.type === "JsdocTypeIntersection") {
              return `(${transformed})[]`;
            } else {
              return `${transformed}[]`;
            }
          } else {
            return `${transform2(result.left)}${result.meta.dot ? "." : ""}<${result.elements.map(transform2).join(", ")}>`;
          }
        },
        JsdocTypeImport: (result, transform2) => `import(${transform2(result.element)})`,
        JsdocTypeObjectField: (result, transform2) => {
          let text = "";
          if (result.readonly) {
            text += "readonly ";
          }
          if (typeof result.key === "string") {
            text += quote(result.key, result.meta.quote);
          } else {
            text += transform2(result.key);
          }
          if (result.optional) {
            text += "?";
          }
          if (result.right === void 0) {
            return text;
          } else {
            return text + `: ${transform2(result.right)}`;
          }
        },
        JsdocTypeJsdocObjectField: (result, transform2) => {
          return `${transform2(result.left)}: ${transform2(result.right)}`;
        },
        JsdocTypeKeyValue: (result, transform2) => {
          let text = result.key;
          if (result.optional) {
            text += "?";
          }
          if (result.variadic) {
            text = "..." + text;
          }
          if (result.right === void 0) {
            return text;
          } else {
            return text + `: ${transform2(result.right)}`;
          }
        },
        JsdocTypeSpecialNamePath: (result) => `${result.specialType}:${quote(result.value, result.meta.quote)}`,
        JsdocTypeNotNullable: (result, transform2) => applyPosition(result.meta.position, transform2(result.element), "!"),
        JsdocTypeNull: () => "null",
        JsdocTypeNullable: (result, transform2) => applyPosition(result.meta.position, transform2(result.element), "?"),
        JsdocTypeNumber: (result) => result.value.toString(),
        JsdocTypeObject: (result, transform2) => `{${result.elements.map(transform2).join((result.meta.separator === "comma" ? "," : ";") + " ")}}`,
        JsdocTypeOptional: (result, transform2) => applyPosition(result.meta.position, transform2(result.element), "="),
        JsdocTypeSymbol: (result, transform2) => `${result.value}(${result.element !== void 0 ? transform2(result.element) : ""})`,
        JsdocTypeTypeof: (result, transform2) => `typeof ${transform2(result.element)}`,
        JsdocTypeUndefined: () => "undefined",
        JsdocTypeUnion: (result, transform2) => result.elements.map(transform2).join(" | "),
        JsdocTypeUnknown: () => "?",
        JsdocTypeIntersection: (result, transform2) => result.elements.map(transform2).join(" & "),
        JsdocTypeProperty: (result) => quote(result.value, result.meta.quote),
        JsdocTypePredicate: (result, transform2) => `${transform2(result.left)} is ${transform2(result.right)}`,
        JsdocTypeIndexSignature: (result, transform2) => `[${result.key}: ${transform2(result.right)}]`,
        JsdocTypeMappedType: (result, transform2) => `[${result.key} in ${transform2(result.right)}]`
      };
    }
    const storedStringifyRules = stringifyRules();
    function stringify(result) {
      return transform(storedStringifyRules, result);
    }
    const reservedWords = [
      "null",
      "true",
      "false",
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "debugger",
      "default",
      "delete",
      "do",
      "else",
      "export",
      "extends",
      "finally",
      "for",
      "function",
      "if",
      "import",
      "in",
      "instanceof",
      "new",
      "return",
      "super",
      "switch",
      "this",
      "throw",
      "try",
      "typeof",
      "var",
      "void",
      "while",
      "with",
      "yield"
    ];
    function makeName(value) {
      const result = {
        type: "NameExpression",
        name: value
      };
      if (reservedWords.includes(value)) {
        result.reservedWord = true;
      }
      return result;
    }
    const catharsisTransformRules = {
      JsdocTypeOptional: (result, transform2) => {
        const transformed = transform2(result.element);
        transformed.optional = true;
        return transformed;
      },
      JsdocTypeNullable: (result, transform2) => {
        const transformed = transform2(result.element);
        transformed.nullable = true;
        return transformed;
      },
      JsdocTypeNotNullable: (result, transform2) => {
        const transformed = transform2(result.element);
        transformed.nullable = false;
        return transformed;
      },
      JsdocTypeVariadic: (result, transform2) => {
        if (result.element === void 0) {
          throw new Error("dots without value are not allowed in catharsis mode");
        }
        const transformed = transform2(result.element);
        transformed.repeatable = true;
        return transformed;
      },
      JsdocTypeAny: () => ({
        type: "AllLiteral"
      }),
      JsdocTypeNull: () => ({
        type: "NullLiteral"
      }),
      JsdocTypeStringValue: (result) => makeName(quote(result.value, result.meta.quote)),
      JsdocTypeUndefined: () => ({
        type: "UndefinedLiteral"
      }),
      JsdocTypeUnknown: () => ({
        type: "UnknownLiteral"
      }),
      JsdocTypeFunction: (result, transform2) => {
        const params = extractSpecialParams(result);
        const transformed = {
          type: "FunctionType",
          params: params.params.map(transform2)
        };
        if (params.this !== void 0) {
          transformed.this = transform2(params.this);
        }
        if (params.new !== void 0) {
          transformed.new = transform2(params.new);
        }
        if (result.returnType !== void 0) {
          transformed.result = transform2(result.returnType);
        }
        return transformed;
      },
      JsdocTypeGeneric: (result, transform2) => ({
        type: "TypeApplication",
        applications: result.elements.map((o) => transform2(o)),
        expression: transform2(result.left)
      }),
      JsdocTypeSpecialNamePath: (result) => makeName(result.specialType + ":" + quote(result.value, result.meta.quote)),
      JsdocTypeName: (result) => {
        if (result.value !== "function") {
          return makeName(result.value);
        } else {
          return {
            type: "FunctionType",
            params: []
          };
        }
      },
      JsdocTypeNumber: (result) => makeName(result.value.toString()),
      JsdocTypeObject: (result, transform2) => {
        const transformed = {
          type: "RecordType",
          fields: []
        };
        for (const field of result.elements) {
          if (field.type !== "JsdocTypeObjectField" && field.type !== "JsdocTypeJsdocObjectField") {
            transformed.fields.push({
              type: "FieldType",
              key: transform2(field),
              value: void 0
            });
          } else {
            transformed.fields.push(transform2(field));
          }
        }
        return transformed;
      },
      JsdocTypeObjectField: (result, transform2) => {
        if (typeof result.key !== "string") {
          throw new Error("Index signatures and mapped types are not supported");
        }
        return {
          type: "FieldType",
          key: makeName(quote(result.key, result.meta.quote)),
          value: result.right === void 0 ? void 0 : transform2(result.right)
        };
      },
      JsdocTypeJsdocObjectField: (result, transform2) => ({
        type: "FieldType",
        key: transform2(result.left),
        value: transform2(result.right)
      }),
      JsdocTypeUnion: (result, transform2) => ({
        type: "TypeUnion",
        elements: result.elements.map((e) => transform2(e))
      }),
      JsdocTypeKeyValue: (result, transform2) => {
        return {
          type: "FieldType",
          key: makeName(result.key),
          value: result.right === void 0 ? void 0 : transform2(result.right)
        };
      },
      JsdocTypeNamePath: (result, transform2) => {
        const leftResult = transform2(result.left);
        let rightValue;
        if (result.right.type === "JsdocTypeSpecialNamePath") {
          rightValue = transform2(result.right).name;
        } else {
          rightValue = quote(result.right.value, result.right.meta.quote);
        }
        const joiner = result.pathType === "inner" ? "~" : result.pathType === "instance" ? "#" : ".";
        return makeName(`${leftResult.name}${joiner}${rightValue}`);
      },
      JsdocTypeSymbol: (result) => {
        let value = "";
        let element = result.element;
        let trailingDots = false;
        if ((element === null || element === void 0 ? void 0 : element.type) === "JsdocTypeVariadic") {
          if (element.meta.position === "prefix") {
            value = "...";
          } else {
            trailingDots = true;
          }
          element = element.element;
        }
        if ((element === null || element === void 0 ? void 0 : element.type) === "JsdocTypeName") {
          value += element.value;
        } else if ((element === null || element === void 0 ? void 0 : element.type) === "JsdocTypeNumber") {
          value += element.value.toString();
        }
        if (trailingDots) {
          value += "...";
        }
        return makeName(`${result.value}(${value})`);
      },
      JsdocTypeParenthesis: (result, transform2) => transform2(assertRootResult(result.element)),
      JsdocTypeMappedType: notAvailableTransform,
      JsdocTypeIndexSignature: notAvailableTransform,
      JsdocTypeImport: notAvailableTransform,
      JsdocTypeKeyof: notAvailableTransform,
      JsdocTypeTuple: notAvailableTransform,
      JsdocTypeTypeof: notAvailableTransform,
      JsdocTypeIntersection: notAvailableTransform,
      JsdocTypeProperty: notAvailableTransform,
      JsdocTypePredicate: notAvailableTransform
    };
    function catharsisTransform(result) {
      return transform(catharsisTransformRules, result);
    }
    function getQuoteStyle(quote2) {
      switch (quote2) {
        case void 0:
          return "none";
        case "single":
          return "single";
        case "double":
          return "double";
      }
    }
    function getMemberType(type) {
      switch (type) {
        case "inner":
          return "INNER_MEMBER";
        case "instance":
          return "INSTANCE_MEMBER";
        case "property":
          return "MEMBER";
        case "property-brackets":
          return "MEMBER";
      }
    }
    function nestResults(type, results) {
      if (results.length === 2) {
        return {
          type,
          left: results[0],
          right: results[1]
        };
      } else {
        return {
          type,
          left: results[0],
          right: nestResults(type, results.slice(1))
        };
      }
    }
    const jtpRules = {
      JsdocTypeOptional: (result, transform2) => ({
        type: "OPTIONAL",
        value: transform2(result.element),
        meta: {
          syntax: result.meta.position === "prefix" ? "PREFIX_EQUAL_SIGN" : "SUFFIX_EQUALS_SIGN"
        }
      }),
      JsdocTypeNullable: (result, transform2) => ({
        type: "NULLABLE",
        value: transform2(result.element),
        meta: {
          syntax: result.meta.position === "prefix" ? "PREFIX_QUESTION_MARK" : "SUFFIX_QUESTION_MARK"
        }
      }),
      JsdocTypeNotNullable: (result, transform2) => ({
        type: "NOT_NULLABLE",
        value: transform2(result.element),
        meta: {
          syntax: result.meta.position === "prefix" ? "PREFIX_BANG" : "SUFFIX_BANG"
        }
      }),
      JsdocTypeVariadic: (result, transform2) => {
        const transformed = {
          type: "VARIADIC",
          meta: {
            syntax: result.meta.position === "prefix" ? "PREFIX_DOTS" : result.meta.position === "suffix" ? "SUFFIX_DOTS" : "ONLY_DOTS"
          }
        };
        if (result.element !== void 0) {
          transformed.value = transform2(result.element);
        }
        return transformed;
      },
      JsdocTypeName: (result) => ({
        type: "NAME",
        name: result.value
      }),
      JsdocTypeTypeof: (result, transform2) => ({
        type: "TYPE_QUERY",
        name: transform2(result.element)
      }),
      JsdocTypeTuple: (result, transform2) => ({
        type: "TUPLE",
        entries: result.elements.map(transform2)
      }),
      JsdocTypeKeyof: (result, transform2) => ({
        type: "KEY_QUERY",
        value: transform2(result.element)
      }),
      JsdocTypeImport: (result) => ({
        type: "IMPORT",
        path: {
          type: "STRING_VALUE",
          quoteStyle: getQuoteStyle(result.element.meta.quote),
          string: result.element.value
        }
      }),
      JsdocTypeUndefined: () => ({
        type: "NAME",
        name: "undefined"
      }),
      JsdocTypeAny: () => ({
        type: "ANY"
      }),
      JsdocTypeFunction: (result, transform2) => {
        const specialParams = extractSpecialParams(result);
        const transformed = {
          type: result.arrow ? "ARROW" : "FUNCTION",
          params: specialParams.params.map((param) => {
            if (param.type === "JsdocTypeKeyValue") {
              if (param.right === void 0) {
                throw new Error("Function parameter without ':' is not expected to be 'KEY_VALUE'");
              }
              return {
                type: "NAMED_PARAMETER",
                name: param.key,
                typeName: transform2(param.right)
              };
            } else {
              return transform2(param);
            }
          }),
          new: null,
          returns: null
        };
        if (specialParams.this !== void 0) {
          transformed.this = transform2(specialParams.this);
        } else if (!result.arrow) {
          transformed.this = null;
        }
        if (specialParams.new !== void 0) {
          transformed.new = transform2(specialParams.new);
        }
        if (result.returnType !== void 0) {
          transformed.returns = transform2(result.returnType);
        }
        return transformed;
      },
      JsdocTypeGeneric: (result, transform2) => {
        const transformed = {
          type: "GENERIC",
          subject: transform2(result.left),
          objects: result.elements.map(transform2),
          meta: {
            syntax: result.meta.brackets === "square" ? "SQUARE_BRACKET" : result.meta.dot ? "ANGLE_BRACKET_WITH_DOT" : "ANGLE_BRACKET"
          }
        };
        if (result.meta.brackets === "square" && result.elements[0].type === "JsdocTypeFunction" && !result.elements[0].parenthesis) {
          transformed.objects[0] = {
            type: "NAME",
            name: "function"
          };
        }
        return transformed;
      },
      JsdocTypeObjectField: (result, transform2) => {
        if (typeof result.key !== "string") {
          throw new Error("Index signatures and mapped types are not supported");
        }
        if (result.right === void 0) {
          return {
            type: "RECORD_ENTRY",
            key: result.key,
            quoteStyle: getQuoteStyle(result.meta.quote),
            value: null,
            readonly: false
          };
        }
        let right = transform2(result.right);
        if (result.optional) {
          right = {
            type: "OPTIONAL",
            value: right,
            meta: {
              syntax: "SUFFIX_KEY_QUESTION_MARK"
            }
          };
        }
        return {
          type: "RECORD_ENTRY",
          key: result.key.toString(),
          quoteStyle: getQuoteStyle(result.meta.quote),
          value: right,
          readonly: false
        };
      },
      JsdocTypeJsdocObjectField: () => {
        throw new Error("Keys may not be typed in jsdoctypeparser.");
      },
      JsdocTypeKeyValue: (result, transform2) => {
        if (result.right === void 0) {
          return {
            type: "RECORD_ENTRY",
            key: result.key,
            quoteStyle: "none",
            value: null,
            readonly: false
          };
        }
        let right = transform2(result.right);
        if (result.optional) {
          right = {
            type: "OPTIONAL",
            value: right,
            meta: {
              syntax: "SUFFIX_KEY_QUESTION_MARK"
            }
          };
        }
        return {
          type: "RECORD_ENTRY",
          key: result.key,
          quoteStyle: "none",
          value: right,
          readonly: false
        };
      },
      JsdocTypeObject: (result, transform2) => {
        const entries = [];
        for (const field of result.elements) {
          if (field.type === "JsdocTypeObjectField" || field.type === "JsdocTypeJsdocObjectField") {
            entries.push(transform2(field));
          }
        }
        return {
          type: "RECORD",
          entries
        };
      },
      JsdocTypeSpecialNamePath: (result) => {
        if (result.specialType !== "module") {
          throw new Error(`jsdoctypeparser does not support type ${result.specialType} at this point.`);
        }
        return {
          type: "MODULE",
          value: {
            type: "FILE_PATH",
            quoteStyle: getQuoteStyle(result.meta.quote),
            path: result.value
          }
        };
      },
      JsdocTypeNamePath: (result, transform2) => {
        let hasEventPrefix = false;
        let name;
        let quoteStyle;
        if (result.right.type === "JsdocTypeSpecialNamePath" && result.right.specialType === "event") {
          hasEventPrefix = true;
          name = result.right.value;
          quoteStyle = getQuoteStyle(result.right.meta.quote);
        } else {
          name = result.right.value;
          quoteStyle = getQuoteStyle(result.right.meta.quote);
        }
        const transformed = {
          type: getMemberType(result.pathType),
          owner: transform2(result.left),
          name,
          quoteStyle,
          hasEventPrefix
        };
        if (transformed.owner.type === "MODULE") {
          const tModule = transformed.owner;
          transformed.owner = transformed.owner.value;
          tModule.value = transformed;
          return tModule;
        } else {
          return transformed;
        }
      },
      JsdocTypeUnion: (result, transform2) => nestResults("UNION", result.elements.map(transform2)),
      JsdocTypeParenthesis: (result, transform2) => ({
        type: "PARENTHESIS",
        value: transform2(assertRootResult(result.element))
      }),
      JsdocTypeNull: () => ({
        type: "NAME",
        name: "null"
      }),
      JsdocTypeUnknown: () => ({
        type: "UNKNOWN"
      }),
      JsdocTypeStringValue: (result) => ({
        type: "STRING_VALUE",
        quoteStyle: getQuoteStyle(result.meta.quote),
        string: result.value
      }),
      JsdocTypeIntersection: (result, transform2) => nestResults("INTERSECTION", result.elements.map(transform2)),
      JsdocTypeNumber: (result) => ({
        type: "NUMBER_VALUE",
        number: result.value.toString()
      }),
      JsdocTypeSymbol: notAvailableTransform,
      JsdocTypeProperty: notAvailableTransform,
      JsdocTypePredicate: notAvailableTransform,
      JsdocTypeMappedType: notAvailableTransform,
      JsdocTypeIndexSignature: notAvailableTransform
    };
    function jtpTransform(result) {
      return transform(jtpRules, result);
    }
    function identityTransformRules() {
      return {
        JsdocTypeIntersection: (result, transform2) => ({
          type: "JsdocTypeIntersection",
          elements: result.elements.map(transform2)
        }),
        JsdocTypeGeneric: (result, transform2) => ({
          type: "JsdocTypeGeneric",
          left: transform2(result.left),
          elements: result.elements.map(transform2),
          meta: {
            dot: result.meta.dot,
            brackets: result.meta.brackets
          }
        }),
        JsdocTypeNullable: (result) => result,
        JsdocTypeUnion: (result, transform2) => ({
          type: "JsdocTypeUnion",
          elements: result.elements.map(transform2)
        }),
        JsdocTypeUnknown: (result) => result,
        JsdocTypeUndefined: (result) => result,
        JsdocTypeTypeof: (result, transform2) => ({
          type: "JsdocTypeTypeof",
          element: transform2(result.element)
        }),
        JsdocTypeSymbol: (result, transform2) => {
          const transformed = {
            type: "JsdocTypeSymbol",
            value: result.value
          };
          if (result.element !== void 0) {
            transformed.element = transform2(result.element);
          }
          return transformed;
        },
        JsdocTypeOptional: (result, transform2) => ({
          type: "JsdocTypeOptional",
          element: transform2(result.element),
          meta: {
            position: result.meta.position
          }
        }),
        JsdocTypeObject: (result, transform2) => ({
          type: "JsdocTypeObject",
          meta: {
            separator: "comma"
          },
          elements: result.elements.map(transform2)
        }),
        JsdocTypeNumber: (result) => result,
        JsdocTypeNull: (result) => result,
        JsdocTypeNotNullable: (result, transform2) => ({
          type: "JsdocTypeNotNullable",
          element: transform2(result.element),
          meta: {
            position: result.meta.position
          }
        }),
        JsdocTypeSpecialNamePath: (result) => result,
        JsdocTypeObjectField: (result, transform2) => ({
          type: "JsdocTypeObjectField",
          key: result.key,
          right: result.right === void 0 ? void 0 : transform2(result.right),
          optional: result.optional,
          readonly: result.readonly,
          meta: result.meta
        }),
        JsdocTypeJsdocObjectField: (result, transform2) => ({
          type: "JsdocTypeJsdocObjectField",
          left: transform2(result.left),
          right: transform2(result.right)
        }),
        JsdocTypeKeyValue: (result, transform2) => {
          return {
            type: "JsdocTypeKeyValue",
            key: result.key,
            right: result.right === void 0 ? void 0 : transform2(result.right),
            optional: result.optional,
            variadic: result.variadic
          };
        },
        JsdocTypeImport: (result, transform2) => ({
          type: "JsdocTypeImport",
          element: transform2(result.element)
        }),
        JsdocTypeAny: (result) => result,
        JsdocTypeStringValue: (result) => result,
        JsdocTypeNamePath: (result) => result,
        JsdocTypeVariadic: (result, transform2) => {
          const transformed = {
            type: "JsdocTypeVariadic",
            meta: {
              position: result.meta.position,
              squareBrackets: result.meta.squareBrackets
            }
          };
          if (result.element !== void 0) {
            transformed.element = transform2(result.element);
          }
          return transformed;
        },
        JsdocTypeTuple: (result, transform2) => ({
          type: "JsdocTypeTuple",
          elements: result.elements.map(transform2)
        }),
        JsdocTypeName: (result) => result,
        JsdocTypeFunction: (result, transform2) => {
          const transformed = {
            type: "JsdocTypeFunction",
            arrow: result.arrow,
            parameters: result.parameters.map(transform2),
            constructor: result.constructor,
            parenthesis: result.parenthesis
          };
          if (result.returnType !== void 0) {
            transformed.returnType = transform2(result.returnType);
          }
          return transformed;
        },
        JsdocTypeKeyof: (result, transform2) => ({
          type: "JsdocTypeKeyof",
          element: transform2(result.element)
        }),
        JsdocTypeParenthesis: (result, transform2) => ({
          type: "JsdocTypeParenthesis",
          element: transform2(result.element)
        }),
        JsdocTypeProperty: (result) => result,
        JsdocTypePredicate: (result, transform2) => ({
          type: "JsdocTypePredicate",
          left: transform2(result.left),
          right: transform2(result.right)
        }),
        JsdocTypeIndexSignature: (result, transform2) => ({
          type: "JsdocTypeIndexSignature",
          key: result.key,
          right: transform2(result.right)
        }),
        JsdocTypeMappedType: (result, transform2) => ({
          type: "JsdocTypeMappedType",
          key: result.key,
          right: transform2(result.right)
        })
      };
    }
    const visitorKeys = {
      JsdocTypeAny: [],
      JsdocTypeFunction: ["parameters", "returnType"],
      JsdocTypeGeneric: ["left", "elements"],
      JsdocTypeImport: [],
      JsdocTypeIndexSignature: ["right"],
      JsdocTypeIntersection: ["elements"],
      JsdocTypeKeyof: ["element"],
      JsdocTypeKeyValue: ["right"],
      JsdocTypeMappedType: ["right"],
      JsdocTypeName: [],
      JsdocTypeNamePath: ["left", "right"],
      JsdocTypeNotNullable: ["element"],
      JsdocTypeNull: [],
      JsdocTypeNullable: ["element"],
      JsdocTypeNumber: [],
      JsdocTypeObject: ["elements"],
      JsdocTypeObjectField: ["right"],
      JsdocTypeJsdocObjectField: ["left", "right"],
      JsdocTypeOptional: ["element"],
      JsdocTypeParenthesis: ["element"],
      JsdocTypeSpecialNamePath: [],
      JsdocTypeStringValue: [],
      JsdocTypeSymbol: ["element"],
      JsdocTypeTuple: ["elements"],
      JsdocTypeTypeof: ["element"],
      JsdocTypeUndefined: [],
      JsdocTypeUnion: ["elements"],
      JsdocTypeUnknown: [],
      JsdocTypeVariadic: ["element"],
      JsdocTypeProperty: [],
      JsdocTypePredicate: ["left", "right"]
    };
    function _traverse(node, parentNode, property, onEnter, onLeave) {
      onEnter === null || onEnter === void 0 ? void 0 : onEnter(node, parentNode, property);
      const keysToVisit = visitorKeys[node.type];
      for (const key of keysToVisit) {
        const value = node[key];
        if (value !== void 0) {
          if (Array.isArray(value)) {
            for (const element of value) {
              _traverse(element, node, key, onEnter, onLeave);
            }
          } else {
            _traverse(value, node, key, onEnter, onLeave);
          }
        }
      }
      onLeave === null || onLeave === void 0 ? void 0 : onLeave(node, parentNode, property);
    }
    function traverse(node, onEnter, onLeave) {
      _traverse(node, void 0, void 0, onEnter, onLeave);
    }
    exports2.catharsisTransform = catharsisTransform;
    exports2.identityTransformRules = identityTransformRules;
    exports2.jtpTransform = jtpTransform;
    exports2.parse = parse;
    exports2.stringify = stringify;
    exports2.stringifyRules = stringifyRules;
    exports2.transform = transform;
    exports2.traverse = traverse;
    exports2.tryParse = tryParse;
    exports2.visitorKeys = visitorKeys;
  });
})(dist, dist.exports);
var distExports = dist.exports;
var ii = Object.create;
var he = Object.defineProperty;
var si = Object.getOwnPropertyDescriptor;
var ui = Object.getOwnPropertyNames;
var pi = Object.getPrototypeOf, ci = Object.prototype.hasOwnProperty;
var t = (e, r) => he(e, "name", { value: r, configurable: true });
var i = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports);
var li = (e, r, n, o) => {
  if (r && typeof r == "object" || typeof r == "function")
    for (let a of ui(r))
      !ci.call(e, a) && a !== n && he(e, a, { get: () => r[a], enumerable: !(o = si(r, a)) || o.enumerable });
  return e;
};
var fi = (e, r, n) => (n = e != null ? ii(pi(e)) : {}, li(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  he(n, "default", { value: e, enumerable: true }),
  e
));
var Te = i((wg, rr) => {
  var hi = typeof global == "object" && global && global.Object === Object && global;
  rr.exports = hi;
});
var D = i((Ag, tr) => {
  var Ti = Te(), xi = typeof self == "object" && self && self.Object === Object && self, bi = Ti || xi || Function("return this")();
  tr.exports = bi;
});
var B = i((Eg, nr) => {
  var vi = D(), Di = vi.Symbol;
  nr.exports = Di;
});
var sr = i((jg, ir) => {
  var or = B(), ar = Object.prototype, Pi = ar.hasOwnProperty, qi = ar.toString, z = or ? or.toStringTag : void 0;
  function Si(e) {
    var r = Pi.call(e, z), n = e[z];
    try {
      e[z] = void 0;
      var o = true;
    } catch {
    }
    var a = qi.call(e);
    return o && (r ? e[z] = n : delete e[z]), a;
  }
  t(Si, "getRawTag");
  ir.exports = Si;
});
var pr = i((Ig, ur) => {
  var _i = Object.prototype, Oi = _i.toString;
  function wi(e) {
    return Oi.call(e);
  }
  t(wi, "objectToString");
  ur.exports = wi;
});
var j = i((Ng, fr) => {
  var cr = B(), Ai = sr(), Ei = pr(), ji = "[object Null]", Ci = "[object Undefined]", lr = cr ? cr.toStringTag : void 0;
  function Ii(e) {
    return e == null ? e === void 0 ? Ci : ji : lr && lr in Object(e) ? Ai(e) : Ei(e);
  }
  t(Ii, "baseGetTag");
  fr.exports = Ii;
});
var re = i((Lg, mr) => {
  function Fi(e) {
    var r = typeof e;
    return e != null && (r == "object" || r == "function");
  }
  t(Fi, "isObject");
  mr.exports = Fi;
});
var xe = i((Jg, gr) => {
  var Ni = j(), Ri = re(), Li = "[object AsyncFunction]", Mi = "[object Function]", Ji = "[object GeneratorFunction]", Ui = "[object Proxy]";
  function Gi(e) {
    if (!Ri(e))
      return false;
    var r = Ni(e);
    return r == Mi || r == Ji || r == Li || r == Ui;
  }
  t(Gi, "isFunction");
  gr.exports = Gi;
});
var dr = i((Gg, yr) => {
  var Vi = D(), Bi = Vi["__core-js_shared__"];
  yr.exports = Bi;
});
var xr = i((Vg, Tr) => {
  var be = dr(), hr = function() {
    var e = /[^.]+$/.exec(be && be.keys && be.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  }();
  function zi(e) {
    return !!hr && hr in e;
  }
  t(zi, "isMasked");
  Tr.exports = zi;
});
var ve = i((zg, br) => {
  var ki = Function.prototype, Hi = ki.toString;
  function Ki(e) {
    if (e != null) {
      try {
        return Hi.call(e);
      } catch {
      }
      try {
        return e + "";
      } catch {
      }
    }
    return "";
  }
  t(Ki, "toSource");
  br.exports = Ki;
});
var Dr = i((Hg, vr) => {
  var $i = xe(), Wi = xr(), Yi = re(), Xi = ve(), Qi = /[\\^$.*+?()[\]{}|]/g, Zi = /^\[object .+?Constructor\]$/, es = Function.prototype, rs = Object.prototype, ts = es.toString, ns = rs.hasOwnProperty, os = RegExp(
    "^" + ts.call(ns).replace(Qi, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function as(e) {
    if (!Yi(e) || Wi(e))
      return false;
    var r = $i(e) ? os : Zi;
    return r.test(Xi(e));
  }
  t(as, "baseIsNative");
  vr.exports = as;
});
var qr = i(($g, Pr) => {
  function is(e, r) {
    return e == null ? void 0 : e[r];
  }
  t(is, "getValue");
  Pr.exports = is;
});
var S = i((Yg, Sr) => {
  var ss = Dr(), us = qr();
  function ps(e, r) {
    var n = us(e, r);
    return ss(n) ? n : void 0;
  }
  t(ps, "getNative");
  Sr.exports = ps;
});
var Or = i((Qg, _r) => {
  var cs = S(), ls = function() {
    try {
      var e = cs(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {
    }
  }();
  _r.exports = ls;
});
var Er = i((Zg, Ar) => {
  var wr = Or();
  function fs(e, r, n) {
    r == "__proto__" && wr ? wr(e, r, {
      configurable: true,
      enumerable: true,
      value: n,
      writable: true
    }) : e[r] = n;
  }
  t(fs, "baseAssignValue");
  Ar.exports = fs;
});
var Cr = i((ry, jr) => {
  function ms(e) {
    return function(r, n, o) {
      for (var a = -1, s = Object(r), u = o(r), p = u.length; p--; ) {
        var c = u[e ? p : ++a];
        if (n(s[c], c, s) === false)
          break;
      }
      return r;
    };
  }
  t(ms, "createBaseFor");
  jr.exports = ms;
});
var Fr = i((ny, Ir) => {
  var gs = Cr(), ys = gs();
  Ir.exports = ys;
});
var Rr = i((oy, Nr) => {
  function ds(e, r) {
    for (var n = -1, o = Array(e); ++n < e; )
      o[n] = r(n);
    return o;
  }
  t(ds, "baseTimes");
  Nr.exports = ds;
});
var C = i((iy, Lr) => {
  function hs(e) {
    return e != null && typeof e == "object";
  }
  t(hs, "isObjectLike");
  Lr.exports = hs;
});
var Jr = i((uy, Mr) => {
  var Ts = j(), xs = C(), bs = "[object Arguments]";
  function vs(e) {
    return xs(e) && Ts(e) == bs;
  }
  t(vs, "baseIsArguments");
  Mr.exports = vs;
});
var De = i((cy, Vr) => {
  var Ur = Jr(), Ds = C(), Gr = Object.prototype, Ps = Gr.hasOwnProperty, qs = Gr.propertyIsEnumerable, Ss = Ur(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Ur : function(e) {
    return Ds(e) && Ps.call(e, "callee") && !qs.call(e, "callee");
  };
  Vr.exports = Ss;
});
var P = i((ly, Br) => {
  var _s = Array.isArray;
  Br.exports = _s;
});
var kr = i((fy, zr) => {
  function Os() {
    return false;
  }
  t(Os, "stubFalse");
  zr.exports = Os;
});
var Pe = i((k, I) => {
  var ws = D(), As = kr(), $r = typeof k == "object" && k && !k.nodeType && k, Hr = $r && typeof I == "object" && I && !I.nodeType && I, Es = Hr && Hr.exports === $r, Kr = Es ? ws.Buffer : void 0, js = Kr ? Kr.isBuffer : void 0, Cs = js || As;
  I.exports = Cs;
});
var qe = i((gy, Wr) => {
  var Is = 9007199254740991, Fs = /^(?:0|[1-9]\d*)$/;
  function Ns(e, r) {
    var n = typeof e;
    return r = r ?? Is, !!r && (n == "number" || n != "symbol" && Fs.test(e)) && e > -1 && e % 1 == 0 && e < r;
  }
  t(Ns, "isIndex");
  Wr.exports = Ns;
});
var te = i((dy, Yr) => {
  var Rs = 9007199254740991;
  function Ls(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Rs;
  }
  t(Ls, "isLength");
  Yr.exports = Ls;
});
var Qr = i((Ty, Xr) => {
  var Ms = j(), Js = te(), Us = C(), Gs = "[object Arguments]", Vs = "[object Array]", Bs = "[object Boolean]", zs = "[object Date]", ks = "[object Error]", Hs = "[object Function]", Ks = "[object Map]", $s = "[object Number]", Ws = "[object Object]", Ys = "[object RegExp]", Xs = "[object Set]", Qs = "[object String]", Zs = "[object WeakMap]", eu = "[object ArrayBuffer]", ru = "[object DataView]", tu = "[object Float32Array]", nu = "[object Float64Array]", ou = "[object Int8Array]", au = "[object Int16Array]", iu = "[object Int32Array]", su = "[object Uint8Array]", uu = "[object Uint8ClampedArray]", pu = "[object Uint16Array]", cu = "[object Uint32Array]", m = {};
  m[tu] = m[nu] = m[ou] = m[au] = m[iu] = m[su] = m[uu] = m[pu] = m[cu] = true;
  m[Gs] = m[Vs] = m[eu] = m[Bs] = m[ru] = m[zs] = m[ks] = m[Hs] = m[Ks] = m[$s] = m[Ws] = m[Ys] = m[Xs] = m[Qs] = m[Zs] = false;
  function lu(e) {
    return Us(e) && Js(e.length) && !!m[Ms(e)];
  }
  t(lu, "baseIsTypedArray");
  Xr.exports = lu;
});
var et = i((by, Zr) => {
  function fu(e) {
    return function(r) {
      return e(r);
    };
  }
  t(fu, "baseUnary");
  Zr.exports = fu;
});
var tt = i((H, F) => {
  var mu = Te(), rt = typeof H == "object" && H && !H.nodeType && H, K = rt && typeof F == "object" && F && !F.nodeType && F, gu = K && K.exports === rt, Se = gu && mu.process, yu = function() {
    try {
      var e = K && K.require && K.require("util").types;
      return e || Se && Se.binding && Se.binding("util");
    } catch {
    }
  }();
  F.exports = yu;
});
var _e = i((Dy, at) => {
  var du = Qr(), hu = et(), nt = tt(), ot = nt && nt.isTypedArray, Tu = ot ? hu(ot) : du;
  at.exports = Tu;
});
var st = i((Py, it) => {
  var xu = Rr(), bu = De(), vu = P(), Du = Pe(), Pu = qe(), qu = _e(), Su = Object.prototype, _u = Su.hasOwnProperty;
  function Ou(e, r) {
    var n = vu(e), o = !n && bu(e), a = !n && !o && Du(e), s = !n && !o && !a && qu(e), u = n || o || a || s, p = u ? xu(e.length, String) : [], c = p.length;
    for (var l in e)
      (r || _u.call(e, l)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
      (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      a && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      s && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
      Pu(l, c))) && p.push(l);
    return p;
  }
  t(Ou, "arrayLikeKeys");
  it.exports = Ou;
});
var pt = i((Sy, ut) => {
  var wu = Object.prototype;
  function Au(e) {
    var r = e && e.constructor, n = typeof r == "function" && r.prototype || wu;
    return e === n;
  }
  t(Au, "isPrototype");
  ut.exports = Au;
});
var lt = i((Oy, ct) => {
  function Eu(e, r) {
    return function(n) {
      return e(r(n));
    };
  }
  t(Eu, "overArg");
  ct.exports = Eu;
});
var mt = i((Ay, ft) => {
  var ju = lt(), Cu = ju(Object.keys, Object);
  ft.exports = Cu;
});
var yt = i((Ey, gt) => {
  var Iu = pt(), Fu = mt(), Nu = Object.prototype, Ru = Nu.hasOwnProperty;
  function Lu(e) {
    if (!Iu(e))
      return Fu(e);
    var r = [];
    for (var n in Object(e))
      Ru.call(e, n) && n != "constructor" && r.push(n);
    return r;
  }
  t(Lu, "baseKeys");
  gt.exports = Lu;
});
var ht = i((Cy, dt) => {
  var Mu = xe(), Ju = te();
  function Uu(e) {
    return e != null && Ju(e.length) && !Mu(e);
  }
  t(Uu, "isArrayLike");
  dt.exports = Uu;
});
var ne = i((Fy, Tt) => {
  var Gu = st(), Vu = yt(), Bu = ht();
  function zu(e) {
    return Bu(e) ? Gu(e) : Vu(e);
  }
  t(zu, "keys");
  Tt.exports = zu;
});
var bt = i((Ry, xt) => {
  var ku = Fr(), Hu = ne();
  function Ku(e, r) {
    return e && ku(e, r, Hu);
  }
  t(Ku, "baseForOwn");
  xt.exports = Ku;
});
var Dt = i((My, vt) => {
  function $u() {
    this.__data__ = [], this.size = 0;
  }
  t($u, "listCacheClear");
  vt.exports = $u;
});
var Oe = i((Uy, Pt) => {
  function Wu(e, r) {
    return e === r || e !== e && r !== r;
  }
  t(Wu, "eq");
  Pt.exports = Wu;
});
var $ = i((Vy, qt) => {
  var Yu = Oe();
  function Xu(e, r) {
    for (var n = e.length; n--; )
      if (Yu(e[n][0], r))
        return n;
    return -1;
  }
  t(Xu, "assocIndexOf");
  qt.exports = Xu;
});
var _t = i((zy, St) => {
  var Qu = $(), Zu = Array.prototype, ep = Zu.splice;
  function rp(e) {
    var r = this.__data__, n = Qu(r, e);
    if (n < 0)
      return false;
    var o = r.length - 1;
    return n == o ? r.pop() : ep.call(r, n, 1), --this.size, true;
  }
  t(rp, "listCacheDelete");
  St.exports = rp;
});
var wt = i((Hy, Ot) => {
  var tp = $();
  function np(e) {
    var r = this.__data__, n = tp(r, e);
    return n < 0 ? void 0 : r[n][1];
  }
  t(np, "listCacheGet");
  Ot.exports = np;
});
var Et = i(($y, At) => {
  var op = $();
  function ap(e) {
    return op(this.__data__, e) > -1;
  }
  t(ap, "listCacheHas");
  At.exports = ap;
});
var Ct = i((Yy, jt) => {
  var ip = $();
  function sp(e, r) {
    var n = this.__data__, o = ip(n, e);
    return o < 0 ? (++this.size, n.push([e, r])) : n[o][1] = r, this;
  }
  t(sp, "listCacheSet");
  jt.exports = sp;
});
var W = i((Qy, It) => {
  var up = Dt(), pp = _t(), cp = wt(), lp = Et(), fp = Ct();
  function N(e) {
    var r = -1, n = e == null ? 0 : e.length;
    for (this.clear(); ++r < n; ) {
      var o = e[r];
      this.set(o[0], o[1]);
    }
  }
  t(N, "ListCache");
  N.prototype.clear = up;
  N.prototype.delete = pp;
  N.prototype.get = cp;
  N.prototype.has = lp;
  N.prototype.set = fp;
  It.exports = N;
});
var Nt = i((ed, Ft) => {
  var mp = W();
  function gp() {
    this.__data__ = new mp(), this.size = 0;
  }
  t(gp, "stackClear");
  Ft.exports = gp;
});
var Lt = i((td, Rt) => {
  function yp(e) {
    var r = this.__data__, n = r.delete(e);
    return this.size = r.size, n;
  }
  t(yp, "stackDelete");
  Rt.exports = yp;
});
var Jt = i((od, Mt) => {
  function dp(e) {
    return this.__data__.get(e);
  }
  t(dp, "stackGet");
  Mt.exports = dp;
});
var Gt = i((id, Ut) => {
  function hp(e) {
    return this.__data__.has(e);
  }
  t(hp, "stackHas");
  Ut.exports = hp;
});
var oe = i((ud, Vt) => {
  var Tp = S(), xp = D(), bp = Tp(xp, "Map");
  Vt.exports = bp;
});
var Y = i((pd, Bt) => {
  var vp = S(), Dp = vp(Object, "create");
  Bt.exports = Dp;
});
var Ht = i((cd, kt) => {
  var zt = Y();
  function Pp() {
    this.__data__ = zt ? zt(null) : {}, this.size = 0;
  }
  t(Pp, "hashClear");
  kt.exports = Pp;
});
var $t = i((fd, Kt) => {
  function qp(e) {
    var r = this.has(e) && delete this.__data__[e];
    return this.size -= r ? 1 : 0, r;
  }
  t(qp, "hashDelete");
  Kt.exports = qp;
});
var Yt = i((gd, Wt) => {
  var Sp = Y(), _p = "__lodash_hash_undefined__", Op = Object.prototype, wp = Op.hasOwnProperty;
  function Ap(e) {
    var r = this.__data__;
    if (Sp) {
      var n = r[e];
      return n === _p ? void 0 : n;
    }
    return wp.call(r, e) ? r[e] : void 0;
  }
  t(Ap, "hashGet");
  Wt.exports = Ap;
});
var Qt = i((dd, Xt) => {
  var Ep = Y(), jp = Object.prototype, Cp = jp.hasOwnProperty;
  function Ip(e) {
    var r = this.__data__;
    return Ep ? r[e] !== void 0 : Cp.call(r, e);
  }
  t(Ip, "hashHas");
  Xt.exports = Ip;
});
var en = i((Td, Zt) => {
  var Fp = Y(), Np = "__lodash_hash_undefined__";
  function Rp(e, r) {
    var n = this.__data__;
    return this.size += this.has(e) ? 0 : 1, n[e] = Fp && r === void 0 ? Np : r, this;
  }
  t(Rp, "hashSet");
  Zt.exports = Rp;
});
var tn = i((bd, rn) => {
  var Lp = Ht(), Mp = $t(), Jp = Yt(), Up = Qt(), Gp = en();
  function R(e) {
    var r = -1, n = e == null ? 0 : e.length;
    for (this.clear(); ++r < n; ) {
      var o = e[r];
      this.set(o[0], o[1]);
    }
  }
  t(R, "Hash");
  R.prototype.clear = Lp;
  R.prototype.delete = Mp;
  R.prototype.get = Jp;
  R.prototype.has = Up;
  R.prototype.set = Gp;
  rn.exports = R;
});
var an = i((Dd, on) => {
  var nn = tn(), Vp = W(), Bp = oe();
  function zp() {
    this.size = 0, this.__data__ = {
      hash: new nn(),
      map: new (Bp || Vp)(),
      string: new nn()
    };
  }
  t(zp, "mapCacheClear");
  on.exports = zp;
});
var un = i((qd, sn) => {
  function kp(e) {
    var r = typeof e;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? e !== "__proto__" : e === null;
  }
  t(kp, "isKeyable");
  sn.exports = kp;
});
var X = i((_d, pn) => {
  var Hp = un();
  function Kp(e, r) {
    var n = e.__data__;
    return Hp(r) ? n[typeof r == "string" ? "string" : "hash"] : n.map;
  }
  t(Kp, "getMapData");
  pn.exports = Kp;
});
var ln = i((wd, cn) => {
  var $p = X();
  function Wp(e) {
    var r = $p(this, e).delete(e);
    return this.size -= r ? 1 : 0, r;
  }
  t(Wp, "mapCacheDelete");
  cn.exports = Wp;
});
var mn = i((Ed, fn) => {
  var Yp = X();
  function Xp(e) {
    return Yp(this, e).get(e);
  }
  t(Xp, "mapCacheGet");
  fn.exports = Xp;
});
var yn = i((Cd, gn) => {
  var Qp = X();
  function Zp(e) {
    return Qp(this, e).has(e);
  }
  t(Zp, "mapCacheHas");
  gn.exports = Zp;
});
var hn = i((Fd, dn) => {
  var ec = X();
  function rc(e, r) {
    var n = ec(this, e), o = n.size;
    return n.set(e, r), this.size += n.size == o ? 0 : 1, this;
  }
  t(rc, "mapCacheSet");
  dn.exports = rc;
});
var ae = i((Rd, Tn) => {
  var tc = an(), nc = ln(), oc = mn(), ac = yn(), ic = hn();
  function L(e) {
    var r = -1, n = e == null ? 0 : e.length;
    for (this.clear(); ++r < n; ) {
      var o = e[r];
      this.set(o[0], o[1]);
    }
  }
  t(L, "MapCache");
  L.prototype.clear = tc;
  L.prototype.delete = nc;
  L.prototype.get = oc;
  L.prototype.has = ac;
  L.prototype.set = ic;
  Tn.exports = L;
});
var bn = i((Md, xn) => {
  var sc = W(), uc = oe(), pc = ae(), cc = 200;
  function lc(e, r) {
    var n = this.__data__;
    if (n instanceof sc) {
      var o = n.__data__;
      if (!uc || o.length < cc - 1)
        return o.push([e, r]), this.size = ++n.size, this;
      n = this.__data__ = new pc(o);
    }
    return n.set(e, r), this.size = n.size, this;
  }
  t(lc, "stackSet");
  xn.exports = lc;
});
var we = i((Ud, vn) => {
  var fc = W(), mc = Nt(), gc = Lt(), yc = Jt(), dc = Gt(), hc = bn();
  function M(e) {
    var r = this.__data__ = new fc(e);
    this.size = r.size;
  }
  t(M, "Stack");
  M.prototype.clear = mc;
  M.prototype.delete = gc;
  M.prototype.get = yc;
  M.prototype.has = dc;
  M.prototype.set = hc;
  vn.exports = M;
});
var Pn = i((Vd, Dn) => {
  var Tc = "__lodash_hash_undefined__";
  function xc(e) {
    return this.__data__.set(e, Tc), this;
  }
  t(xc, "setCacheAdd");
  Dn.exports = xc;
});
var Sn = i((zd, qn) => {
  function bc(e) {
    return this.__data__.has(e);
  }
  t(bc, "setCacheHas");
  qn.exports = bc;
});
var On = i((Hd, _n) => {
  var vc = ae(), Dc = Pn(), Pc = Sn();
  function ie(e) {
    var r = -1, n = e == null ? 0 : e.length;
    for (this.__data__ = new vc(); ++r < n; )
      this.add(e[r]);
  }
  t(ie, "SetCache");
  ie.prototype.add = ie.prototype.push = Dc;
  ie.prototype.has = Pc;
  _n.exports = ie;
});
var An = i(($d, wn) => {
  function qc(e, r) {
    for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
      if (r(e[n], n, e))
        return true;
    return false;
  }
  t(qc, "arraySome");
  wn.exports = qc;
});
var jn = i((Yd, En) => {
  function Sc(e, r) {
    return e.has(r);
  }
  t(Sc, "cacheHas");
  En.exports = Sc;
});
var Ae = i((Qd, Cn) => {
  var _c = On(), Oc = An(), wc = jn(), Ac = 1, Ec = 2;
  function jc(e, r, n, o, a, s) {
    var u = n & Ac, p = e.length, c = r.length;
    if (p != c && !(u && c > p))
      return false;
    var l = s.get(e), f = s.get(r);
    if (l && f)
      return l == r && f == e;
    var d = -1, g = true, x = n & Ec ? new _c() : void 0;
    for (s.set(e, r), s.set(r, e); ++d < p; ) {
      var h = e[d], T = r[d];
      if (o)
        var v = u ? o(T, h, d, r, e, s) : o(h, T, d, e, r, s);
      if (v !== void 0) {
        if (v)
          continue;
        g = false;
        break;
      }
      if (x) {
        if (!Oc(r, function(O, w) {
          if (!wc(x, w) && (h === O || a(h, O, n, o, s)))
            return x.push(w);
        })) {
          g = false;
          break;
        }
      } else if (!(h === T || a(h, T, n, o, s))) {
        g = false;
        break;
      }
    }
    return s.delete(e), s.delete(r), g;
  }
  t(jc, "equalArrays");
  Cn.exports = jc;
});
var Fn = i((eh, In) => {
  var Cc = D(), Ic = Cc.Uint8Array;
  In.exports = Ic;
});
var Rn = i((rh, Nn) => {
  function Fc(e) {
    var r = -1, n = Array(e.size);
    return e.forEach(function(o, a) {
      n[++r] = [a, o];
    }), n;
  }
  t(Fc, "mapToArray");
  Nn.exports = Fc;
});
var Mn = i((nh, Ln) => {
  function Nc(e) {
    var r = -1, n = Array(e.size);
    return e.forEach(function(o) {
      n[++r] = o;
    }), n;
  }
  t(Nc, "setToArray");
  Ln.exports = Nc;
});
var Bn = i((ah, Vn) => {
  var Jn = B(), Un = Fn(), Rc = Oe(), Lc = Ae(), Mc = Rn(), Jc = Mn(), Uc = 1, Gc = 2, Vc = "[object Boolean]", Bc = "[object Date]", zc = "[object Error]", kc = "[object Map]", Hc = "[object Number]", Kc = "[object RegExp]", $c = "[object Set]", Wc = "[object String]", Yc = "[object Symbol]", Xc = "[object ArrayBuffer]", Qc = "[object DataView]", Gn = Jn ? Jn.prototype : void 0, Ee = Gn ? Gn.valueOf : void 0;
  function Zc(e, r, n, o, a, s, u) {
    switch (n) {
      case Qc:
        if (e.byteLength != r.byteLength || e.byteOffset != r.byteOffset)
          return false;
        e = e.buffer, r = r.buffer;
      case Xc:
        return !(e.byteLength != r.byteLength || !s(new Un(e), new Un(r)));
      case Vc:
      case Bc:
      case Hc:
        return Rc(+e, +r);
      case zc:
        return e.name == r.name && e.message == r.message;
      case Kc:
      case Wc:
        return e == r + "";
      case kc:
        var p = Mc;
      case $c:
        var c = o & Uc;
        if (p || (p = Jc), e.size != r.size && !c)
          return false;
        var l = u.get(e);
        if (l)
          return l == r;
        o |= Gc, u.set(e, r);
        var f = Lc(p(e), p(r), o, a, s, u);
        return u.delete(e), f;
      case Yc:
        if (Ee)
          return Ee.call(e) == Ee.call(r);
    }
    return false;
  }
  t(Zc, "equalByTag");
  Vn.exports = Zc;
});
var kn = i((sh, zn) => {
  function el(e, r) {
    for (var n = -1, o = r.length, a = e.length; ++n < o; )
      e[a + n] = r[n];
    return e;
  }
  t(el, "arrayPush");
  zn.exports = el;
});
var Kn = i((ph, Hn) => {
  var rl = kn(), tl = P();
  function nl(e, r, n) {
    var o = r(e);
    return tl(e) ? o : rl(o, n(e));
  }
  t(nl, "baseGetAllKeys");
  Hn.exports = nl;
});
var Wn = i((lh, $n) => {
  function ol(e, r) {
    for (var n = -1, o = e == null ? 0 : e.length, a = 0, s = []; ++n < o; ) {
      var u = e[n];
      r(u, n, e) && (s[a++] = u);
    }
    return s;
  }
  t(ol, "arrayFilter");
  $n.exports = ol;
});
var Xn = i((mh, Yn) => {
  function al() {
    return [];
  }
  t(al, "stubArray");
  Yn.exports = al;
});
var eo = i((yh, Zn) => {
  var il = Wn(), sl = Xn(), ul = Object.prototype, pl = ul.propertyIsEnumerable, Qn = Object.getOwnPropertySymbols, cl = Qn ? function(e) {
    return e == null ? [] : (e = Object(e), il(Qn(e), function(r) {
      return pl.call(e, r);
    }));
  } : sl;
  Zn.exports = cl;
});
var to = i((dh, ro) => {
  var ll = Kn(), fl = eo(), ml = ne();
  function gl(e) {
    return ll(e, ml, fl);
  }
  t(gl, "getAllKeys");
  ro.exports = gl;
});
var ao = i((Th, oo) => {
  var no = to(), yl = 1, dl = Object.prototype, hl = dl.hasOwnProperty;
  function Tl(e, r, n, o, a, s) {
    var u = n & yl, p = no(e), c = p.length, l = no(r), f = l.length;
    if (c != f && !u)
      return false;
    for (var d = c; d--; ) {
      var g = p[d];
      if (!(u ? g in r : hl.call(r, g)))
        return false;
    }
    var x = s.get(e), h = s.get(r);
    if (x && h)
      return x == r && h == e;
    var T = true;
    s.set(e, r), s.set(r, e);
    for (var v = u; ++d < c; ) {
      g = p[d];
      var O = e[g], w = r[g];
      if (o)
        var er = u ? o(w, O, g, r, e, s) : o(O, w, g, e, r, s);
      if (!(er === void 0 ? O === w || a(O, w, n, o, s) : er)) {
        T = false;
        break;
      }
      v || (v = g == "constructor");
    }
    if (T && !v) {
      var Z = e.constructor, ee = r.constructor;
      Z != ee && "constructor" in e && "constructor" in r && !(typeof Z == "function" && Z instanceof Z && typeof ee == "function" && ee instanceof ee) && (T = false);
    }
    return s.delete(e), s.delete(r), T;
  }
  t(Tl, "equalObjects");
  oo.exports = Tl;
});
var so = i((bh, io) => {
  var xl = S(), bl = D(), vl = xl(bl, "DataView");
  io.exports = vl;
});
var po = i((vh, uo) => {
  var Dl = S(), Pl = D(), ql = Dl(Pl, "Promise");
  uo.exports = ql;
});
var lo = i((Dh, co) => {
  var Sl = S(), _l = D(), Ol = Sl(_l, "Set");
  co.exports = Ol;
});
var mo = i((Ph, fo) => {
  var wl = S(), Al = D(), El = wl(Al, "WeakMap");
  fo.exports = El;
});
var Do = i((qh, vo) => {
  var je = so(), Ce = oe(), Ie = po(), Fe = lo(), Ne = mo(), bo = j(), J = ve(), go = "[object Map]", jl = "[object Object]", yo = "[object Promise]", ho = "[object Set]", To = "[object WeakMap]", xo = "[object DataView]", Cl = J(je), Il = J(Ce), Fl = J(Ie), Nl = J(Fe), Rl = J(Ne), A = bo;
  (je && A(new je(new ArrayBuffer(1))) != xo || Ce && A(new Ce()) != go || Ie && A(Ie.resolve()) != yo || Fe && A(new Fe()) != ho || Ne && A(
    new Ne()
  ) != To) && (A = /* @__PURE__ */ t(function(e) {
    var r = bo(e), n = r == jl ? e.constructor : void 0, o = n ? J(n) : "";
    if (o)
      switch (o) {
        case Cl:
          return xo;
        case Il:
          return go;
        case Fl:
          return yo;
        case Nl:
          return ho;
        case Rl:
          return To;
      }
    return r;
  }, "getTag"));
  vo.exports = A;
});
var Eo = i((_h, Ao) => {
  var Re = we(), Ll = Ae(), Ml = Bn(), Jl = ao(), Po = Do(), qo = P(), So = Pe(), Ul = _e(), Gl = 1, _o = "[object Arguments]", Oo = "[object Array]", se = "[object Object]", Vl = Object.prototype, wo = Vl.hasOwnProperty;
  function Bl(e, r, n, o, a, s) {
    var u = qo(e), p = qo(r), c = u ? Oo : Po(e), l = p ? Oo : Po(r);
    c = c == _o ? se : c, l = l == _o ? se : l;
    var f = c == se, d = l == se, g = c == l;
    if (g && So(e)) {
      if (!So(r))
        return false;
      u = true, f = false;
    }
    if (g && !f)
      return s || (s = new Re()), u || Ul(e) ? Ll(e, r, n, o, a, s) : Ml(e, r, c, n, o, a, s);
    if (!(n & Gl)) {
      var x = f && wo.call(e, "__wrapped__"), h = d && wo.call(r, "__wrapped__");
      if (x || h) {
        var T = x ? e.value() : e, v = h ? r.value() : r;
        return s || (s = new Re()), a(T, v, n, o, s);
      }
    }
    return g ? (s || (s = new Re()), Jl(e, r, n, o, a, s)) : false;
  }
  t(Bl, "baseIsEqualDeep");
  Ao.exports = Bl;
});
var Le = i((wh, Io) => {
  var zl = Eo(), jo = C();
  function Co(e, r, n, o, a) {
    return e === r ? true : e == null || r == null || !jo(e) && !jo(r) ? e !== e && r !== r : zl(e, r, n, o, Co, a);
  }
  t(Co, "baseIsEqual");
  Io.exports = Co;
});
var No = i((Eh, Fo) => {
  var kl = we(), Hl = Le(), Kl = 1, $l = 2;
  function Wl(e, r, n, o) {
    var a = n.length, s = a, u = !o;
    if (e == null)
      return !s;
    for (e = Object(e); a--; ) {
      var p = n[a];
      if (u && p[2] ? p[1] !== e[p[0]] : !(p[0] in e))
        return false;
    }
    for (; ++a < s; ) {
      p = n[a];
      var c = p[0], l = e[c], f = p[1];
      if (u && p[2]) {
        if (l === void 0 && !(c in e))
          return false;
      } else {
        var d = new kl();
        if (o)
          var g = o(l, f, c, e, r, d);
        if (!(g === void 0 ? Hl(f, l, Kl | $l, o, d) : g))
          return false;
      }
    }
    return true;
  }
  t(Wl, "baseIsMatch");
  Fo.exports = Wl;
});
var Me = i((Ch, Ro) => {
  var Yl = re();
  function Xl(e) {
    return e === e && !Yl(e);
  }
  t(Xl, "isStrictComparable");
  Ro.exports = Xl;
});
var Mo = i((Fh, Lo) => {
  var Ql = Me(), Zl = ne();
  function ef(e) {
    for (var r = Zl(e), n = r.length; n--; ) {
      var o = r[n], a = e[o];
      r[n] = [o, a, Ql(a)];
    }
    return r;
  }
  t(ef, "getMatchData");
  Lo.exports = ef;
});
var Je = i((Rh, Jo) => {
  function rf(e, r) {
    return function(n) {
      return n == null ? false : n[e] === r && (r !== void 0 || e in Object(n));
    };
  }
  t(rf, "matchesStrictComparable");
  Jo.exports = rf;
});
var Go = i((Mh, Uo) => {
  var tf = No(), nf = Mo(), of = Je();
  function af(e) {
    var r = nf(e);
    return r.length == 1 && r[0][2] ? of(r[0][0], r[0][1]) : function(n) {
      return n === e || tf(n, e, r);
    };
  }
  t(af, "baseMatches");
  Uo.exports = af;
});
var ue = i((Uh, Vo) => {
  var sf = j(), uf = C(), pf = "[object Symbol]";
  function cf(e) {
    return typeof e == "symbol" || uf(e) && sf(e) == pf;
  }
  t(cf, "isSymbol");
  Vo.exports = cf;
});
var pe = i((Vh, Bo) => {
  var lf = P(), ff = ue(), mf = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, gf = /^\w*$/;
  function yf(e, r) {
    if (lf(e))
      return false;
    var n = typeof e;
    return n == "number" || n == "symbol" || n == "boolean" || e == null || ff(e) ? true : gf.test(e) || !mf.test(e) || r != null && e in Object(
      r
    );
  }
  t(yf, "isKey");
  Bo.exports = yf;
});
var Ho = i((zh, ko) => {
  var zo = ae(), df = "Expected a function";
  function Ue(e, r) {
    if (typeof e != "function" || r != null && typeof r != "function")
      throw new TypeError(df);
    var n = /* @__PURE__ */ t(function() {
      var o = arguments, a = r ? r.apply(this, o) : o[0], s = n.cache;
      if (s.has(a))
        return s.get(a);
      var u = e.apply(this, o);
      return n.cache = s.set(a, u) || s, u;
    }, "memoized");
    return n.cache = new (Ue.Cache || zo)(), n;
  }
  t(Ue, "memoize");
  Ue.Cache = zo;
  ko.exports = Ue;
});
var $o = i((Hh, Ko) => {
  var hf = Ho(), Tf = 500;
  function xf(e) {
    var r = hf(e, function(o) {
      return n.size === Tf && n.clear(), o;
    }), n = r.cache;
    return r;
  }
  t(xf, "memoizeCapped");
  Ko.exports = xf;
});
var Yo = i(($h, Wo) => {
  var bf = $o(), vf = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Df = /\\(\\)?/g, Pf = bf(
    function(e) {
      var r = [];
      return e.charCodeAt(0) === 46 && r.push(""), e.replace(vf, function(n, o, a, s) {
        r.push(a ? s.replace(Df, "$1") : o || n);
      }), r;
    }
  );
  Wo.exports = Pf;
});
var Qo = i((Wh, Xo) => {
  function qf(e, r) {
    for (var n = -1, o = e == null ? 0 : e.length, a = Array(o); ++n < o; )
      a[n] = r(e[n], n, e);
    return a;
  }
  t(qf, "arrayMap");
  Xo.exports = qf;
});
var oa = i((Xh, na) => {
  var Zo = B(), Sf = Qo(), _f = P(), Of = ue(), wf = 1 / 0, ea = Zo ? Zo.prototype : void 0, ra = ea ? ea.toString : void 0;
  function ta(e) {
    if (typeof e == "string")
      return e;
    if (_f(e))
      return Sf(e, ta) + "";
    if (Of(e))
      return ra ? ra.call(e) : "";
    var r = e + "";
    return r == "0" && 1 / e == -wf ? "-0" : r;
  }
  t(ta, "baseToString");
  na.exports = ta;
});
var ia = i((Zh, aa) => {
  var Af = oa();
  function Ef(e) {
    return e == null ? "" : Af(e);
  }
  t(Ef, "toString");
  aa.exports = Ef;
});
var Ge = i((rT, sa) => {
  var jf = P(), Cf = pe(), If = Yo(), Ff = ia();
  function Nf(e, r) {
    return jf(e) ? e : Cf(e, r) ? [e] : If(Ff(e));
  }
  t(Nf, "castPath");
  sa.exports = Nf;
});
var Q = i((nT, ua) => {
  var Rf = ue(), Lf = 1 / 0;
  function Mf(e) {
    if (typeof e == "string" || Rf(e))
      return e;
    var r = e + "";
    return r == "0" && 1 / e == -Lf ? "-0" : r;
  }
  t(Mf, "toKey");
  ua.exports = Mf;
});
var Ve = i((aT, pa) => {
  var Jf = Ge(), Uf = Q();
  function Gf(e, r) {
    r = Jf(r, e);
    for (var n = 0, o = r.length; e != null && n < o; )
      e = e[Uf(r[n++])];
    return n && n == o ? e : void 0;
  }
  t(Gf, "baseGet");
  pa.exports = Gf;
});
var la = i((sT, ca) => {
  var Vf = Ve();
  function Bf(e, r, n) {
    var o = e == null ? void 0 : Vf(e, r);
    return o === void 0 ? n : o;
  }
  t(Bf, "get");
  ca.exports = Bf;
});
var ma = i((pT, fa) => {
  function zf(e, r) {
    return e != null && r in Object(e);
  }
  t(zf, "baseHasIn");
  fa.exports = zf;
});
var ya = i((lT, ga) => {
  var kf = Ge(), Hf = De(), Kf = P(), $f = qe(), Wf = te(), Yf = Q();
  function Xf(e, r, n) {
    r = kf(r, e);
    for (var o = -1, a = r.length, s = false; ++o < a; ) {
      var u = Yf(r[o]);
      if (!(s = e != null && n(e, u)))
        break;
      e = e[u];
    }
    return s || ++o != a ? s : (a = e == null ? 0 : e.length, !!a && Wf(a) && $f(u, a) && (Kf(e) || Hf(e)));
  }
  t(Xf, "hasPath");
  ga.exports = Xf;
});
var ha = i((mT, da) => {
  var Qf = ma(), Zf = ya();
  function em(e, r) {
    return e != null && Zf(e, r, Qf);
  }
  t(em, "hasIn");
  da.exports = em;
});
var xa = i((yT, Ta) => {
  var rm = Le(), tm = la(), nm = ha(), om = pe(), am = Me(), im = Je(), sm = Q(), um = 1, pm = 2;
  function cm(e, r) {
    return om(e) && am(r) ? im(sm(e), r) : function(n) {
      var o = tm(n, e);
      return o === void 0 && o === r ? nm(n, e) : rm(r, o, um | pm);
    };
  }
  t(cm, "baseMatchesProperty");
  Ta.exports = cm;
});
var va = i((hT, ba) => {
  function lm(e) {
    return e;
  }
  t(lm, "identity");
  ba.exports = lm;
});
var Pa = i((xT, Da) => {
  function fm(e) {
    return function(r) {
      return r == null ? void 0 : r[e];
    };
  }
  t(fm, "baseProperty");
  Da.exports = fm;
});
var Sa = i((vT, qa) => {
  var mm = Ve();
  function gm(e) {
    return function(r) {
      return mm(r, e);
    };
  }
  t(gm, "basePropertyDeep");
  qa.exports = gm;
});
var Oa = i((PT, _a) => {
  var ym = Pa(), dm = Sa(), hm = pe(), Tm = Q();
  function xm(e) {
    return hm(e) ? ym(Tm(e)) : dm(e);
  }
  t(xm, "property");
  _a.exports = xm;
});
var Aa = i((ST, wa) => {
  var bm = Go(), vm = xa(), Dm = va(), Pm = P(), qm = Oa();
  function Sm(e) {
    return typeof e == "function" ? e : e == null ? Dm : typeof e == "object" ? Pm(e) ? vm(e[0], e[1]) : bm(e) : qm(e);
  }
  t(Sm, "baseIteratee");
  wa.exports = Sm;
});
var ja = i((OT, Ea) => {
  var _m = Er(), Om = bt(), wm = Aa();
  function Am(e, r) {
    var n = {};
    return r = wm(r, 3), Om(e, function(o, a, s) {
      _m(n, a, r(o, a, s));
    }), n;
  }
  t(Am, "mapValues");
  Ea.exports = Am;
});
const { UnknownArgTypesError: mi } = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
var gi = /* @__PURE__ */ t((e) => e.name === "literal", "isLiteral"), yi = /* @__PURE__ */ t((e) => e.value.replace(/['|"]/g, ""), "toEnumOption"), di = /* @__PURE__ */ t((e) => {
  switch (e.type) {
    case "function":
      return { name: "function" };
    case "object":
      let r = {};
      return e.signature.properties.forEach((n) => {
        r[n.key] = E(n.value);
      }), {
        name: "object",
        value: r
      };
    default:
      throw new mi({ type: e, language: "Flow" });
  }
}, "convertSig"), E = /* @__PURE__ */ t((e) => {
  var _a, _b, _c, _d;
  let { name: r, raw: n } = e, o = {};
  switch (typeof n < "u" && (o.raw = n), e.name) {
    case "literal":
      return { ...o, name: "other", value: e.value };
    case "string":
    case "number":
    case "symbol":
    case "boolean":
      return { ...o, name: r };
    case "Array":
      return { ...o, name: "array", value: e.elements.map(E) };
    case "signature":
      return { ...o, ...di(e) };
    case "union":
      return ((_a = e.elements) == null ? void 0 : _a.every(gi)) ? { ...o, name: "enum", value: (_b = e.elements) == null ? void 0 : _b.map(yi) } : { ...o, name: r, value: (_c = e.elements) == null ? void 0 : _c.map(E) };
    case "intersection":
      return { ...o, name: r, value: (_d = e.elements) == null ? void 0 : _d.map(E) };
    default:
      return { ...o, name: "other", value: r };
  }
}, "convert");
var Ia = fi(ja());
var Ca = /^['"]|['"]$/g, Em = /* @__PURE__ */ t((e) => e.replace(Ca, ""), "trimQuotes"), jm = /* @__PURE__ */ t((e) => Ca.test(e), "includesQuotes"), ce = /* @__PURE__ */ t((e) => {
  let r = Em(e);
  return jm(e) || Number.isNaN(Number(r)) ? r : Number(r);
}, "parseLiteral");
var Cm = /^\(.*\) => /, U = /* @__PURE__ */ t((e) => {
  let { name: r, raw: n, computed: o, value: a } = e, s = {};
  switch (typeof n < "u" && (s.raw = n), r) {
    case "enum": {
      let p = o ? a : a.map((c) => ce(c.value));
      return { ...s, name: r, value: p };
    }
    case "string":
    case "number":
    case "symbol":
      return { ...s, name: r };
    case "func":
      return { ...s, name: "function" };
    case "bool":
    case "boolean":
      return { ...s, name: "boolean" };
    case "arrayOf":
    case "array":
      return { ...s, name: "array", value: a && U(a) };
    case "object":
      return { ...s, name: r };
    case "objectOf":
      return { ...s, name: r, value: U(a) };
    case "shape":
    case "exact":
      let u = (0, Ia.default)(a, (p) => U(p));
      return { ...s, name: "object", value: u };
    case "union":
      return { ...s, name: "union", value: a.map((p) => U(p)) };
    case "instanceOf":
    case "element":
    case "elementType":
    default: {
      if ((r == null ? void 0 : r.indexOf("|")) > 0)
        try {
          let l = r.split("|").map((f) => JSON.parse(f));
          return { ...s, name: "enum", value: l };
        } catch {
        }
      let p = a ? `${r}(${a})` : r, c = Cm.test(r) ? "function" : "other";
      return { ...s, name: c, value: p };
    }
  }
}, "convert");
const { UnknownArgTypesError: Im } = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
var Fm = /* @__PURE__ */ t((e) => {
  switch (e.type) {
    case "function":
      return { name: "function" };
    case "object":
      let r = {};
      return e.signature.properties.forEach((n) => {
        r[n.key] = G(n.value);
      }), {
        name: "object",
        value: r
      };
    default:
      throw new Im({ type: e, language: "Typescript" });
  }
}, "convertSig"), G = /* @__PURE__ */ t((e) => {
  var _a, _b, _c, _d;
  let { name: r, raw: n } = e, o = {};
  switch (typeof n < "u" && (o.raw = n), e.name) {
    case "string":
    case "number":
    case "symbol":
    case "boolean":
      return { ...o, name: r };
    case "Array":
      return { ...o, name: "array", value: e.elements.map(G) };
    case "signature":
      return { ...o, ...Fm(e) };
    case "union":
      let a;
      return ((_a = e.elements) == null ? void 0 : _a.every((s) => s.name === "literal")) ? a = {
        ...o,
        name: "enum",
        // @ts-expect-error fix types
        value: (_b = e.elements) == null ? void 0 : _b.map((s) => ce(s.value))
      } : a = { ...o, name: r, value: (_c = e.elements) == null ? void 0 : _c.map(G) }, a;
    case "intersection":
      return { ...o, name: r, value: (_d = e.elements) == null ? void 0 : _d.map(G) };
    default:
      return { ...o, name: "other", value: r };
  }
}, "convert");
var le = /* @__PURE__ */ t((e) => {
  let { type: r, tsType: n, flowType: o } = e;
  try {
    if (r != null)
      return U(r);
    if (n != null)
      return G(n);
    if (o != null)
      return E(o);
  } catch (a) {
    console.error(a);
  }
  return null;
}, "convert");
var Nm = /* @__PURE__ */ ((a) => (a.JAVASCRIPT = "JavaScript", a.FLOW = "Flow", a.TYPESCRIPT = "TypeScript", a.UNKNOWN = "Unknown", a))(Nm || {});
var Rm = ["null", "undefined"];
function V(e) {
  return Rm.some((r) => r === e);
}
t(V, "isDefaultValueBlacklisted");
var Fa = /* @__PURE__ */ t((e) => {
  if (!e)
    return "";
  if (typeof e == "string")
    return e;
  throw new Error(`Description: expected string, got: ${JSON.stringify(e)}`);
}, "str");
function Na(e) {
  return !!e.__docgenInfo;
}
t(Na, "hasDocgen");
function Ra(e) {
  return e != null && Object.keys(e).length > 0;
}
t(Ra, "isValidDocgenSection");
function La(e, r) {
  return Na(e) ? e.__docgenInfo[r] : null;
}
t(La, "getDocgenSection");
function Ma(e) {
  return Na(e) ? Fa(e.__docgenInfo.description) : "";
}
t(Ma, "getDocgenDescription");
var b;
(function(e) {
  e.start = "/**", e.nostart = "/***", e.delim = "*", e.end = "*/";
})(b = b || (b = {}));
function Be(e) {
  return /^\s+$/.test(e);
}
t(Be, "isSpace");
function Ja(e) {
  let r = e.match(/\r+$/);
  return r == null ? ["", e] : [e.slice(-r[0].length), e.slice(0, -r[0].length)];
}
t(Ja, "splitCR");
function q(e) {
  let r = e.match(/^\s+/);
  return r == null ? ["", e] : [e.slice(0, r[0].length), e.slice(r[0].length)];
}
t(q, "splitSpace");
function Ua(e) {
  return e.split(/\n/);
}
t(Ua, "splitLines");
function Ga(e = {}) {
  return Object.assign({ tag: "", name: "", type: "", optional: false, description: "", problems: [], source: [] }, e);
}
t(Ga, "seedSpec");
function ze(e = {}) {
  return Object.assign({
    start: "",
    delimiter: "",
    postDelimiter: "",
    tag: "",
    postTag: "",
    name: "",
    postName: "",
    type: "",
    postType: "",
    description: "",
    end: "",
    lineEnd: ""
  }, e);
}
t(ze, "seedTokens");
var Lm = /^@\S+/;
function ke({ fence: e = "```" } = {}) {
  let r = Mm(e), n = /* @__PURE__ */ t((o, a) => r(o) ? !a : a, "toggleFence");
  return /* @__PURE__ */ t(function(a) {
    let s = [[]], u = false;
    for (let p of a)
      Lm.test(p.tokens.description) && !u ? s.push([p]) : s[s.length - 1].push(p), u = n(p.tokens.description, u);
    return s;
  }, "parseBlock");
}
t(ke, "getParser");
function Mm(e) {
  return typeof e == "string" ? (r) => r.split(e).length % 2 === 0 : e;
}
t(Mm, "getFencer");
function He({ startLine: e = 0, markers: r = b } = {}) {
  let n = null, o = e;
  return /* @__PURE__ */ t(function(s) {
    let u = s, p = ze();
    if ([p.lineEnd, u] = Ja(u), [p.start, u] = q(u), n === null && u.startsWith(r.start) && !u.startsWith(r.nostart) && (n = [], p.delimiter = u.slice(0, r.start.length), u = u.slice(r.start.length), [p.postDelimiter, u] = q(u)), n === null)
      return o++, null;
    let c = u.trimRight().endsWith(r.end);
    if (p.delimiter === "" && u.startsWith(r.delim) && !u.startsWith(r.end) && (p.delimiter = r.delim, u = u.slice(r.delim.length), [
      p.postDelimiter,
      u
    ] = q(u)), c) {
      let l = u.trimRight();
      p.end = u.slice(l.length - r.end.length), u = l.slice(0, -r.end.length);
    }
    if (p.description = u, n.push({ number: o, source: s, tokens: p }), o++, c) {
      let l = n.slice();
      return n = null, l;
    }
    return null;
  }, "parseSource");
}
t(He, "getParser");
function Ke({ tokenizers: e }) {
  return /* @__PURE__ */ t(function(n) {
    var o;
    let a = Ga({ source: n });
    for (let s of e)
      if (a = s(a), !((o = a.problems[a.problems.length - 1]) === null || o === void 0) && o.critical)
        break;
    return a;
  }, "parseSpec");
}
t(Ke, "getParser");
function fe() {
  return (e) => {
    let { tokens: r } = e.source[0], n = r.description.match(/\s*(@(\S+))(\s*)/);
    return n === null ? (e.problems.push({
      code: "spec:tag:prefix",
      message: 'tag should start with "@" symbol',
      line: e.source[0].number,
      critical: true
    }), e) : (r.tag = n[1], r.postTag = n[3], r.description = r.description.slice(n[0].length), e.tag = n[2], e);
  };
}
t(fe, "tagTokenizer");
function me(e = "compact") {
  let r = Um(e);
  return (n) => {
    let o = 0, a = [];
    for (let [p, { tokens: c }] of n.source.entries()) {
      let l = "";
      if (p === 0 && c.description[0] !== "{")
        return n;
      for (let f of c.description)
        if (f === "{" && o++, f === "}" && o--, l += f, o === 0)
          break;
      if (a.push([c, l]), o === 0)
        break;
    }
    if (o !== 0)
      return n.problems.push({
        code: "spec:type:unpaired-curlies",
        message: "unpaired curlies",
        line: n.source[0].number,
        critical: true
      }), n;
    let s = [], u = a[0][0].postDelimiter.length;
    for (let [p, [c, l]] of a.entries())
      c.type = l, p > 0 && (c.type = c.postDelimiter.slice(u) + l, c.postDelimiter = c.postDelimiter.slice(0, u)), [c.postType, c.description] = q(c.description.slice(l.length)), s.push(c.type);
    return s[0] = s[0].slice(1), s[s.length - 1] = s[s.length - 1].slice(0, -1), n.type = r(s), n;
  };
}
t(me, "typeTokenizer");
var Jm = /* @__PURE__ */ t((e) => e.trim(), "trim");
function Um(e) {
  return e === "compact" ? (r) => r.map(Jm).join("") : e === "preserve" ? (r) => r.join(`
`) : e;
}
t(Um, "getJoiner");
var Gm = /* @__PURE__ */ t((e) => e && e.startsWith('"') && e.endsWith('"'), "isQuoted");
function ge() {
  let e = /* @__PURE__ */ t((r, { tokens: n }, o) => n.type === "" ? r : o, "typeEnd");
  return (r) => {
    let { tokens: n } = r.source[r.source.reduce(e, 0)], o = n.description.trimLeft(), a = o.split('"');
    if (a.length > 1 && a[0] === "" && a.length % 2 === 1)
      return r.name = a[1], n.name = `"${a[1]}"`, [n.postName, n.description] = q(o.slice(n.name.length)), r;
    let s = 0, u = "", p = false, c;
    for (let f of o) {
      if (s === 0 && Be(f))
        break;
      f === "[" && s++, f === "]" && s--, u += f;
    }
    if (s !== 0)
      return r.problems.push({
        code: "spec:name:unpaired-brackets",
        message: "unpaired brackets",
        line: r.source[0].number,
        critical: true
      }), r;
    let l = u;
    if (u[0] === "[" && u[u.length - 1] === "]") {
      p = true, u = u.slice(1, -1);
      let f = u.split("=");
      if (u = f[0].trim(), f[1] !== void 0 && (c = f.slice(1).join("=").trim()), u === "")
        return r.problems.push({
          code: "spec:name:empty-name",
          message: "empty name",
          line: r.source[0].number,
          critical: true
        }), r;
      if (c === "")
        return r.problems.push({
          code: "spec:name:empty-default",
          message: "empty default value",
          line: r.source[0].number,
          critical: true
        }), r;
      if (!Gm(c) && /=(?!>)/.test(c))
        return r.problems.push({
          code: "spec:name:invalid-default",
          message: "invalid default value syntax",
          line: r.source[0].number,
          critical: true
        }), r;
    }
    return r.optional = p, r.name = u, n.name = l, c !== void 0 && (r.default = c), [n.postName, n.description] = q(o.slice(n.name.length)), r;
  };
}
t(ge, "nameTokenizer");
function ye(e = "compact", r = b) {
  let n = $e(e);
  return (o) => (o.description = n(o.source, r), o);
}
t(ye, "descriptionTokenizer");
function $e(e) {
  return e === "compact" ? Vm : e === "preserve" ? km : e;
}
t($e, "getJoiner");
function Vm(e, r = b) {
  return e.map(({ tokens: { description: n } }) => n.trim()).filter((n) => n !== "").join(" ");
}
t(Vm, "compactJoiner");
var Bm = /* @__PURE__ */ t((e, { tokens: r }, n) => r.type === "" ? e : n, "lineNo"), zm = /* @__PURE__ */ t(({ tokens: e }) => (e.delimiter === "" ? e.start : e.postDelimiter.slice(1)) + e.description, "getDescription");
function km(e, r = b) {
  if (e.length === 0)
    return "";
  e[0].tokens.description === "" && e[0].tokens.delimiter === r.start && (e = e.slice(1));
  let n = e[e.length - 1];
  return n !== void 0 && n.tokens.description === "" && n.tokens.end.endsWith(r.end) && (e = e.slice(0, -1)), e = e.slice(e.reduce(Bm, 0)), e.map(zm).join(`
`);
}
t(km, "preserveJoiner");
function We({ startLine: e = 0, fence: r = "```", spacing: n = "compact", markers: o = b, tokenizers: a = [
  fe(),
  me(n),
  ge(),
  ye(n)
] } = {}) {
  if (e < 0 || e % 1 > 0)
    throw new Error("Invalid startLine");
  let s = He({ startLine: e, markers: o }), u = ke({ fence: r }), p = Ke({ tokenizers: a }), c = $e(n);
  return function(l) {
    let f = [];
    for (let d of Ua(l)) {
      let g = s(d);
      if (g === null)
        continue;
      let x = u(g), h = x.slice(1).map(p);
      f.push({
        description: c(x[0], o),
        tags: h,
        source: g,
        problems: h.reduce((T, v) => T.concat(v.problems), [])
      });
    }
    return f;
  };
}
t(We, "getParser");
function Hm(e) {
  return e.start + e.delimiter + e.postDelimiter + e.tag + e.postTag + e.type + e.postType + e.name + e.postName + e.description + e.end + e.lineEnd;
}
t(Hm, "join");
function Ye() {
  return (e) => e.source.map(({ tokens: r }) => Hm(r)).join(`
`);
}
t(Ye, "getStringifier");
function Va(e, r = {}) {
  return We(r)(e);
}
t(Va, "parse");
function Xm(e) {
  return e != null && e.includes("@");
}
t(Xm, "containsJsDoc");
function Qm(e) {
  let o = `/**
` + (e ?? "").split(`
`).map((s) => ` * ${s}`).join(`
`) + `
*/`, a = Va(o, {
    spacing: "preserve"
  });
  if (!a || a.length === 0)
    throw new Error("Cannot parse JSDoc tags.");
  return a[0];
}
t(Qm, "parse");
var Zm = {
  tags: ["param", "arg", "argument", "returns", "ignore", "deprecated"]
}, Ba = /* @__PURE__ */ t((e, r = Zm) => {
  if (!Xm(e))
    return {
      includesJsDoc: false,
      ignore: false
    };
  let n = Qm(e), o = eg(n, r.tags);
  return o.ignore ? {
    includesJsDoc: true,
    ignore: true
  } : {
    includesJsDoc: true,
    ignore: false,
    // Always use the parsed description to ensure JSDoc is removed from the description.
    description: n.description.trim(),
    extractedTags: o
  };
}, "parseJsDoc");
function eg(e, r) {
  let n = {
    params: null,
    deprecated: null,
    returns: null,
    ignore: false
  };
  for (let o of e.tags)
    if (!(r !== void 0 && !r.includes(o.tag)))
      if (o.tag === "ignore") {
        n.ignore = true;
        break;
      } else
        switch (o.tag) {
          case "param":
          case "arg":
          case "argument": {
            let a = tg(o);
            a != null && (n.params == null && (n.params = []), n.params.push(a));
            break;
          }
          case "deprecated": {
            let a = ng(o);
            a != null && (n.deprecated = a);
            break;
          }
          case "returns": {
            let a = og(o);
            a != null && (n.returns = a);
            break;
          }
        }
  return n;
}
t(eg, "extractJsDocTags");
function rg(e) {
  return e.replace(/[\.-]$/, "");
}
t(rg, "normaliseParamName");
function tg(e) {
  if (!e.name || e.name === "-")
    return null;
  let r = Ha(e.type);
  return {
    name: e.name,
    type: r,
    description: ka(e.description),
    getPrettyName: /* @__PURE__ */ t(() => rg(e.name), "getPrettyName"),
    getTypeName: /* @__PURE__ */ t(() => r ? Ka(r) : null, "getTypeName")
  };
}
t(tg, "extractParam");
function ng(e) {
  return e.name ? za(e.name, e.description) : null;
}
t(ng, "extractDeprecated");
function za(e, r) {
  let n = e === "" ? r : `${e} ${r}`;
  return ka(n);
}
t(za, "joinNameAndDescription");
function ka(e) {
  let r = e.replace(/^- /g, "").trim();
  return r === "" ? null : r;
}
t(ka, "normaliseDescription");
function og(e) {
  let r = Ha(e.type);
  return r ? {
    type: r,
    description: za(e.name, e.description),
    getTypeName: /* @__PURE__ */ t(() => Ka(r), "getTypeName")
  } : null;
}
t(og, "extractReturns");
var _ = distExports.stringifyRules(), ag = _.JsdocTypeObject;
_.JsdocTypeAny = () => "any";
_.JsdocTypeObject = (e, r) => `(${ag(e, r)})`;
_.JsdocTypeOptional = (e, r) => r(e.element);
_.JsdocTypeNullable = (e, r) => r(e.element);
_.JsdocTypeNotNullable = (e, r) => r(e.element);
_.JsdocTypeUnion = (e, r) => e.elements.map(r).join("|");
function Ha(e) {
  try {
    return distExports.parse(e, "typescript");
  } catch {
    return null;
  }
}
t(Ha, "extractType");
function Ka(e) {
  return distExports.transform(_, e);
}
t(Ka, "extractTypeName");
function Qe(e) {
  return e.length > 90;
}
t(Qe, "isTooLongForTypeSummary");
function $a(e) {
  return e.length > 50;
}
t($a, "isTooLongForDefaultValueSummary");
function y(e, r) {
  return e === r ? { summary: e } : { summary: e, detail: r };
}
t(y, "createSummaryValue");
function Wa(e, r) {
  if (e != null) {
    let { value: n } = e;
    if (!V(n))
      return $a(n) ? y(r == null ? void 0 : r.name, n) : y(n);
  }
  return null;
}
t(Wa, "createDefaultValue");
function Ya({ name: e, value: r, elements: n, raw: o }) {
  return r ?? (n != null ? n.map(Ya).join(" | ") : o ?? e);
}
t(Ya, "generateUnionElement");
function ig({ name: e, raw: r, elements: n }) {
  return n != null ? y(n.map(Ya).join(" | ")) : r != null ? y(r.replace(/^\|\s*/, "")) : y(e);
}
t(ig, "generateUnion");
function sg({ type: e, raw: r }) {
  return r != null ? y(r) : y(e);
}
t(sg, "generateFuncSignature");
function ug({ type: e, raw: r }) {
  return r != null ? Qe(r) ? y(e, r) : y(r) : y(e);
}
t(ug, "generateObjectSignature");
function pg(e) {
  let { type: r } = e;
  return r === "object" ? ug(e) : sg(e);
}
t(pg, "generateSignature");
function cg({ name: e, raw: r }) {
  return r != null ? Qe(r) ? y(e, r) : y(r) : y(e);
}
t(cg, "generateDefault");
function Xa(e) {
  if (e == null)
    return null;
  switch (e.name) {
    case "union":
      return ig(e);
    case "signature":
      return pg(e);
    default:
      return cg(e);
  }
}
t(Xa, "createType");
var Qa = /* @__PURE__ */ t((e, r) => {
  let { flowType: n, description: o, required: a, defaultValue: s } = r;
  return {
    name: e,
    type: Xa(n),
    required: a,
    description: o,
    defaultValue: Wa(s ?? null, n ?? null)
  };
}, "createFlowPropDef");
function Za({ defaultValue: e }) {
  if (e != null) {
    let { value: r } = e;
    if (!V(r))
      return y(r);
  }
  return null;
}
t(Za, "createDefaultValue");
function ei({ tsType: e, required: r }) {
  if (e == null)
    return null;
  let n = e.name;
  return r || (n = n.replace(" | undefined", "")), y(
    ["Array", "Record", "signature"].includes(e.name) ? e.raw : n
  );
}
t(ei, "createType");
var ri = /* @__PURE__ */ t((e, r) => {
  let { description: n, required: o } = r;
  return {
    name: e,
    type: ei(r),
    required: o,
    description: n,
    defaultValue: Za(r)
  };
}, "createTsPropDef");
function lg(e) {
  return e != null ? y(e.name) : null;
}
t(lg, "createType");
function fg(e) {
  let { computed: r, func: n } = e;
  return typeof r > "u" && typeof n > "u";
}
t(fg, "isReactDocgenTypescript");
function mg(e) {
  return e ? e.name === "string" ? true : e.name === "enum" ? Array.isArray(e.value) && e.value.every(
    ({ value: r }) => typeof r == "string" && r[0] === '"' && r[r.length - 1] === '"'
  ) : false : false;
}
t(mg, "isStringValued");
function gg(e, r) {
  if (e != null) {
    let { value: n } = e;
    if (!V(n))
      return fg(e) && mg(r) ? y(JSON.stringify(n)) : y(n);
  }
  return null;
}
t(gg, "createDefaultValue");
function ti(e, r, n) {
  let { description: o, required: a, defaultValue: s } = n;
  return {
    name: e,
    type: lg(r),
    required: a,
    description: o,
    defaultValue: gg(s, r)
  };
}
t(ti, "createBasicPropDef");
function de(e, r) {
  var _a;
  if (r == null ? void 0 : r.includesJsDoc) {
    let { description: n, extractedTags: o } = r;
    n != null && (e.description = r.description);
    let a = {
      ...o,
      params: (_a = o == null ? void 0 : o.params) == null ? void 0 : _a.map(
        (s) => ({
          name: s.getPrettyName(),
          description: s.description
        })
      )
    };
    Object.values(a).filter(Boolean).length > 0 && (e.jsDocTags = a);
  }
  return e;
}
t(de, "applyJsDocResult");
var yg = /* @__PURE__ */ t((e, r, n) => {
  let o = ti(e, r.type, r);
  return o.sbType = le(r), de(o, n);
}, "javaScriptFactory"), dg = /* @__PURE__ */ t((e, r, n) => {
  let o = ri(e, r);
  return o.sbType = le(r), de(o, n);
}, "tsFactory"), hg = /* @__PURE__ */ t((e, r, n) => {
  let o = Qa(e, r);
  return o.sbType = le(r), de(o, n);
}, "flowFactory"), Tg = /* @__PURE__ */ t((e, r, n) => {
  let o = ti(e, { name: "unknown" }, r);
  return de(o, n);
}, "unknownFactory"), Ze = /* @__PURE__ */ t((e) => {
  switch (e) {
    case "JavaScript":
      return yg;
    case "TypeScript":
      return dg;
    case "Flow":
      return hg;
    default:
      return Tg;
  }
}, "getPropDefFactory");
var ni = /* @__PURE__ */ t(
  (e) => e.type != null ? "JavaScript" : e.flowType != null ? "Flow" : e.tsType != null ? "TypeScript" : "Unknown",
  "getTypeSystem"
), xg = /* @__PURE__ */ t((e) => {
  let r = ni(e[0]), n = Ze(r);
  return e.map((o) => {
    var _a;
    let a = o;
    return ((_a = o.type) == null ? void 0 : _a.elements) && (a = {
      ...o,
      type: {
        ...o.type,
        value: o.type.elements
      }
    }), oi(a.name, a, r, n);
  });
}, "extractComponentSectionArray"), bg = /* @__PURE__ */ t((e) => {
  let r = Object.keys(e), n = ni(e[r[0]]), o = Ze(n);
  return r.map((a) => {
    let s = e[a];
    return s != null ? oi(a, s, n, o) : null;
  }).filter(Boolean);
}, "extractComponentSectionObject"), av = /* @__PURE__ */ t((e, r) => {
  let n = La(e, r);
  return Ra(n) ? Array.isArray(n) ? xg(n) : bg(n) : [];
}, "extractComponentProps");
function oi(e, r, n, o) {
  let a = Ba(r.description);
  return a.includesJsDoc && a.ignore ? null : {
    propDef: o(e, r, a),
    jsDocTags: a.extractedTags,
    docgenInfo: r,
    typeSystem: n
  };
}
t(oi, "extractProp");
function iv(e) {
  return e != null ? Ma(e) : "";
}
t(iv, "extractComponentDescription");
const { combineParameters: vg } = __STORYBOOK_MODULE_PREVIEW_API__;
var cv = /* @__PURE__ */ t((e) => {
  let {
    component: r,
    argTypes: n,
    parameters: { docs: o = {} }
  } = e, { extractArgTypes: a } = o, s = a && r ? a(r) : {};
  return s ? vg(s, n) : n;
}, "enhanceArgTypes");
var ai = "storybook/docs", yv = `${ai}/snippet-rendered`, Dg = /* @__PURE__ */ ((o) => (o.AUTO = "auto", o.CODE = "code", o.DYNAMIC = "dynamic", o))(Dg || {});
export {
  $a as $,
  Dg as D,
  La as L,
  Na as N,
  Qe as Q,
  y as a,
  av as b,
  cv as c,
  Nm as d,
  iv as i,
  yv as y
};
