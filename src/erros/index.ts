class CustomError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message); // (1)
        this.status = status;
      }
}

export class NotFoundError extends CustomError {
    constructor(message: string, status: number = 404) {
        super(message, status);
      }
}


export class UnavailableTimeError extends CustomError {
    constructor(message: string, status: number = 400) {
        super(message, status);
      }
}
