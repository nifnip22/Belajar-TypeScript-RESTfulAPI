// Error logic yang dibuat sendiri
export class ResponseError extends Error {
    constructor(public status: number, public message: string) {
        super(message);
    }
}