export class UserNameNotFoundError extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, UserNameNotFoundError.prototype);
    }
}

export class PasswordNotMatchedError extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, PasswordNotMatchedError.prototype);
    }
}

export class UserNameAlreadyExistedError extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, UserNameAlreadyExistedError.prototype);
    }
}

export class NoRowAffectedError extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, NoRowAffectedError.prototype);
    }
}